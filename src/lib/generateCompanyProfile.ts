import jsPDF from "jspdf";

export const generateCompanyProfile = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  const primaryColor: [number, number, number] = [14, 116, 144];
  const darkColor: [number, number, number] = [15, 23, 42];
  const grayColor: [number, number, number] = [71, 85, 105];
  const lightGray: [number, number, number] = [148, 163, 184];
  const accentColor: [number, number, number] = [6, 182, 212];

  const drawBubbles = (opacity: number = 0.08) => {
    doc.setDrawColor(14, 116, 144);
    doc.setFillColor(14, 116, 144);
    
    const bubbles = [
      { x: 20, y: 40, r: 15 },
      { x: 35, y: 70, r: 8 },
      { x: 15, y: 90, r: 12 },
      { x: 180, y: 50, r: 18 },
      { x: 195, y: 85, r: 10 },
      { x: 170, y: 100, r: 6 },
      { x: 25, y: 200, r: 14 },
      { x: 45, y: 230, r: 9 },
      { x: 185, y: 220, r: 16 },
      { x: 175, y: 250, r: 7 },
      { x: 30, y: 140, r: 5 },
      { x: 190, y: 150, r: 8 },
    ];
    
    doc.setGState(doc.GState({ opacity: opacity }));
    bubbles.forEach(b => {
      doc.circle(b.x, b.y, b.r, "F");
    });
    doc.setGState(doc.GState({ opacity: 1 }));
  };

  const drawPageHeader = (title: string, pageNum: number) => {
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, 25, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(title, 20, 16);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Page ${pageNum}`, pageWidth - 25, 16);
    
    doc.setFillColor(...accentColor);
    doc.rect(0, 25, pageWidth, 2, "F");
  };

  const drawSectionHeader = (title: string, yPos: number, number?: string): number => {
    doc.setFillColor(240, 249, 255);
    doc.roundedRect(15, yPos - 6, pageWidth - 30, 14, 2, 2, "F");
    
    doc.setFillColor(...primaryColor);
    doc.roundedRect(15, yPos - 6, 4, 14, 1, 1, "F");
    
    doc.setTextColor(...primaryColor);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    const headerText = number ? `${number}. ${title}` : title;
    doc.text(headerText, 25, yPos + 3);
    
    return yPos + 18;
  };

  const drawBulletPoint = (text: string, x: number, yPos: number, maxWidth: number): number => {
    doc.setFillColor(...accentColor);
    doc.circle(x + 2, yPos - 1.5, 1.5, "F");
    
    doc.setTextColor(...grayColor);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(text, maxWidth - 10);
    doc.text(lines, x + 8, yPos);
    return yPos + (lines.length * 5) + 2;
  };

  const drawSubBullet = (text: string, x: number, yPos: number, maxWidth: number): number => {
    doc.setTextColor(...lightGray);
    doc.text("○", x + 6, yPos);
    
    doc.setTextColor(...grayColor);
    doc.setFontSize(9);
    const lines = doc.splitTextToSize(text, maxWidth - 15);
    doc.text(lines, x + 14, yPos);
    return yPos + (lines.length * 4.5) + 1;
  };

  // ===== PAGE 1: COVER PAGE =====
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, pageHeight, "F");
  
  doc.setGState(doc.GState({ opacity: 0.1 }));
  doc.setFillColor(255, 255, 255);
  const coverBubbles = [
    { x: 30, y: 50, r: 40 }, { x: 170, y: 80, r: 50 }, { x: 50, y: 150, r: 30 },
    { x: 180, y: 180, r: 35 }, { x: 25, y: 220, r: 45 }, { x: 160, y: 250, r: 25 },
    { x: 100, y: 100, r: 20 }, { x: 140, y: 140, r: 15 }, { x: 80, y: 200, r: 28 },
  ];
  coverBubbles.forEach(b => doc.circle(b.x, b.y, b.r, "F"));
  doc.setGState(doc.GState({ opacity: 1 }));
  
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(40, 70, pageWidth - 80, 100, 5, 5, "F");
  
  doc.setTextColor(...primaryColor);
  doc.setFontSize(32);
  doc.setFont("helvetica", "bold");
  doc.text("Mr. Bubbles Bubbles", pageWidth / 2, 100, { align: "center" });
  
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...grayColor);
  doc.text("Premium Car Wash Experience", pageWidth / 2, 115, { align: "center" });
  
  doc.setFillColor(...accentColor);
  doc.rect(70, 125, pageWidth - 140, 1, "F");
  
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...darkColor);
  doc.text("BUSINESS PROPOSAL", pageWidth / 2, 145, { align: "center" });
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...grayColor);
  doc.text("Car Wash & Valet Services", pageWidth / 2, 158, { align: "center" });
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.text("Boksburg Center, Gauteng", pageWidth / 2, 220, { align: "center" });
  doc.text("Phone: 082 806 9569", pageWidth / 2, 230, { align: "center" });
  doc.text("www.mrbubbles.co.za", pageWidth / 2, 240, { align: "center" });
  
  doc.setFontSize(10);
  doc.text("February 2025", pageWidth / 2, 270, { align: "center" });

  // ===== PAGE 2: TABLE OF CONTENTS =====
  doc.addPage();
  drawBubbles(0.06);
  drawPageHeader("Mr. Bubbles Bubbles - Business Proposal", 2);
  
  let yPos = 45;
  doc.setTextColor(...darkColor);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("Table of Contents", pageWidth / 2, yPos, { align: "center" });
  
  doc.setFillColor(...accentColor);
  doc.rect(70, yPos + 5, pageWidth - 140, 1, "F");
  
  yPos = 70;
  const tocItems = [
    { num: "1", title: "Executive Summary", page: "3" },
    { num: "2", title: "Business Overview", page: "3" },
    { num: "3", title: "Services Offered", page: "4" },
    { num: "4", title: "Target Market", page: "4" },
    { num: "5", title: "Pricing Strategy", page: "5" },
    { num: "6", title: "Competitive Advantage", page: "5" },
    { num: "7", title: "Marketing & Sales Strategy", page: "6" },
    { num: "8", title: "Operations Plan", page: "6" },
    { num: "9", title: "Technology & Systems", page: "7" },
    { num: "10", title: "Financial Overview", page: "7" },
    { num: "11", title: "Risk & Mitigation", page: "8" },
    { num: "12", title: "Conclusion", page: "8" },
  ];
  
  tocItems.forEach((item) => {
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(25, yPos - 5, pageWidth - 50, 12, 2, 2, "F");
    
    doc.setTextColor(...primaryColor);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(`${item.num}.`, 30, yPos + 2);
    
    doc.setTextColor(...darkColor);
    doc.setFont("helvetica", "normal");
    doc.text(item.title, 42, yPos + 2);
    
    doc.setTextColor(...lightGray);
    const dots = ".".repeat(50);
    doc.text(dots, 100, yPos + 2);
    
    doc.setTextColor(...primaryColor);
    doc.setFont("helvetica", "bold");
    doc.text(item.page, pageWidth - 30, yPos + 2);
    
    yPos += 15;
  });

  // ===== PAGE 3: EXECUTIVE SUMMARY & BUSINESS OVERVIEW =====
  doc.addPage();
  drawBubbles(0.05);
  drawPageHeader("Mr. Bubbles Bubbles - Business Proposal", 3);
  
  yPos = 40;
  yPos = drawSectionHeader("Executive Summary", yPos, "1");
  
  doc.setTextColor(...grayColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const execSummary = "This proposal outlines the establishment of a modern car wash and valet service designed to provide convenient, high-quality vehicle cleaning to customers in a high-traffic location. The business focuses on speed, affordability, repeat customers, and customer loyalty, supported by an online booking and rewards system.";
  const execLines = doc.splitTextToSize(execSummary, pageWidth - 40);
  doc.text(execLines, 20, yPos);
  yPos += execLines.length * 5 + 5;
  
  const execSummary2 = "Mr. Bubbles Bubbles caters to private vehicle owners, fleet clients, and local businesses, offering tiered wash packages and optional premium services.";
  const execLines2 = doc.splitTextToSize(execSummary2, pageWidth - 40);
  doc.text(execLines2, 20, yPos);
  yPos += execLines2.length * 5 + 12;
  
  yPos = drawSectionHeader("Business Overview", yPos, "2");
  
  const businessDetails = [
    ["Business Name:", "Mr. Bubbles Bubbles"],
    ["Location:", "Boksburg Center, Gauteng"],
    ["Business Type:", "Car wash, valet, and vehicle detailing services"],
    ["Operating Model:", "Walk-ins + online bookings + loyalty rewards"],
  ];
  
  businessDetails.forEach(([label, value]) => {
    doc.setTextColor(...darkColor);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(label, 25, yPos);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...grayColor);
    doc.text(value, 70, yPos);
    yPos += 7;
  });
  
  yPos += 8;
  doc.setFillColor(240, 249, 255);
  doc.roundedRect(20, yPos - 5, pageWidth - 40, 35, 3, 3, "F");
  
  doc.setTextColor(...primaryColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Our Vision", 25, yPos + 3);
  doc.setTextColor(...grayColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text("To become a reliable, go-to car wash brand known for convenience,", 25, yPos + 12);
  doc.text("consistency, and excellent customer service.", 25, yPos + 18);
  
  yPos += 40;
  doc.setFillColor(255, 247, 237);
  doc.roundedRect(20, yPos - 5, pageWidth - 40, 35, 3, 3, "F");
  
  doc.setTextColor(194, 65, 12);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Our Mission", 25, yPos + 3);
  doc.setTextColor(...grayColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text("To deliver professional car wash services that save customers time while", 25, yPos + 12);
  doc.text("maintaining competitive pricing and consistent quality.", 25, yPos + 18);

  // ===== PAGE 4: SERVICES & TARGET MARKET =====
  doc.addPage();
  drawBubbles(0.05);
  drawPageHeader("Mr. Bubbles Bubbles - Business Proposal", 4);
  
  yPos = 40;
  yPos = drawSectionHeader("Services Offered", yPos, "3");
  
  doc.setTextColor(...darkColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Core Services", 25, yPos);
  yPos += 8;
  
  const coreServices = [
    "Quick Bubble (R80) - Exterior hand wash & dry, wheel cleaning, tyre shine",
    "Full Service (R120) - Interior vacuum, dashboard wipe, air freshener",
    "Premium Detail (R250) - Leather treatment, carpet deep clean, wax polish",
    "Royal Treatment (R450) - Engine bay clean, machine buff, full detail",
  ];
  coreServices.forEach(s => { yPos = drawBulletPoint(s, 25, yPos, pageWidth - 50); });
  
  yPos += 5;
  doc.setTextColor(...darkColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Premium Add-ons", 25, yPos);
  yPos += 8;
  
  const addons = ["Tyre shine & dressing", "Dashboard & leather treatment", "Engine bay cleaning", "SUV / bakkie surcharge"];
  addons.forEach(s => { yPos = drawBulletPoint(s, 25, yPos, pageWidth - 50); });
  
  yPos += 5;
  doc.setTextColor(...darkColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Future Additions", 25, yPos);
  yPos += 8;
  
  const future = ["Monthly wash memberships", "Fleet & corporate packages", "Mobile car wash services"];
  future.forEach(s => { yPos = drawBulletPoint(s, 25, yPos, pageWidth - 50); });
  
  yPos += 10;
  yPos = drawSectionHeader("Target Market", yPos, "4");
  
  doc.setTextColor(...darkColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Primary Customers", 25, yPos);
  yPos += 8;
  
  const targets = ["Private vehicle owners", "Working professionals", "Families", "Ride-hailing drivers (Uber/Bolt)", "Small business fleets"];
  targets.forEach(s => { yPos = drawBulletPoint(s, 25, yPos, pageWidth - 50); });
  
  yPos += 5;
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 28, 3, 3, "F");
  doc.setTextColor(22, 101, 52);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Market Opportunity:", 25, yPos + 5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...grayColor);
  const marketText = "Johannesburg has high vehicle density, limited time convenience needs, and strong demand for affordable vehicle maintenance services, especially in shopping centers.";
  const marketLines = doc.splitTextToSize(marketText, pageWidth - 50);
  doc.text(marketLines, 25, yPos + 13);

  // ===== PAGE 5: PRICING & COMPETITIVE ADVANTAGE =====
  doc.addPage();
  drawBubbles(0.05);
  drawPageHeader("Mr. Bubbles Bubbles - Business Proposal", 5);
  
  yPos = 40;
  yPos = drawSectionHeader("Pricing Strategy", yPos, "5");
  
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 50, 3, 3, "F");
  
  doc.setFillColor(...primaryColor);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 10, 3, 3, "F");
  doc.roundedRect(20, yPos + 2, pageWidth - 40, 5, 0, 0, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Service", 30, yPos + 4);
  doc.text("Price", pageWidth - 50, yPos + 4);
  
  yPos += 15;
  const pricing = [
    ["Quick Bubble (Exterior)", "R80"],
    ["Full Service (Interior + Exterior)", "R120"],
    ["Premium Detail", "R250"],
    ["Royal Treatment", "R450"],
  ];
  
  doc.setTextColor(...darkColor);
  pricing.forEach(([service, price], i) => {
    if (i % 2 === 0) {
      doc.setFillColor(255, 255, 255);
      doc.rect(20, yPos - 4, pageWidth - 40, 9, "F");
    }
    doc.setFont("helvetica", "normal");
    doc.text(service, 30, yPos);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);
    doc.text(price, pageWidth - 50, yPos);
    doc.setTextColor(...darkColor);
    yPos += 9;
  });
  
  yPos += 10;
  doc.setTextColor(...darkColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Loyalty Strategy", 25, yPos);
  yPos += 8;
  
  const loyalty = ["Points earned per wash", "Free wash after 10 visits", "Referral rewards", "Membership discounts"];
  loyalty.forEach(s => { yPos = drawBulletPoint(s, 25, yPos, pageWidth - 50); });
  
  yPos += 10;
  yPos = drawSectionHeader("Competitive Advantage", yPos, "6");
  
  const advantages = [
    "Online booking & quick check-in",
    "Loyalty rewards program with digital tracking",
    "Consistent service quality with trained staff",
    "Competitive pricing for all budgets",
    "Clear SOPs ensuring quality control",
    "SMS reminders & rebooking convenience",
  ];
  advantages.forEach(s => { yPos = drawBulletPoint(s, 25, yPos, pageWidth - 50); });

  // ===== PAGE 6: MARKETING & OPERATIONS =====
  doc.addPage();
  drawBubbles(0.05);
  drawPageHeader("Mr. Bubbles Bubbles - Business Proposal", 6);
  
  yPos = 40;
  yPos = drawSectionHeader("Marketing & Sales Strategy", yPos, "7");
  
  const marketing = [
    "On-site signage & promotional banners",
    "QR codes for instant booking & rewards signup",
    "Google Maps & local SEO optimization",
    "Social media campaigns (Facebook, Instagram, TikTok)",
    "Introductory discounts for new customers",
    "Partnerships with nearby businesses",
  ];
  marketing.forEach(s => { yPos = drawBulletPoint(s, 25, yPos, pageWidth - 50); });
  
  yPos += 10;
  yPos = drawSectionHeader("Operations Plan", yPos, "8");
  
  doc.setTextColor(...darkColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Staffing", 25, yPos);
  yPos += 8;
  yPos = drawBulletPoint("2-4 car wash attendants (shift-based)", 25, yPos, pageWidth - 50);
  yPos = drawBulletPoint("1 supervisor/manager", 25, yPos, pageWidth - 50);
  
  yPos += 5;
  doc.setTextColor(...darkColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Equipment", 25, yPos);
  yPos += 8;
  const equipment = ["Pressure washers", "Water tanks & hoses", "Vacuum cleaners", "Cleaning chemicals", "Shade structures"];
  equipment.forEach(s => { yPos = drawBulletPoint(s, 25, yPos, pageWidth - 50); });
  
  yPos += 5;
  doc.setTextColor(...darkColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Operating Hours", 25, yPos);
  yPos += 8;
  yPos = drawBulletPoint("Monday - Saturday: 7:00 AM - 6:00 PM", 25, yPos, pageWidth - 50);
  yPos = drawBulletPoint("Peak times: weekends & afternoons", 25, yPos, pageWidth - 50);

  // ===== PAGE 7: TECHNOLOGY & FINANCIALS =====
  doc.addPage();
  drawBubbles(0.05);
  drawPageHeader("Mr. Bubbles Bubbles - Business Proposal", 7);
  
  yPos = 40;
  yPos = drawSectionHeader("Technology & Systems", yPos, "9");
  
  const tech = [
    "Mobile-friendly booking website",
    "Digital payment options (cash, card, EFT, mobile pay)",
    "Customer database & loyalty tracking",
    "Sales and performance reporting dashboard",
  ];
  tech.forEach(s => { yPos = drawBulletPoint(s, 25, yPos, pageWidth - 50); });
  
  yPos += 10;
  yPos = drawSectionHeader("Financial Overview", yPos, "10");
  
  doc.setTextColor(...darkColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Startup Costs (Estimated)", 25, yPos);
  yPos += 8;
  
  yPos = drawBulletPoint("Equipment & setup: R40,000 - R80,000", 25, yPos, pageWidth - 50);
  yPos = drawBulletPoint("Branding & signage: R10,000 - R20,000", 25, yPos, pageWidth - 50);
  yPos = drawBulletPoint("Initial supplies: R5,000 - R10,000", 25, yPos, pageWidth - 50);
  
  yPos += 8;
  doc.setTextColor(...darkColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Revenue Potential", 25, yPos);
  yPos += 8;
  
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 40, 3, 3, "F");
  
  doc.setTextColor(22, 101, 52);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Average of 20-40 cars/day", 30, yPos + 5);
  doc.text("Average ticket size: R150", 30, yPos + 13);
  doc.setFont("helvetica", "bold");
  doc.text("Estimated monthly revenue: R90,000 - R180,000", 30, yPos + 23);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(...grayColor);
  doc.text("(Figures depend on location and operating efficiency)", 30, yPos + 32);

  // ===== PAGE 8: RISKS & CONCLUSION =====
  doc.addPage();
  drawBubbles(0.05);
  drawPageHeader("Mr. Bubbles Bubbles - Business Proposal", 8);
  
  yPos = 40;
  yPos = drawSectionHeader("Risk & Mitigation", yPos, "11");
  
  doc.setFillColor(254, 242, 242);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 55, 3, 3, "F");
  
  const risks = [
    { risk: "Weather dependency", mitigation: "Covered washing bays, promotions on slow days" },
    { risk: "Inconsistent quality", mitigation: "Staff training & supervision" },
    { risk: "Competition", mitigation: "Loyalty rewards & better customer experience" },
  ];
  
  doc.setTextColor(153, 27, 27);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Risk", 30, yPos + 5);
  doc.text("Mitigation", 100, yPos + 5);
  
  yPos += 12;
  risks.forEach(({ risk, mitigation }) => {
    doc.setTextColor(...darkColor);
    doc.setFont("helvetica", "normal");
    doc.text(risk, 30, yPos + 3);
    doc.setTextColor(...grayColor);
    const mitLines = doc.splitTextToSize(mitigation, 80);
    doc.text(mitLines, 100, yPos + 3);
    yPos += 14;
  });
  
  yPos += 15;
  yPos = drawSectionHeader("Conclusion", yPos, "12");
  
  doc.setFillColor(...primaryColor);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 50, 5, 5, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  const conclusion = "Mr. Bubbles Bubbles presents a scalable, high-demand service with strong repeat-customer potential. With the right location, efficient operations, and customer-focused systems, the business is positioned for sustainable growth and profitability.";
  const conclusionLines = doc.splitTextToSize(conclusion, pageWidth - 50);
  doc.text(conclusionLines, 25, yPos + 8);
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Thank you for considering this proposal.", pageWidth / 2, yPos + 35, { align: "center" });
  
  yPos += 70;
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(20, yPos, pageWidth - 40, 35, 3, 3, "F");
  
  doc.setTextColor(...darkColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Contact Information", pageWidth / 2, yPos + 10, { align: "center" });
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...grayColor);
  doc.text("Phone: 082 806 9569", pageWidth / 2, yPos + 20, { align: "center" });
  doc.text("Location: Boksburg Center, Gauteng", pageWidth / 2, yPos + 27, { align: "center" });

  doc.save("Mr_Bubbles_Business_Proposal.pdf");
};
