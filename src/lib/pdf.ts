/**
 * Fills pre-printed contract PDFs with handwriting-style ink.
 * Coordinates from pdf-layout.ts (calibrated against wakala.pdf / lipa.pdf).
 */

import {
  FIELD_PAD,
  HANDWRITING_FONT_FILES,
  INK_RGB,
  LIPA_LAYOUT,
  LIPA_PHONE_BOXES,
  WAKALA_LAYOUT,
  WAKALA_PHONE_BOXES,
  type BoxDigitsOptions,
  type FieldBox,
  type SignaturePlacement,
} from "@/lib/pdf-layout";

let pdfLibPromise: Promise<typeof import("pdf-lib")> | null = null;
let fontkitPromise: Promise<unknown> | null = null;
let handFontPromise: Promise<ArrayBuffer> | null = null;

function loadPdfLib() {
  if (!pdfLibPromise) pdfLibPromise = import("pdf-lib");
  return pdfLibPromise;
}

function loadFontkit() {
  if (!fontkitPromise)
    fontkitPromise = import("@pdf-lib/fontkit").then((m) => (m as { default?: unknown }).default ?? m);
  return fontkitPromise;
}

async function loadHandwritingFont(): Promise<ArrayBuffer> {
  if (!handFontPromise) {
    handFontPromise = (async () => {
      for (const file of HANDWRITING_FONT_FILES) {
        const res = await fetch(`/fonts/${file}`);
        if (res.ok) return res.arrayBuffer();
      }
      throw new Error("No handwriting font found in /public/fonts");
    })();
  }
  return handFontPromise;
}

export type ContractType = "wakala" | "lipa" | "voda";

export type ContractData = {
  type: ContractType;
  ref_no: string;
  customer_name: string;
  phone: string;
  alt_phone?: string | null;
  tin?: string | null;
  id_type?: string | null;
  id_number?: string | null;
  business_name?: string | null;
  business_type?: string | null;
  email?: string | null;
  ward?: string | null;
  district?: string | null;
  region?: string | null;
  category?: string | null;
  signature_data?: string | null;
  created_at: string;
};

async function fetchTemplate(type: ContractType) {
  const file = type === "wakala" ? "wakala.pdf" : "lipa.pdf";
  const res = await fetch(`/templates/${file}`);
  if (!res.ok) throw new Error("Template not found");
  return await res.arrayBuffer();
}

type PdfLib = Awaited<ReturnType<typeof loadPdfLib>>;
type PdfDoc = Awaited<ReturnType<PdfLib["PDFDocument"]["load"]>>;
type PdfFont = Awaited<ReturnType<PdfDoc["embedFont"]>>;
type PdfPage = ReturnType<PdfDoc["getPages"]>[number];
type Rgb = ReturnType<PdfLib["rgb"]>;
type PdfImage = Awaited<ReturnType<PdfDoc["embedPng"]>>;

export function phoneDigitsForBoxes(raw: string | null | undefined): string {
  let d = String(raw ?? "").replace(/\D/g, "");
  if (d.startsWith("255") && d.length >= 12) d = "0" + d.slice(3);
  else if (!d.startsWith("0") && d.length === 9) d = "0" + d;
  return d.slice(0, 10);
}

function lineYFromTop(box: FieldBox): number {
  return box.lineY ?? box.B;
}

function fitText(
  text: string,
  font: PdfFont,
  maxWidth: number,
  maxSize: number,
  minSize: number,
): { size: number; display: string } {
  let size = maxSize;
  let display = text;
  while (size > minSize && font.widthOfTextAtSize(display, size) > maxWidth) size -= 0.5;
  if (font.widthOfTextAtSize(display, size) > maxWidth) {
    const ell = "…";
    while (display.length > 1 && font.widthOfTextAtSize(display + ell, size) > maxWidth) {
      display = display.slice(0, -1);
    }
    display += ell;
  }
  return { size, display };
}

