import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// ─────────────────────────────────────────────────────────────────
// Palette — emerald / white / slate (mirrors the website)
// ─────────────────────────────────────────────────────────────────
const EMERALD = [16, 185, 129];    // #10b981 (Website Primary)
const EMERALD_DARK = [5, 150, 105];    // #059669 (Website Deep)
const EMERALD_LIGHT = [209, 250, 229];   // #d1fae5
const EMERALD_ROW = [240, 253, 244];   // #f0fdf4

// Metallic colors for specific assets (no general 'yellow')
const METAL_GOLD = [184, 134, 11];    // Darker, rich metallic gold
const METAL_SILVER = [120, 130, 140];   // Slate-silver tone

const TEXT_DARK = [30, 41, 59];    // slate-800
const TEXT_MID = [100, 116, 139];   // slate-500
const TEXT_LIGHT = [148, 163, 184];   // slate-400
const DIVIDER = [226, 232, 240];   // slate-200
const WHITE = [255, 255, 255];
const PAGE_BG = [248, 250, 252];   // slate-50

// ─────────────────────────────────────────────────────────────────
// Micro-helpers
// ─────────────────────────────────────────────────────────────────

/** Strip ₹ so jsPDF Latin-1 fonts don't show a box */
const pdfFmt = (formatCurrency, val) =>
  formatCurrency(val ?? 0).replace('₹', 'Rs. ');

/** Filled rounded rect */
const fillRR = (doc, x, y, w, h, r, rgb) => {
  doc.setFillColor(...rgb);
  doc.roundedRect(x, y, w, h, r, r, 'F');
};

/** Stroked rounded rect */
const strokeRR = (doc, x, y, w, h, r, rgb, lw = 0.3) => {
  doc.setDrawColor(...rgb);
  doc.setLineWidth(lw);
  doc.roundedRect(x, y, w, h, r, r, 'S');
};

/** Load logo → { base64, width, height } or null */
const loadLogo = () =>
  new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      c.getContext('2d').drawImage(img, 0, 0);
      resolve({ base64: c.toDataURL('image/png'), w: img.naturalWidth, h: img.naturalHeight });
    };
    img.onerror = () => resolve(null);
    img.src = '/TPFAid-Logo1.png';
  });

/**
 * Draw a section heading: left emerald bar + bold title + hairline rule.
 * Returns the y position after the heading (ready for content).
 */
const heading = (doc, text, y, PW, ML, MR) => {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...EMERALD_DARK);
  doc.text(text, ML, y + 8);

  // Thin minimalist underline (Option 2)
  doc.setDrawColor(...EMERALD);
  doc.setLineWidth(0.6);
  doc.line(ML, y + 10, ML + 15, y + 10); // Short accent underline

  doc.setDrawColor(...DIVIDER);
  doc.setLineWidth(0.2);
  doc.line(ML, y + 10, PW - MR, y + 10); // Full width soft divider

  return y + 18;
};

