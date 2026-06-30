/**
 * Field coordinates calibrated from template PDFs via pdf.js text extraction (May 2026).
 * Origin: L/R/T/B/lineY = distance from page top-left (pt). A4 height ≈ 841.89.
 */

export type FieldBox = {
  L: number;
  R: number;
  T: number;
  B: number;
  lineY?: number;
};

export type SignaturePlacement = {
  x: number;
  lineFromTop: number;
  width: number;
  height: number;
};

export type BoxDigitsOptions = {
  totalCells: number;
  skipCells?: number;
  maxDigits?: number;
  cellInset?: number;
};

export const INK_RGB = { r: 18 / 255, g: 49 / 255, b: 163 / 255 } as const;
export const FIELD_PAD = 2;

/**
 * Lipa — public/templates/lipa.pdf (1 page, A4 595×841.89 pt).
 * T/B/L/R calibrated from rectangle extraction of the template (May 2026).
 * Phone digit boxes: L/R cover only the 10 writable cells after the pre-printed +255.
 */
export const LIPA_LAYOUT = {
  // Merchant Aggregator top-right — writeOnLine fields, lineY = label baseline fromTop
  aggName: { L: 455, R: 578, T: 71,  B: 88,  lineY: 80  },
  aggTill: { L: 521, R: 578, T: 87,  B: 103, lineY: 95  },
  aggDate: { L: 455, R: 578, T: 102, B: 118, lineY: 110 },

  // Business Details — rectangular input boxes from template
  bizReg:     { L: 194, R: 552, T: 198, B: 211 },
  bizType:    { L: 236, R: 413, T: 216, B: 229 },
  tin:        { L: 100, R: 285, T: 235, B: 248 },
  vat:        { L: 317, R: 552, T: 235, B: 248 },
  owner:      { L: 113, R: 285, T: 253, B: 266 },
  email:      { L: 373, R: 552, T: 253, B: 266 },
  // Phone digit cells 5–14 (L = first writable cell left edge, after +255 in cells 1–4)
  ownerPhone: { L: 224, R: 373, T: 276, B: 289 },
  otherPhone: { L: 149, R: 297, T: 289, B: 302 },
  poBox:      { L: 347, R: 552, T: 289, B: 302 },
  ward:       { L: 63,  R: 297, T: 306, B: 319 },
  district:   { L: 347, R: 552, T: 306, B: 319 },
  region:     { L: 120, R: 297, T: 324, B: 337 },

  // Payment Account Details
  hpesaName:  { L: 164, R: 552, T: 389, B: 402 },
  hpesaPhone: { L: 228, R: 389, T: 412, B: 425 },

  // Signature section — writeOnLine fields
  merchantName: { L: 58,  R: 572, T: 746, B: 762, lineY: 753 },
  merchantSig:  { x: 58,  lineFromTop: 775, width: 200, height: 28 },
  merchantDate: { L: 58,  R: 320, T: 788, B: 804, lineY: 797 },
} as const;

/** 10 digit cells immediately after the pre-printed +255. */
export const LIPA_PHONE_BOXES: BoxDigitsOptions = {
  totalCells: 10,
  skipCells: 0,
  maxDigits: 10,
  cellInset: 0,
};

/**
 * Till Wakala — public/templates/wakala.pdf (4 pages).
 */
export const WAKALA_LAYOUT = {
  agreeDate: { L: 236, R: 340, T: 82, B: 94, lineY: 86 },

  agentName: { L: 204, R: 518, T: 222, B: 236, lineY: 228 },
  repName: { L: 204, R: 518, T: 246, B: 260, lineY: 252 },
  idType: { L: 204, R: 518, T: 270, B: 284, lineY: 276 },
  idNumber: { L: 204, R: 518, T: 294, B: 308, lineY: 300 },
  email: { L: 204, R: 518, T: 318, B: 332, lineY: 324 },
  license: { L: 204, R: 518, T: 342, B: 356, lineY: 348 },
  tin: { L: 204, R: 400, T: 366, B: 380, lineY: 372 },
  halotelPhone: { L: 204, R: 518, T: 386, B: 408 },
  contactPhone: { L: 204, R: 518, T: 412, B: 434 },
  address: { L: 204, R: 518, T: 443, B: 457, lineY: 449 },

  footerName: { L: 103, R: 285, T: 776, B: 788, lineY: 782 },
  footerDate: { L: 481, R: 575, T: 776, B: 788, lineY: 782 },
  footerSig: { x: 300, lineFromTop: 782, width: 115, height: 26 },

  acceptSig: { x: 175, lineFromTop: 696, width: 200, height: 26 },
  acceptName: { L: 175, R: 520, T: 704, B: 716, lineY: 710 },
  acceptDate: { L: 175, R: 520, T: 718, B: 730, lineY: 724 },
} as const;

export const WAKALA_PHONE_BOXES: BoxDigitsOptions = {
  totalCells: 14,
  skipCells: 0,
  maxDigits: 10,
  cellInset: 0,
};

export const HANDWRITING_FONT_FILES = [
  "Kalam-Regular.ttf",
  "PatrickHand-Regular.ttf",
  "Caveat-Regular.ttf",
  "IndieFlower-Regular.ttf",
] as const;
