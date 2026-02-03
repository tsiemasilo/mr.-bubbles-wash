import jsPDF from "jspdf";

export const generateEnvironmentalCompliance = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  const primaryColor: [number, number, number] = [14, 116, 144];
  const darkColor: [number, number, number] = [15, 23, 42];
  const grayColor: [number, number, number] = [71, 85, 105];
  const greenColor: [number, number, number] = [22, 101, 52];
  const accentColor: [number, number, number] = [6, 182, 212];

  const drawBubbles = () => {
    doc.setDrawColor(14, 116, 144);
    doc.setFillColor(14, 116, 144);
    const bubbles = [
      { x: 15, y: 35, r: 10 }, { x: 195, y: 40, r: 12 },
      { x: 20, y: 280, r: 8 }, { x: 190, y: 275, r: 10 },
    ];
    doc.setGState(doc.GState({ opacity: 0.08 }));
    bubbles.forEach(b => doc.circle(b.x, b.y, b.r, "F"));
    doc.setGState(doc.GState({ opacity: 1 }));
  };

  const drawCheckItem = (text: string, x: number, yPos: number, maxWidth: number): number => {
    doc.setTextColor(...greenColor);
    doc.setFontSize(9);
    doc.text("\u2713", x, yPos);
    doc.setTextColor(...grayColor);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(text, maxWidth - 8);
    doc.text(lines, x + 6, yPos);
    return yPos + (lines.length * 4) + 1.5;
  };

  const drawSectionBox = (title: string, items: string[], x: number, yPos: number, width: number, bgColor: [number, number, number]): number => {
    const itemHeight = items.length * 5.5 + 12;
    doc.setFillColor(...bgColor);
    doc.roundedRect(x, yPos, width, itemHeight, 2, 2, "F");
    
    doc.setTextColor(...primaryColor);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(title, x + 4, yPos + 6);
    
    let itemY = yPos + 12;
    items.forEach(item => {
      itemY = drawCheckItem(item, x + 4, itemY, width - 8);
    });
    
    return itemHeight;
  };

  drawBubbles();

  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 30, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("ENVIRONMENTAL COMPLIANCE STATEMENT", pageWidth / 2, 14, { align: "center" });
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Mr. Bubbles Bubbles - Premium Car Wash", pageWidth / 2, 23, { align: "center" });
  
  doc.setFillColor(...accentColor);
  doc.rect(0, 30, pageWidth, 2, "F");

  let yPos = 40;
  
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(15, yPos, pageWidth - 30, 18, 3, 3, "F");
  doc.setTextColor(...greenColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Commitment Statement", 20, yPos + 7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...grayColor);
  doc.setFontSize(9);
  const commitment = "Mr. Bubbles Bubbles commits to operating a fully compliant, environmentally responsible outdoor car wash service in line with mall policies and municipal bylaws.";
  const commitLines = doc.splitTextToSize(commitment, pageWidth - 40);
  doc.text(commitLines, 20, yPos + 13);

  yPos = 65;
  const colWidth = (pageWidth - 40) / 2;
  
  const waterItems = [
    "Average usage: ~70 L per vehicle",
    "High-pressure, low-flow equipment",
    "No continuous hose flow",
    "Water usage logs available on request",
  ];
  const h1 = drawSectionBox("Water Management", waterItems, 15, yPos, colWidth, [240, 249, 255]);
  
  const wastewaterItems = [
    "All wash water captured on containment mats",
    "Processed through portable oil-water separator",
    "Discharged only into approved sewer connection",
    "No stormwater contamination",
  ];
  const h2 = drawSectionBox("Wastewater Control", wastewaterItems, 20 + colWidth, yPos, colWidth, [240, 249, 255]);
  
  yPos += Math.max(h1, h2) + 5;
  
  const oilItems = [
    "1,000 L oil-water separator installed",
    "Oil, fuel residue & sludge captured",
    "Serviced by licensed waste contractor",
    "Maintenance records retained",
  ];
  const h3 = drawSectionBox("Oil & Grease Management", oilItems, 15, yPos, colWidth, [255, 247, 237]);
  
  const chemItems = [
    "Biodegradable, low-phosphate detergents",
    "No hazardous substances stored on site",
    "MSDS sheets available for all products",
    "Staff trained on chemical handling",
  ];
  const h4 = drawSectionBox("Chemicals", chemItems, 20 + colWidth, yPos, colWidth, [255, 247, 237]);
  
  yPos += Math.max(h3, h4) + 5;
  
  const infraItems = [
    "No excavation required",
    "No permanent structural changes",
    "Fully removable installation",
    "Minimal footprint on premises",
  ];
  const h5 = drawSectionBox("Infrastructure Impact", infraItems, 15, yPos, colWidth, [248, 250, 252]);
  
  const noiseItems = [
    "Low-noise pressure washing equipment",
    "Non-slip mats for safety",
    "Staff PPE and safety training",
    "Fire extinguisher on site",
  ];
  const h6 = drawSectionBox("Noise & Safety", noiseItems, 20 + colWidth, yPos, colWidth, [248, 250, 252]);
  
  yPos += Math.max(h5, h6) + 5;
  
  const insuranceItems = [
    "Public liability insurance in place",
    "Risk mitigation measures implemented",
    "Emergency response procedures",
    "Incident reporting protocols",
  ];
  drawSectionBox("Insurance & Risk", insuranceItems, 15, yPos, pageWidth - 30, [240, 253, 244]);
  
  yPos += 35;
  
  doc.setFillColor(...primaryColor);
  doc.roundedRect(15, yPos, pageWidth - 30, 28, 3, 3, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("Key Compliance Statement:", 20, yPos + 7);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  const keyStatement = '"All wastewater generated on site will be captured, processed through a 1,000-litre oil-water separator, and discharged only into an approved sewer connection, with no discharge into stormwater systems."';
  const keyLines = doc.splitTextToSize(keyStatement, pageWidth - 40);
  doc.text(keyLines, 20, yPos + 14);

  yPos += 35;
  
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(15, yPos, pageWidth - 30, 22, 3, 3, "F");
  doc.setTextColor(...darkColor);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("Conclusion:", 20, yPos + 7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...grayColor);
  doc.setFontSize(8);
  const conclusion = "The proposed outdoor car wash operation poses minimal environmental risk, complies with mall operational standards, and protects all drainage and infrastructure systems.";
  const conclusionLines = doc.splitTextToSize(conclusion, pageWidth - 40);
  doc.text(conclusionLines, 20, yPos + 13);

  doc.setFillColor(...accentColor);
  doc.rect(0, pageHeight - 20, pageWidth, 20, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("Mr. Bubbles Bubbles", 20, pageHeight - 10);
  doc.setFont("helvetica", "normal");
  doc.text("|  Phone: 082 806 9569  |  Boksburg Center, Gauteng", 62, pageHeight - 10);
  doc.text("February 2025", pageWidth - 35, pageHeight - 10);

  doc.save("Mr_Bubbles_Environmental_Compliance.pdf");
};