function createInkEngine(
  page: PdfPage,
  pageH: number,
  hand: PdfFont,
  helv: PdfFont,
  rgb: (r: number, g: number, b: number) => Rgb,
) {
  const ink = rgb(INK_RGB.r, INK_RGB.g, INK_RGB.b);

  /** Baseline sits on the printed line (not below it). */
  const baselineOnLine = (lineTop: number, fontSize: number) =>
    pageH - lineTop + Math.max(1, fontSize * 0.12);

  const writeOnLine = (
    text: string | null | undefined,
    box: FieldBox,
    opts?: { maxSize?: number; minSize?: number },
  ) => {
    if (!text) return;
    const maxSize = opts?.maxSize ?? 12;
    const minSize = opts?.minSize ?? 8;
    const x = box.L;
    const innerW = box.R - box.L - 2;
    const { size, display } = fitText(String(text), hand, innerW, maxSize, minSize);
    const y = baselineOnLine(lineYFromTop(box), size);
    page.drawText(display, { x, y, size, font: hand, color: ink });
  };

  /** Rectangular box on the form — text inside the box, left-aligned on the bottom edge. */
  const writeInBox = (
    text: string | null | undefined,
    box: FieldBox,
    opts?: { maxSize?: number; minSize?: number },
  ) => {
    if (!text) return;
    const maxSize = opts?.maxSize ?? 12;
    const minSize = opts?.minSize ?? 8;
    const x0 = box.L + FIELD_PAD;
    const innerW = box.R - box.L - FIELD_PAD * 2;
    const { size, display } = fitText(String(text), hand, innerW, maxSize, minSize);
    const yPdfBottom = pageH - box.B;
    const yPdfTop = pageH - box.T;
    const bandH = yPdfTop - yPdfBottom;
    const y = yPdfBottom + Math.min(size * 0.85, bandH * 0.48);
    page.drawText(display, { x: x0, y, size, font: hand, color: ink });
  };

  const writeBoxDigits = (
    text: string | null | undefined,
    box: FieldBox,
    layout: BoxDigitsOptions,
    opts?: { size?: number },
  ) => {
    if (!text) return;
    const skip = layout.skipCells ?? 0;
    const total = layout.totalCells;
    const maxDigits = layout.maxDigits ?? total - skip;
    let size = opts?.size ?? 11;
    const inset = layout.cellInset ?? 0;
    const x0 = box.L + inset;
    const innerW = box.R - box.L - inset * 2;
    const cellW = innerW / total;
    while (size > 8 && hand.widthOfTextAtSize("8", size) > cellW - 3) size -= 0.5;

    const yPdfBottom = pageH - box.B;
    const yPdfTop = pageH - box.T;
    const y = yPdfBottom + (yPdfTop - yPdfBottom) * 0.55;

    String(text)
      .replace(/\D/g, "")
      .slice(0, maxDigits)
      .split("")
      .forEach((digit, i) => {
        const cellCenter = x0 + (skip + i + 0.5) * cellW;
        const w = hand.widthOfTextAtSize(digit, size);
        page.drawText(digit, {
          x: cellCenter - w / 2,
          y,
          size,
          font: hand,
          color: ink,
        });
      });
  };

  const fillSansBox = (text: string | null | undefined, box: FieldBox, maxSize = 9.5) => {
    if (!text) return;
    const minSize = 7;
    const x0 = box.L + FIELD_PAD;
    const innerW = box.R - box.L - FIELD_PAD * 2;
    const { size, display } = fitText(String(text), helv, innerW, maxSize, minSize);
    const y = baselineOnLine(lineYFromTop(box), size);
    page.drawText(display, { x: x0, y, size, font: helv, color: ink });
  };

  const drawSignatureOnLine = (sigImg: PdfImage, placement: SignaturePlacement) => {
    const linePdfY = pageH - placement.lineFromTop;
    page.drawImage(sigImg, {
      x: placement.x,
      y: linePdfY,
      width: placement.width,
      height: placement.height,
      opacity: 0.95,
    });
  };

  return { writeOnLine, writeInBox, writeBoxDigits, fillSansBox, drawSignatureOnLine };
}

async function embedSignature(pdf: PdfDoc, data?: string | null): Promise<PdfImage | null> {
  if (!data?.startsWith("data:image/png")) return null;
  try {
    const bytes = Uint8Array.from(atob(data.split(",")[1]), (c) => c.charCodeAt(0));
    return await pdf.embedPng(bytes);
  } catch {
    return null;
  }
}

function fillWakalaFooter(
  w: ReturnType<typeof createInkEngine>,
  d: ContractData,
  dateStr: string,
  sigImg: PdfImage | null,
  L: typeof WAKALA_LAYOUT,
) {
  w.writeOnLine(d.customer_name, L.footerName, { maxSize: 11 });
  w.writeOnLine(dateStr, L.footerDate, { maxSize: 11 });
  if (sigImg) w.drawSignatureOnLine(sigImg, L.footerSig);
}

function fillWakalaAcceptance(
  w: ReturnType<typeof createInkEngine>,
  d: ContractData,
  dateStr: string,
  sigImg: PdfImage | null,
  L: typeof WAKALA_LAYOUT,
) {
  w.writeOnLine(d.customer_name, L.acceptName, { maxSize: 12 });
  w.writeOnLine(dateStr, L.acceptDate, { maxSize: 11 });
  if (sigImg) w.drawSignatureOnLine(sigImg, L.acceptSig);
}