// ─────────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────────
const generateZakatPDF = async (results, formatCurrency) => {
  if (!results) return;

  // ── Destructure full API response ────────────────────
  const {
    totalAssets = 0,
    totalLiabilities = 0,
    zakatableWealth = 0,
    zakatDue = 0,
    isEligible = false,
    pdf: pdfObj = {},
  } = results;

  const nisabVal = pdfObj?.nisab?.value ?? results.nisabValue ?? results.nisab ?? 0;
  const nisabType = (pdfObj?.nisab?.type ?? results.nisabType ?? 'SILVER').toUpperCase();
  const goldNisabGrams = pdfObj?.nisab?.goldNisabGrams ?? 87.48;
  const silverNisabGrams = pdfObj?.nisab?.silverNisabGrams ?? 612.36;
  const goldPPG = pdfObj?.metalPrices?.goldPricePerGram ?? 0;
  const silverPPG = pdfObj?.metalPrices?.silverPricePerGram ?? 0;
  const calc = pdfObj?.calculations ?? {};
  const inputs = pdfObj?.inputs ?? {};
  const generatedAt = pdfObj?.generatedAt ? new Date(pdfObj.generatedAt) : new Date();

  const fmt = (v) => pdfFmt(formatCurrency, v);
  const fNum = (n, d = 2) => Number(n ?? 0).toLocaleString('en-IN', { maximumFractionDigits: d });

  const goldNisabAmt = goldNisabGrams * goldPPG;
  const silverNisabAmt = silverNisabGrams * silverPPG;

  // ── Document setup ────────────────────────────────────
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const PW = doc.internal.pageSize.getWidth();   // 210 mm
  const PH = doc.internal.pageSize.getHeight();  // 297 mm
  const ML = 14;
  const MR = 14;
  const CW = PW - ML - MR;  // 182 mm

  // Page 1 background
  doc.setFillColor(...PAGE_BG);
  doc.rect(0, 0, PW, PH, 'F');

  // Header Band
  fillRR(doc, 0, 0, PW, 36, 0, EMERALD_DARK);
  // Soft emerald top stripe instead of yellow
  doc.setFillColor(...EMERALD);
  doc.rect(0, 0, PW, 1.5, 'F');

  // Logo — small, left-aligned (height = 9 mm)
  const logo = await loadLogo();
  if (logo?.base64) {
    const lh = 9;
    const lw = lh * (logo.w / logo.h);
    doc.addImage(logo.base64, 'PNG', ML, 13.5, lw, lh);
  }

  // Report label (top right)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...WHITE);
  doc.text('ZAKAT SUMMARY REPORT', PW - MR, 15, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(200, 225, 212);
  const dateStr = generatedAt.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(dateStr, PW - MR, 21, { align: 'right' });

  // Eligibility pill
  const pillTxt = isEligible ? 'ZAKAT OBLIGATORY' : 'BELOW NISAB';
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  const pillColor = isEligible ? [255, 255, 255] : TEXT_LIGHT;
  doc.setTextColor(...pillColor);
  doc.text(pillTxt, PW - MR, 29, { align: 'right' });

  let y = 46;

  // SECTION 1 — Calculation Summary Card
  const cardH = 58;
  fillRR(doc, ML, y, CW, cardH, 3, WHITE);
  strokeRR(doc, ML, y, CW, cardH, 3, DIVIDER);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...EMERALD_DARK);
  doc.text('Calculation Summary', ML + 6, y + 10);

  // Soft minimalist accent underline
  doc.setDrawColor(...EMERALD);
  doc.setLineWidth(0.8);
  doc.line(ML + 6, y + 12, ML + 22, y + 12);

  // Rows
  const summRows = [
    { label: 'Total Zakatable Assets', value: fmt(totalAssets), bold: false },
    { label: 'Total Liabilities Deducted', value: `- ${fmt(totalLiabilities)}`, bold: false },
    { label: 'Net Zakatable Wealth', value: fmt(zakatableWealth), bold: true },
    { label: 'Nisab Threshold', value: fmt(nisabVal), bold: false, muted: true },
  ];

  let ry = y + 17;
  summRows.forEach(({ label, value, bold, muted }, i) => {
    if (i % 2 === 0) {
      doc.setFillColor(...PAGE_BG);
      doc.rect(ML + 4, ry - 2.5, CW - 8, 7, 'F');
    }
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...(muted ? TEXT_LIGHT : TEXT_MID));
    doc.text(label, ML + 8, ry + 2.5);
    doc.setFont('helvetica', bold ? 'bold' : 'bold');
    doc.setTextColor(...(muted ? TEXT_LIGHT : TEXT_DARK));
    doc.text(value, PW - MR - 5, ry + 2.5, { align: 'right' });
    ry += 8;
  });

  // Zakat Due — Clean highlighted row (stays inside the card)
  doc.setFillColor(...EMERALD_LIGHT);
  doc.rect(ML + 3.8, ry - 2.5, CW - 7.6, 9, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...EMERALD_DARK);
  doc.text('Zakat Due (2.5%)', ML + 8, ry + 4);
  doc.text(fmt(zakatDue), PW - MR - 5, ry + 4, { align: 'right' });

  y += cardH + 10;

  // ─────────────────────────────────────────────────────
  // SECTION 2 — Asset Breakdown
  // ─────────────────────────────────────────────────────
  y = heading(doc, 'Asset Breakdown', y, PW, ML, MR);

  const assetRows = [];

  if (inputs.cash)
    assetRows.push(['Cash & Bank Balances', 'Full value zakatable', fmt(inputs.cash)]);

  if (inputs.gold?.length > 0) {
    inputs.gold.forEach((g) => {
      const val = g.grams * goldPPG * (g.karat / 24);
      assetRows.push([
        `Gold — ${g.karat}K (${fNum(g.grams, 2)}g)`,
        `${fNum(g.grams, 2)}g × Rs. ${fNum(goldPPG, 0)}/g × ${g.karat}/24`,
        fmt(val),
      ]);
    });
  }

  if (inputs.silver?.length > 0) {
    inputs.silver.forEach((s) => {
      const val = s.grams * silverPPG;
      assetRows.push([
        `Silver (${fNum(s.grams, 2)}g)`,
        `${fNum(s.grams, 2)}g × Rs. ${fNum(silverPPG, 0)}/g`,
        fmt(val),
      ]);
    });
  }

  if (inputs.stocks?.active)
    assetRows.push(['Stocks (Active/Trading)', '100% of market value', fmt(inputs.stocks.active)]);

  if (inputs.stocks?.passive)
    assetRows.push(['Stocks (Passive/Long-term)', 'Net asset value portion', fmt(inputs.stocks.passive)]);

  if (inputs.crypto)
    assetRows.push(['Cryptocurrencies', 'Current market value', fmt(inputs.crypto)]);

  if (inputs.pension?.value && inputs.pension?.accessible)
    assetRows.push(['Pension / Provident Fund', 'Accessible portion only', fmt(inputs.pension.value)]);

  if (inputs.property?.resaleValue)
    assetRows.push(['Property (for resale)', 'Full market value', fmt(inputs.property.resaleValue)]);

  if (inputs.property?.rentalSavings)
    assetRows.push(['Rental Income (saved)', 'Saved/accumulated portion', fmt(inputs.property.rentalSavings)]);

  if (inputs.otherAssets)
    assetRows.push(['Other Zakatable Assets', '—', fmt(inputs.otherAssets)]);

  if (inputs.debtsOwedToYou)
    assetRows.push(['Debts Owed to You', 'Expected/collectable', fmt(inputs.debtsOwedToYou)]);

  autoTable(doc, {
    startY: y,
    head: [['Asset', 'Calculation Basis', 'Value']],
    body: assetRows.length ? assetRows : [['No assets recorded', '', '—']],
    theme: 'plain',
    tableWidth: CW,
    margin: { left: ML, right: MR },
    headStyles: {
      fillColor: EMERALD_DARK,
      textColor: WHITE,
      fontStyle: 'bold',
      fontSize: 7.5,
      cellPadding: { top: 4, bottom: 4, left: 4, right: 4 },
    },
    alternateRowStyles: { fillColor: [245, 250, 247] },
    styles: {
      fontSize: 8,
      textColor: TEXT_DARK,
      cellPadding: { top: 3.5, bottom: 3.5, left: 4, right: 4 },
      font: 'helvetica',
      lineColor: DIVIDER,
      lineWidth: 0.1,
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 62 },
      1: { cellWidth: 80, textColor: TEXT_MID },
      2: { cellWidth: 40, halign: 'right', fontStyle: 'bold' },
    },
    didParseCell(d) {
      if (d.section === 'head' && d.column.index === 2) d.cell.styles.halign = 'right';
    },
  });

  y = doc.lastAutoTable.finalY + 4;

  // Total row — using Gold theme to increase visibility
  fillRR(doc, ML, y, CW, 9.5, 2, [255, 250, 235]); // Very light gold tint
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...METAL_GOLD);
  doc.text('Total Zakatable Assets', ML + 5, y + 6.5);
  doc.text(fmt(totalAssets), PW - MR - 5, y + 6.5, { align: 'right' });
  y += 16;

  // Liabilities row (if any)
  if (totalLiabilities > 0) {
    fillRR(doc, ML, y, CW, 9.5, 2, [255, 243, 243]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(180, 60, 60);
    doc.text('Liabilities Deducted', ML + 5, y + 6.5);
    doc.text(`- ${fmt(totalLiabilities)}`, PW - MR - 5, y + 6.5, { align: 'right' });
    y += 14;
  }

  // ─────────────────────────────────────────────────────
  // SECTION 3 — Nisab Determination
  // ─────────────────────────────────────────────────────
  if (y > 205) {
    doc.addPage();
    doc.setFillColor(...PAGE_BG);
    doc.rect(0, 0, PW, PH, 'F');
    y = 16;
  }

  y = heading(doc, 'Nisab Determination', y, PW, ML, MR);

  // Two cards: Gold | Silver
  const cW2 = (CW - 5) / 2;
  const cH2 = 40;

  const drawNisabCard = (x, type, grams, pricePPG, nisabAmt, isUsed) => {
    // Silver color for silver, gold color for gold
    const metalColor = type === 'GOLD' ? METAL_GOLD : METAL_SILVER;
    // Always use metal color for background and white for text as requested
    const bg = metalColor;
    const t1 = WHITE;
    const t2 = [245, 245, 245];
    const t3 = WHITE;

    fillRR(doc, x, y, cW2, cH2, 3, bg);

    // Add the white highlight border for that premium "weighted" look
    // We use a stronger line for the "Applied" card to maintain clear distinction
    strokeRR(doc, x + 1, y + 1, cW2 - 2, cH2 - 2, 2.5, WHITE, isUsed ? 0.8 : 0.4);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...t1);
    doc.text(type === 'GOLD' ? '  Gold Nisab' : '  Silver Nisab', x + 5, y + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...t2);
    doc.text(`${grams}g of pure ${type === 'GOLD' ? '24K gold' : 'silver'}`, x + 5, y + 15);
    doc.text(`Spot price: Rs. ${fNum(pricePPG, 0)}/g`, x + 5, y + 21);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...t1);
    doc.text(fmt(nisabAmt), x + 5, y + 30);

    if (isUsed) {
      doc.setFontSize(6.5);
      doc.setTextColor(...t3);
      doc.text('APPLIED TO YOUR CALCULATION', x + 5, y + 37);
    } else {
      doc.setFontSize(6.5);
      doc.setTextColor(...t3);
      doc.text('not used', x + 5, y + 37);
    }
  };

  drawNisabCard(ML, 'GOLD', goldNisabGrams, goldPPG, goldNisabAmt, nisabType === 'GOLD');
  drawNisabCard(ML + cW2 + 5, 'SILVER', silverNisabGrams, silverPPG, silverNisabAmt, nisabType === 'SILVER');

  y += cH2 + 8;

  // Applied line
  fillRR(doc, ML, y, CW, 10, 2, EMERALD_LIGHT);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...EMERALD_DARK);
  doc.text(`Nisab Applied (${nisabType} standard):`, ML + 5, y + 7);
  doc.setFont('helvetica', 'bold');
  doc.text(fmt(nisabVal), PW - MR - 5, y + 7, { align: 'right' });
  y += 18;

  // ─────────────────────────────────────────────────────
  // SECTION 4 — Nisab Rules & Scholarly Guidance
  // ─────────────────────────────────────────────────────
  if (y > 210) {
    doc.addPage();
    doc.setFillColor(...PAGE_BG);
    doc.rect(0, 0, PW, PH, 'F');
    y = 16;
  }

  y = heading(doc, 'Nisab Rules & Scholarly Guidance', y, PW, ML, MR);

  const rulesRows = [
    [
      'What is Nisab?',
      'Nisab is the minimum zakatable wealth established by the Prophet Muhammad (saw) based on the value of gold and silver — the primary stores of wealth in Islamic finance.',
    ],
    [
      `Why Silver\nNisab Was\nUsed`,
      `Silver Nisab (${silverNisabGrams}g) gives a lower threshold (Rs. ${fNum(silverNisabAmt, 0)}), ensuring more Muslims fulfil their obligation. Recommended by Hanafi, Maliki, and many contemporary scholars as it benefits the poor more broadly.`,
    ],
    [
      `Why Gold\nNisab Is\nSometimes Used`,
      `Gold Nisab (${goldNisabGrams}g) sets a higher threshold (Rs. ${fNum(goldNisabAmt, 0)}). Used by Hanbali and certain contemporary scholars, particularly when primary wealth is held in gold.`,
    ],
    [
      'The Haul\nCondition',
      'Zakat is obligatory only when nisab has been maintained continuously for one complete lunar year (Haul = 354 days). If wealth drops below nisab at any point, the Haul resets.',
    ],
    [
      'Deductible\nLiabilities',
      'Only immediate debts due within the lunar year are deductible. Long-term liabilities (e.g. mortgages) are generally not fully deductible under most scholarly opinions.',
    ],
    [
      'Metal Prices\nUsed',
      `Gold (24K): Rs. ${fNum(goldPPG, 0)}/g  |  Silver: Rs. ${fNum(silverPPG, 0)}/g\nPrices sourced: ${generatedAt.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} at ${generatedAt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} IST`,
    ],
  ];

  autoTable(doc, {
    startY: y,
    body: rulesRows,
    theme: 'plain',
    tableWidth: CW,
    margin: { left: ML, right: MR },
    styles: {
      fontSize: 7.5,
      textColor: TEXT_DARK,
      cellPadding: { top: 4, bottom: 4, left: 4, right: 4 },
      font: 'helvetica',
      valign: 'top',
      overflow: 'linebreak',
    },
    columnStyles: {
      0: { cellWidth: 38, fontStyle: 'bold', textColor: EMERALD_DARK, fillColor: EMERALD_ROW },
      1: { cellWidth: 144, textColor: TEXT_MID },
    },
    alternateRowStyles: { fillColor: [248, 252, 250] },
    didDrawCell(d) {
      doc.setDrawColor(...DIVIDER);
      doc.setLineWidth(0.1);
      doc.line(d.cell.x, d.cell.y + d.cell.height, d.cell.x + d.cell.width, d.cell.y + d.cell.height);
    },
  });

  y = doc.lastAutoTable.finalY + 10;

  // ─────────────────────────────────────────────────────
  // SECTION 5 — Live Metal Price Summary Box
  // ─────────────────────────────────────────────────────
  if (y > 250) {
    doc.addPage();
    doc.setFillColor(...PAGE_BG);
    doc.rect(0, 0, PW, PH, 'F');
    y = 16;
  }

  fillRR(doc, ML, y, CW, 28, 3, WHITE);
  strokeRR(doc, ML, y, CW, 28, 3, DIVIDER);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...TEXT_DARK);
  doc.text('Spot Metal Prices at Time of Calculation', ML + 6, y + 8);

  doc.setDrawColor(...EMERALD);
  doc.setLineWidth(0.4);
  doc.line(ML + 6, y + 10, ML + 18, y + 10);

  // Left column — prices with metallic colors
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...METAL_GOLD);
  doc.text(`Gold (24K pure):   Rs. ${fNum(goldPPG, 0)} per gram`, ML + 8, y + 16);
  doc.setTextColor(...METAL_SILVER);
  doc.text(`Silver (pure):        Rs. ${fNum(silverPPG, 0)} per gram`, ML + 8, y + 22);

  // Right column — nisab equivalents
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...EMERALD_DARK);
  doc.text(`Gold Nisab  = Rs. ${fNum(goldNisabAmt, 0)}`, PW - MR - 5, y + 16, { align: 'right' });
  doc.text(`Silver Nisab = Rs. ${fNum(silverNisabAmt, 0)}`, PW - MR - 5, y + 22, { align: 'right' });

  y += 36;

  // ─────────────────────────────────────────────────────
  // FOOTER (every page)
  // ─────────────────────────────────────────────────────
  const totalPages = doc.internal.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    fillRR(doc, 0, PH - 13, PW, 13, 0, EMERALD_DARK);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(255, 255, 255);
    doc.text('TPF Aid — Zakat Calculator', ML, PH - 5.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(180, 210, 195);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text(`${p} / ${totalPages}`, PW - MR, PH - 5.5, { align: 'right' });
  }

  doc.save('Zakat_Summary_TPFAid.pdf');
};

export default generateZakatPDF;