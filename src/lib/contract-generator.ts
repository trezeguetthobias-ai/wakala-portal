// Use this import for jsPDF
import jsPDF from 'jspdf';

export interface ContractData {
  id?: string;
  ref_no: string;
  date: string;
  customer_name: string;
  phone: string;
  alt_phone?: string;
  tin?: string;
  id_type: string;
  id_number: string;
  business_name?: string;
  business_type?: string;
  email?: string;
  ward?: string;
  district?: string;
  region?: string;
  type: string; // 'wakala' | 'lipa' | 'voda'
  category?: string; // 'MACHINGA' | 'BINAFSI' | 'COMPANY_LIMITED'
  documents?: Record<string, { name: string; type: string; data: string; size: number }>;
  signature_data?: string;
}

export function generateContractPDF(data: ContractData): jsPDF {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let y = 20;

  const checkPageOverflow = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 20) {
      doc.addPage();
      y = 20;
    }
  };

  // HEADER
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor('#1a1a2e');
  doc.text('GJ GENERAL TRADERS COMPANY LIMITED', pageWidth / 2, y + 10, { align: 'center' });
  y += 12;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor('#666');
  doc.text('P.O. Box 1234, Dar es Salaam, Tanzania', pageWidth / 2, y, { align: 'center' });
  y += 6;
  doc.text('Tel: +255 762 000 000 | Email: info@gjgeneral.co.tz', pageWidth / 2, y, { align: 'center' });
  y += 8;

  doc.setDrawColor('#eb5325');
  doc.setLineWidth(1);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor('#eb5325');
  doc.text('MKATABA WA USAJILI', pageWidth / 2, y, { align: 'center' });
  y += 8;
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor('#1a1a2e');
  const typeNames: { [key: string]: string } = {
    wakala: 'HUDUMA YA WAKALA WA HALOPESA',
    lipa: 'HUDUMA YA LIPA NAMBA',
    voda: 'HUDUMA YA LIPA YA VODA'
  };
  doc.text(typeNames[data.type] || 'HUDUMA YA KIBIASHARA', pageWidth / 2, y, { align: 'center' });
  y += 12;

  // Reference & Date
  doc.setDrawColor('#e5e7eb');
  doc.setFillColor('#f8f9fa');
  doc.roundedRect(margin, y, pageWidth - (margin * 2), 20, 3, 3, 'FD');
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor('#1a1a2e');
  doc.text(`REF NO: ${data.ref_no || 'N/A'}`, margin + 10, y + 12);
  doc.text(`TAREHE: ${data.date || new Date().toISOString().split('T')[0]}`, pageWidth - margin - 60, y + 12);
  y += 28;

  // SECTION 1: CUSTOMER DETAILS
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor('#eb5325');
  doc.text('SEHEMU YA 1: MAELEZO YA MTEJA', margin, y);
  y += 8;

  doc.setDrawColor('#e5e7eb');
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor('#333');

  const customerData = [
    ['Jina Kamili la Mteja:', data.customer_name || 'N/A'],
    ['Namba ya Simu:', data.phone || 'N/A'],
    ['Namba Mbadala ya Simu:', data.alt_phone || 'N/A'],
    ['Namba ya TIN:', data.tin || 'N/A'],
    ['Aina ya Kitambulisho:', data.id_type || 'NIDA'],
    ['Namba ya Kitambulisho:', data.id_number || 'N/A'],
  ];

  customerData.forEach(([label, value]) => {
    doc.setFont('helvetica', 'bold');
    doc.text(label, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text(String(value), margin + 65, y);
    y += 7;
  });

  y += 5;

  // SECTION 2: BUSINESS & LOCATION
  if (data.type === 'lipa' || data.business_name || data.region) {
    checkPageOverflow(80);
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#eb5325');
    doc.text('SEHEMU YA 2: MAELEZO YA BIASHARA NA MAHALI', margin, y);
    y += 8;

    doc.setDrawColor('#e5e7eb');
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#333');

    const businessData = [
      ['Jina la Biashara:', data.business_name || 'N/A'],
      ['Aina ya Biashara:', data.business_type || 'N/A'],
      ['Kundi (Category):', data.category ? data.category.replace('_', ' ') : 'N/A'],
      ['Barua Pepe (Email):', data.email || 'N/A'],
      ['Wadi / Kata:', data.ward || 'N/A'],
      ['Wilaya:', data.district || 'N/A'],
      ['Mkoa:', data.region || 'N/A'],
    ];

    businessData.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold');
      doc.text(label, margin, y);
      doc.setFont('helvetica', 'normal');
      doc.text(String(value), margin + 60, y);
      y += 7;
    });

    y += 5;
  }

  // SECTION 3: TERMS
  checkPageOverflow(120);
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor('#eb5325');
  doc.text('SEHEMU YA 3: SHERIA NA MASHARTI', margin, y);
  y += 8;

  doc.setDrawColor('#e5e7eb');
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor('#444');

  const terms = [
    '1. UTANGULIZI: Mkataba huu ni makubaliano ya kisheria kati ya GJ General Traders Company Limited na mteja.',
    '2. USAHIHI WA TAARIFA: Mteja anathibitisha taarifa zote ni sahihi na za kweli.',
    '3. MATUMIZI YA HUDUMA: Huduma zitatumika kwa shughuli halali za kibiashara tu.',
    '4. KUFUATA SHERIA: Mteja anakubali kufuata sheria na kanuni zote za nchi.',
    '5. ULINZI WA TAARIFA: Kampuni itahifadhi na kulinda taarifa za mteja.',
    '6. WAJIBU WA MTEJA: Mteja anawajibika kwa matumizi yote ya huduma.',
    '7. USITISHAJI WA HUDUMA: Kampuni ina haki ya kusitisha huduma iwapo sheria zitakiukwa.',
    '8. MAREJELEO NA MALIPO: Malipo yote lazima yafanywe kwa wakati.',
    '9. MABADILIKO YA MASHARTI: Kampuni ina haki ya kubadilisha masharti kwa notisi ya siku 14.',
  ];

  if (data.category === 'COMPANY_LIMITED') {
    terms.push('10. KIPENGELE CHA KAMPUNI: Kampuni Limited inapaswa kuwasilisha nyaraka za BRELA.');
  }

  terms.forEach((term) => {
    const splitTerm = doc.splitTextToSize(term, pageWidth - (margin * 2));
    splitTerm.forEach((line: string) => {
      checkPageOverflow(5);
      doc.text(line, margin, y);
      y += 5;
    });
  });

  y += 5;

  // SECTION 4: SIGNATURE
  checkPageOverflow(50);
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor('#eb5325');
  doc.text('SEHEMU YA 4: SAINI', margin, y);
  y += 8;

  doc.setDrawColor('#e5e7eb');
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor('#333');
  
  const sigY = y + 30;
  
  doc.setDrawColor('#ccc');
  doc.setLineWidth(0.5);
  doc.rect(margin, sigY - 10, 80, 45);
  doc.rect(margin + 100, sigY - 10, 80, 45);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Saini ya Mteja:', margin + 5, sigY + 5);
  doc.text('Saini ya Kampuni:', margin + 105, sigY + 5);
  
  if (data.signature_data) {
    try {
      let imgData = data.signature_data;
      if (!imgData.startsWith('data:image')) {
        imgData = `data:image/png;base64,${imgData}`;
      }
      doc.addImage(imgData, 'PNG', margin + 5, sigY + 10, 70, 25);
    } catch (e) {
      doc.setFont('helvetica', 'italic');
      doc.setTextColor('#999');
      doc.text('[Saini imesainiwa]', margin + 5, sigY + 25);
    }
  } else {
    doc.setFont('helvetica', 'italic');
    doc.setTextColor('#999');
    doc.text('[Saini haipo]', margin + 5, sigY + 25);
  }

  doc.setFont('helvetica', 'italic');
  doc.setTextColor('#999');
  doc.text('[Saini ya Kampuni]', margin + 105, sigY + 25);
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor('#333');
  doc.text(`Tarehe: ${data.date || new Date().toISOString().split('T')[0]}`, margin + 5, sigY + 42);
  doc.text(`Tarehe: ${data.date || new Date().toISOString().split('T')[0]}`, margin + 105, sigY + 42);

  y += 60;

  // SECTION 5: DOCUMENTS
  if (data.documents && Object.keys(data.documents).length > 0) {
    const docKeys = ['id_photo', 'tin_photo', 'business_store_photo'];
    const sortedDocs = docKeys.filter(key => data.documents?.[key]);
    
    sortedDocs.forEach((key) => {
      const file = data.documents?.[key];
      if (file && file.data) {
        doc.addPage();
        y = 20;

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor('#eb5325');
        
        const labelMap: Record<string, string> = {
          id_photo: 'KIAMBATANISHO A: PICHA YA KITAMBULISHO',
          tin_photo: 'KIAMBATANISHO B: PICHA YA TIN',
          business_store_photo: 'KIAMBATANISHO C: PICHA YA DUKA'
        };
        
        doc.text(labelMap[key] || `KIAMBATANISHO: ${file.name.toUpperCase()}`, margin, y);
        y += 8;

        doc.setDrawColor('#e5e7eb');
        doc.setLineWidth(0.3);
        doc.line(margin, y, pageWidth - margin, y);
        y += 10;

        try {
          let format = 'JPEG';
          if (file.type.includes('png')) format = 'PNG';
          if (file.type.includes('gif')) format = 'GIF';
          
          const imgWidth = pageWidth - (margin * 2);
          const imgHeight = 150;
          
          doc.addImage(
            `data:${file.type};base64,${file.data}`, 
            format, 
            margin, 
            y, 
            imgWidth, 
            imgHeight
          );
          
          y += imgHeight + 10;
          doc.setFontSize(9);
          doc.setFont('helvetica', 'italic');
          doc.setTextColor('#666');
          doc.text(`Jina: ${file.name} | Ukubwa: ${(file.size / 1024).toFixed(1)} KB`, margin, y);
          
        } catch (err) {
          doc.setFont('helvetica', 'italic');
          doc.setTextColor('#999');
          doc.text('[Faili hili halikuweza kuonyeshwa]', margin, y + 20);
        }
      }
    });
  }

  // FOOTER
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    
    doc.setDrawColor('#e5e7eb');
    doc.setLineWidth(0.2);
    doc.line(margin, pageHeight - 18, pageWidth - margin, pageHeight - 18);
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor('#999');
    doc.text(
      'Mkataba huu umezalishwa kiotomatiki na ni mali ya GJ General Traders Company Limited.', 
      pageWidth / 2, 
      pageHeight - 10, 
      { align: 'center' }
    );
    doc.text(
      `Ukurasa ${i} wa ${totalPages}  |  Ref: ${data.ref_no}`, 
      pageWidth / 2, 
      pageHeight - 5, 
      { align: 'center' }
    );
  }

  return doc;
}

// IMPORTANT: This alias makes it work with contract-storage.ts
export const generateContractPdf = generateContractPDF;