function fillLipaForm(
  w: ReturnType<typeof createInkEngine>,
  d: ContractData,
  dateStr: string,
  sigImg: PdfImage | null,
  phone10: string,
  altPhone10: string,
  L: typeof LIPA_LAYOUT,
) {
  w.writeOnLine(d.customer_name, L.aggName, { maxSize: 10 });
  w.writeOnLine(phone10, L.aggTill, { maxSize: 10 });
  w.writeOnLine(dateStr, L.aggDate, { maxSize: 10 });

  const bizTypeText = d.business_type || d.category?.replace(/_/g, " ") || "";
  const emailText = d.email?.trim() || "—";
  const otherPhoneText = altPhone10 || "—";

  w.writeInBox(d.business_name || d.customer_name, L.bizReg, { maxSize: 10 });
  w.writeInBox(bizTypeText, L.bizType, { maxSize: 10 });
  w.writeInBox(d.tin || "", L.tin, { maxSize: 10 });
  w.writeInBox("—", L.vat, { maxSize: 10 });
  w.writeInBox(d.customer_name, L.owner, { maxSize: 10 });
  w.writeInBox(emailText, L.email, { maxSize: 9.5 });

  w.writeBoxDigits(phone10, L.ownerPhone, LIPA_PHONE_BOXES, { size: 10 });
  w.writeInBox(otherPhoneText, L.otherPhone, { maxSize: 10 });
  w.writeInBox("—", L.poBox, { maxSize: 10 });
  w.writeInBox(d.ward || "—", L.ward, { maxSize: 10 });
  w.writeInBox(d.district || "—", L.district, { maxSize: 10 });
  w.writeInBox(d.region || "—", L.region, { maxSize: 10 });

  w.writeInBox(d.business_name || d.customer_name, L.hpesaName, { maxSize: 10 });
  w.writeBoxDigits(phone10, L.hpesaPhone, LIPA_PHONE_BOXES, { size: 10 });

  w.writeOnLine(d.customer_name, L.merchantName, { maxSize: 12 });
  w.writeOnLine(dateStr, L.merchantDate, { maxSize: 11 });
  if (sigImg) w.drawSignatureOnLine(sigImg, L.merchantSig);
}

export async function generateContractPdf(d: ContractData): Promise<Uint8Array> {
  const { PDFDocument, StandardFonts, rgb } = await loadPdfLib();
  const fontkit = await loadFontkit();
  const pdf = await PDFDocument.load(await fetchTemplate(d.type));
  pdf.registerFontkit(fontkit as never);

  const helv = await pdf.embedFont(StandardFonts.Helvetica);
  const hand = await pdf.embedFont(await loadHandwritingFont());
  const dateStr = new Date(d.created_at).toLocaleDateString("en-GB");
  const sigImg = await embedSignature(pdf, d.signature_data);
  const pages = pdf.getPages();
  const phone10 = phoneDigitsForBoxes(d.phone);
  const altPhone10 = d.alt_phone ? phoneDigitsForBoxes(d.alt_phone) : "";

  if (d.type === "wakala") {
    const L = WAKALA_LAYOUT;

    const p0 = pages[0];
    const w0 = createInkEngine(p0, p0.getSize().height, hand, helv, rgb);
    w0.writeOnLine(dateStr, L.agreeDate, { maxSize: 11 });
    w0.writeOnLine(d.business_name || d.customer_name, L.agentName, { maxSize: 12 });
    w0.writeOnLine(d.customer_name, L.repName, { maxSize: 12 });
    w0.writeOnLine(d.id_type || "NIDA", L.idType, { maxSize: 12 });
    w0.writeOnLine(d.id_number || "", L.idNumber, { maxSize: 12 });
    if (d.email) w0.fillSansBox(d.email, L.email, 9.5);
    else w0.writeOnLine("—", L.email, { maxSize: 12 });
    w0.writeOnLine("—", L.license, { maxSize: 12 });
    w0.writeOnLine(d.tin || "", L.tin, { maxSize: 12 });
    w0.writeBoxDigits(phone10, L.halotelPhone, WAKALA_PHONE_BOXES, { size: 11 });
    w0.writeBoxDigits(altPhone10 || phone10, L.contactPhone, WAKALA_PHONE_BOXES, { size: 11 });
    w0.writeOnLine([d.ward, d.district, d.region].filter(Boolean).join(", "), L.address, {
      maxSize: 11,
    });

    pages.forEach((pg, idx) => {
      const w = createInkEngine(pg, pg.getSize().height, hand, helv, rgb);
      fillWakalaFooter(w, d, dateStr, sigImg, L);
      if (idx === 1) fillWakalaAcceptance(w, d, dateStr, sigImg, L);
    });
  } else {
    const L = LIPA_LAYOUT;
    const p0 = pages[0];
    const w = createInkEngine(p0, p0.getSize().height, hand, helv, rgb);
    fillLipaForm(w, d, dateStr, sigImg, phone10, altPhone10, L);
  }

  pages.forEach((pg) => {
    const { width, height } = pg.getSize();
    pg.drawText(`Ref: ${d.ref_no}`, {
      x: width - 130,
      y: height - 18,
      size: 8,
      font: helv,
      color: rgb(0.6, 0.05, 0.05),
    });
  });

  return await pdf.save();
}
