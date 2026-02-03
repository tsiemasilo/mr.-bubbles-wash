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
  const greenColor: [number, number, number] = [22, 101, 52];
  const orangeColor: [number, number, number] = [194, 65, 12];

  const drawBubbles = (opacity: number = 0.08) => {
    doc.setDrawColor(14, 116, 144);
    doc.setFillColor(14, 116, 144);
    
    const bubbles = [
      { x: 20, y: 40, r: 15 }, { x: 35, y: 70, r: 8 }, { x: 15, y: 90, r: 12 },
      { x: 180, y: 50, r: 18 }, { x: 195, y: 85, r: 10 }, { x: 170, y: 100, r: 6 },
      { x: 25, y: 200, r: 14 }, { x: 45, y: 230, r: 9 }, { x: 185, y: 220, r: 16 },
      { x: 175, y: 250, r: 7 }, { x: 30, y: 140, r: 5 }, { x: 190, y: 150, r: 8 },
    ];
    
    doc.setGState(doc.GState({ opacity: opacity }));
    bubbles.forEach(b => doc.circle(b.x, b.y, b.r, "F"));
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

  const drawSubHeader = (title: string, yPos: number): number => {
    doc.setTextColor(...darkColor);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(title, 25, yPos);
    return yPos + 8;
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

  const drawCheckmark = (text: string, x: number, yPos: number, maxWidth: number): number => {
    doc.setTextColor(...greenColor);
    doc.setFontSize(10);
    doc.text("\u2713", x + 2, yPos);
    doc.setTextColor(...grayColor);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(text, maxWidth - 10);
    doc.text(lines, x + 10, yPos);
    return yPos + (lines.length * 5) + 2;
  };

  const drawParagraph = (text: string, x: number, yPos: number, maxWidth: number): number => {
    doc.setTextColor(...grayColor);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, yPos);
    return yPos + (lines.length * 5) + 3;
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
  doc.roundedRect(35, 65, pageWidth - 70, 110, 5, 5, "F");
  
  doc.setTextColor(...primaryColor);
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text("Mr. Bubbles Bubbles", pageWidth / 2, 95, { align: "center" });
  
  doc.setFontSize(13);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...grayColor);
  doc.text("Premium Car Wash Experience", pageWidth / 2, 108, { align: "center" });
  
  doc.setFillColor(...accentColor);
  doc.rect(60, 118, pageWidth - 120, 1, "F");
  
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...darkColor);
  doc.text("BUSINESS PROPOSAL", pageWidth / 2, 138, { align: "center" });
  
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...grayColor);
  doc.text("Car Wash & Valet Services", pageWidth / 2, 150, { align: "center" });
  doc.text("Mall & Commercial Location Approval", pageWidth / 2, 160, { align: "center" });
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.text("Boksburg Center, Gauteng", pageWidth / 2, 215, { align: "center" });
  doc.text("Phone: 082 806 9569", pageWidth / 2, 225, { align: "center" });
  doc.text("www.mrbubbles.co.za", pageWidth / 2, 235, { align: "center" });
  
  doc.setFontSize(10);
  doc.text("February 2025", pageWidth / 2, 265, { align: "center" });

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
  
  yPos = 68;
  const tocItems = [
    { num: "1", title: "Executive Summary", page: "3" },
    { num: "2", title: "Business Overview & Value Proposition", page: "3" },
    { num: "3", title: "Services Offered", page: "4" },
    { num: "4", title: "Target Market", page: "4" },
    { num: "5", title: "Pricing Strategy", page: "5" },
    { num: "6", title: "Competitive Advantage", page: "5" },
    { num: "7", title: "Operations & Compliance", page: "6" },
    { num: "8", title: "Appearance & Branding", page: "6" },
    { num: "9", title: "Marketing & Sales Strategy", page: "7" },
    { num: "10", title: "Technology & Systems", page: "7" },
    { num: "11", title: "Financial Projections", page: "8-9" },
    { num: "12", title: "Risk & Mitigation", page: "10" },
    { num: "13", title: "Conclusion", page: "10" },
  ];
  
  tocItems.forEach((item) => {
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(25, yPos - 5, pageWidth - 50, 11, 2, 2, "F");
    doc.setTextColor(...primaryColor);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(`${item.num}.`, 30, yPos + 2);
    doc.setTextColor(...darkColor);
    doc.setFont("helvetica", "normal");
    doc.text(item.title, 42, yPos + 2);
    doc.setTextColor(...lightGray);
    doc.text(".".repeat(45), 105, yPos + 2);
    doc.setTextColor(...primaryColor);
    doc.setFont("helvetica", "bold");
    doc.text(item.page, pageWidth - 30, yPos + 2);
    yPos += 14;
  });

  // ===== PAGE 3: EXECUTIVE SUMMARY & BUSINESS OVERVIEW =====
  doc.addPage();
  drawBubbles(0.05);
  drawPageHeader("Mr. Bubbles Bubbles - Business Proposal", 3);
  
  yPos = 40;
  yPos = drawSectionHeader("Executive Summary", yPos, "1");
  
  yPos = drawParagraph("Mr. Bubbles Bubbles proposes the operation of a professional car wash and valet service within Boksburg Center, aimed at enhancing customer convenience while increasing dwell time and repeat visits to the location.", 20, yPos, pageWidth - 40);
  yPos = drawParagraph("The business will offer efficient, affordable, and high-quality car wash services, supported by an online booking and loyalty rewards system. This service aligns with the objective of improving customer experience and providing value-added amenities.", 20, yPos, pageWidth - 40);
  
  yPos += 5;
  yPos = drawSectionHeader("Business Overview & Value Proposition", yPos, "2");
  
  const businessDetails = [
    ["Business Name:", "Mr. Bubbles Bubbles"],
    ["Location:", "Boksburg Center, Gauteng"],
    ["Business Type:", "Car wash, valet & detailing services"],
    ["Operating Model:", "Walk-ins + online bookings + loyalty rewards"],
  ];
  
  businessDetails.forEach(([label, value]) => {
    doc.setTextColor(...darkColor);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(label, 25, yPos);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...grayColor);
    doc.text(value, 72, yPos);
    yPos += 7;
  });
  
  yPos += 5;
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 42, 3, 3, "F");
  doc.setTextColor(...greenColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Value to Location Partners", 25, yPos + 5);
  yPos += 12;
  const valueProps = [
    "Increases customer time spent on site",
    "Encourages repeat visits",
    "Enhances overall customer convenience",
    "Professional, branded service improves location image",
    "Low-noise, low-risk operation",
  ];
  valueProps.forEach(v => { yPos = drawCheckmark(v, 25, yPos, pageWidth - 50); });
  
  yPos += 8;
  doc.setFillColor(240, 249, 255);
  doc.roundedRect(20, yPos - 3, (pageWidth - 50) / 2, 30, 3, 3, "F");
  doc.setTextColor(...primaryColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Our Vision", 25, yPos + 5);
  doc.setTextColor(...grayColor);
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.text("To become a reliable, go-to car", 25, yPos + 13);
  doc.text("wash brand known for convenience.", 25, yPos + 19);
  
  doc.setFillColor(255, 247, 237);
  doc.roundedRect(20 + (pageWidth - 50) / 2 + 10, yPos - 3, (pageWidth - 50) / 2, 30, 3, 3, "F");
  doc.setTextColor(...orangeColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Our Mission", 25 + (pageWidth - 50) / 2 + 10, yPos + 5);
  doc.setTextColor(...grayColor);
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.text("To deliver professional services", 25 + (pageWidth - 50) / 2 + 10, yPos + 13);
  doc.text("that save time & maintain quality.", 25 + (pageWidth - 50) / 2 + 10, yPos + 19);

  // ===== PAGE 4: SERVICES & TARGET MARKET =====
  doc.addPage();
  drawBubbles(0.05);
  drawPageHeader("Mr. Bubbles Bubbles - Business Proposal", 4);
  
  yPos = 40;
  yPos = drawSectionHeader("Services Offered", yPos, "3");
  
  yPos = drawSubHeader("Core Services", yPos);
  const coreServices = [
    "Quick Bubble (R80) - Exterior hand wash & dry, wheel cleaning, tyre shine",
    "Full Service (R120) - Interior vacuum, dashboard wipe, air freshener included",
    "Premium Detail (R250) - Leather treatment, carpet deep clean, wax polish",
    "Royal Treatment (R450) - Engine bay clean, machine buff, complete detail",
  ];
  coreServices.forEach(s => { yPos = drawBulletPoint(s, 25, yPos, pageWidth - 50); });
  
  yPos += 3;
  yPos = drawSubHeader("Premium Add-ons (R30 - R100)", yPos);
  const addons = ["Tyre shine & dressing", "Dashboard & leather treatment", "Engine bay cleaning", "SUV / bakkie surcharge"];
  addons.forEach(s => { yPos = drawBulletPoint(s, 25, yPos, pageWidth - 50); });
  
  yPos += 3;
  yPos = drawSubHeader("Future Enhancements", yPos);
  const future = ["Monthly wash memberships", "Fleet & corporate packages", "Promotional tie-ins with nearby retailers"];
  future.forEach(s => { yPos = drawBulletPoint(s, 25, yPos, pageWidth - 50); });
  
  yPos += 8;
  yPos = drawSectionHeader("Target Market", yPos, "4");
  
  yPos = drawSubHeader("Primary Customers", yPos);
  const targets = ["Mall shoppers & visitors", "Working professionals", "Families", "Ride-hailing drivers (Uber/Bolt)", "Mall tenants & staff", "Small business fleets"];
  targets.forEach(s => { yPos = drawBulletPoint(s, 25, yPos, pageWidth - 50); });
  
  yPos += 3;
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 22, 3, 3, "F");
  doc.setTextColor(...greenColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Customer Convenience:", 25, yPos + 5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...grayColor);
  doc.text("Most services completed in 20-45 minutes, allowing customers to shop or dine.", 25, yPos + 14);

  // ===== PAGE 5: PRICING & COMPETITIVE ADVANTAGE =====
  doc.addPage();
  drawBubbles(0.05);
  drawPageHeader("Mr. Bubbles Bubbles - Business Proposal", 5);
  
  yPos = 40;
  yPos = drawSectionHeader("Pricing Strategy", yPos, "5");
  
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 52, 3, 3, "F");
  doc.setFillColor(...primaryColor);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 10, 3, 3, "F");
  doc.roundedRect(20, yPos + 2, pageWidth - 40, 5, 0, 0, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Service Package", 30, yPos + 4);
  doc.text("Price", pageWidth - 45, yPos + 4);
  
  yPos += 15;
  const pricing = [
    ["Quick Bubble (Exterior)", "R80"],
    ["Full Service (Interior + Exterior)", "R120"],
    ["Premium Detail", "R250"],
    ["Royal Treatment (Full)", "R450"],
  ];
  
  pricing.forEach(([service, price], i) => {
    if (i % 2 === 0) {
      doc.setFillColor(255, 255, 255);
      doc.rect(20, yPos - 4, pageWidth - 40, 9, "F");
    }
    doc.setTextColor(...darkColor);
    doc.setFont("helvetica", "normal");
    doc.text(service, 30, yPos);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);
    doc.text(price, pageWidth - 45, yPos);
    yPos += 9;
  });
  
  yPos += 8;
  yPos = drawSubHeader("Loyalty Program", yPos);
  const loyalty = ["Points earned per wash", "Free wash after 10 visits", "Referral rewards for bringing friends", "Membership discounts for regulars"];
  loyalty.forEach(s => { yPos = drawBulletPoint(s, 25, yPos, pageWidth - 50); });
  
  yPos += 8;
  yPos = drawSectionHeader("Competitive Advantage", yPos, "6");
  
  const advantages = [
    "Online booking & quick check-in system",
    "Loyalty rewards program with digital tracking",
    "Consistent service quality with trained staff",
    "Competitive pricing for all budgets",
    "Clear SOPs ensuring quality control",
    "SMS reminders & rebooking convenience",
  ];
  advantages.forEach(s => { yPos = drawBulletPoint(s, 25, yPos, pageWidth - 50); });

  // ===== PAGE 6: OPERATIONS & COMPLIANCE, APPEARANCE =====
  doc.addPage();
  drawBubbles(0.05);
  drawPageHeader("Mr. Bubbles Bubbles - Business Proposal", 6);
  
  yPos = 40;
  yPos = drawSectionHeader("Operations & Compliance", yPos, "7");
  
  yPos = drawSubHeader("Staffing", yPos);
  yPos = drawBulletPoint("2-4 trained car wash attendants (shift-based)", 25, yPos, pageWidth - 50);
  yPos = drawBulletPoint("1 on-site supervisor/manager", 25, yPos, pageWidth - 50);
  
  yPos += 3;
  yPos = drawSubHeader("Operating Hours", yPos);
  yPos = drawBulletPoint("7 days a week including weekends and public holidays", 25, yPos, pageWidth - 50);
  yPos = drawBulletPoint("Monday - Sunday: 9:00 AM - 17:00 PM", 25, yPos, pageWidth - 50);
  
  yPos += 3;
  yPos = drawSubHeader("Equipment", yPos);
  const equipment = ["Pressure washers", "Water tanks & hoses", "Vacuum cleaners", "Cleaning chemicals", "Shade structures"];
  equipment.forEach(s => { yPos = drawBulletPoint(s, 25, yPos, pageWidth - 50); });
  
  yPos += 3;
  doc.setFillColor(240, 249, 255);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 45, 3, 3, "F");
  doc.setTextColor(...primaryColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Health, Safety & Environmental Compliance", 25, yPos + 5);
  yPos += 10;
  const compliance = ["Controlled water usage", "Approved cleaning chemicals only", "Wastewater managed per requirements", "Public liability insurance", "Staff PPE and safety training"];
  compliance.forEach(s => { yPos = drawCheckmark(s, 25, yPos, pageWidth - 50); });
  
  yPos += 10;
  yPos = drawSectionHeader("Appearance & Branding", yPos, "8");
  
  const appearance = ["Clean, uniformed staff at all times", "Professionally branded signage", "Clearly marked service area", "Minimal visual and noise disruption"];
  appearance.forEach(s => { yPos = drawBulletPoint(s, 25, yPos, pageWidth - 50); });

  // ===== PAGE 7: MARKETING & TECHNOLOGY =====
  doc.addPage();
  drawBubbles(0.05);
  drawPageHeader("Mr. Bubbles Bubbles - Business Proposal", 7);
  
  yPos = 40;
  yPos = drawSectionHeader("Marketing & Sales Strategy", yPos, "9");
  
  const marketing = [
    "Mall-approved signage & promotional banners",
    "QR codes for instant booking & rewards signup",
    "Google Maps & local SEO optimization",
    "Social media campaigns (Facebook, Instagram, TikTok)",
    "Joint promotions with retailers",
    "Loyalty rewards linked to mall visits",
    "Promotional campaigns during peak periods",
  ];
  marketing.forEach(s => { yPos = drawBulletPoint(s, 25, yPos, pageWidth - 50); });
  
  yPos += 10;
  yPos = drawSectionHeader("Technology & Systems", yPos, "10");
  
  const tech = [
    "Mobile-friendly online booking system",
    "Digital payment options (cash, card, EFT, mobile pay)",
    "Customer database & loyalty tracking",
    "SMS notifications for service updates",
    "Sales and performance reporting dashboard",
    "Reporting available to mall management if required",
  ];
  tech.forEach(s => { yPos = drawBulletPoint(s, 25, yPos, pageWidth - 50); });

  // ===== PAGE 8: FINANCIAL PROJECTIONS - PART 1 =====
  doc.addPage();
  drawBubbles(0.05);
  drawPageHeader("Mr. Bubbles Bubbles - Business Proposal", 8);
  
  yPos = 40;
  yPos = drawSectionHeader("Financial Projections", yPos, "11");
  
  yPos = drawSubHeader("Startup Cost Estimate", yPos);
  
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 60, 3, 3, "F");
  doc.setFillColor(...primaryColor);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 10, 3, 3, "F");
  doc.roundedRect(20, yPos + 2, pageWidth - 40, 5, 0, 0, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Item", 30, yPos + 4);
  doc.text("Estimated Cost", pageWidth - 55, yPos + 4);
  
  yPos += 15;
  const startupCosts = [
    ["Equipment & setup", "R50,000 - R80,000"],
    ["Branding & signage", "R10,000 - R20,000"],
    ["Initial supplies", "R5,000 - R10,000"],
    ["Insurance & compliance", "R5,000 - R10,000"],
  ];
  
  startupCosts.forEach(([item, cost], i) => {
    if (i % 2 === 0) {
      doc.setFillColor(255, 255, 255);
      doc.rect(20, yPos - 4, pageWidth - 40, 9, "F");
    }
    doc.setTextColor(...darkColor);
    doc.setFont("helvetica", "normal");
    doc.text(item, 30, yPos);
    doc.setTextColor(...grayColor);
    doc.text(cost, pageWidth - 55, yPos);
    yPos += 9;
  });
  
  doc.setFillColor(...accentColor);
  doc.rect(20, yPos - 2, pageWidth - 40, 10, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text("Total Startup Cost", 30, yPos + 5);
  doc.text("R70,000 - R120,000", pageWidth - 55, yPos + 5);
  
  yPos += 20;
  yPos = drawSubHeader("Monthly Operating Costs", yPos);
  
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 68, 3, 3, "F");
  doc.setFillColor(...primaryColor);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 10, 3, 3, "F");
  doc.roundedRect(20, yPos + 2, pageWidth - 40, 5, 0, 0, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Expense", 30, yPos + 4);
  doc.text("Monthly Cost", pageWidth - 55, yPos + 4);
  
  yPos += 15;
  const monthlyCosts = [
    ["Staff wages", "R15,000 - R25,000"],
    ["Rent / revenue share", "R10,000 - R20,000"],
    ["Water & electricity", "R3,000 - R6,000"],
    ["Cleaning supplies", "R3,000 - R5,000"],
    ["Marketing & admin", "R2,000 - R4,000"],
  ];
  
  monthlyCosts.forEach(([item, cost], i) => {
    if (i % 2 === 0) {
      doc.setFillColor(255, 255, 255);
      doc.rect(20, yPos - 4, pageWidth - 40, 9, "F");
    }
    doc.setTextColor(...darkColor);
    doc.setFont("helvetica", "normal");
    doc.text(item, 30, yPos);
    doc.setTextColor(...grayColor);
    doc.text(cost, pageWidth - 55, yPos);
    yPos += 9;
  });
  
  doc.setFillColor(...accentColor);
  doc.rect(20, yPos - 2, pageWidth - 40, 10, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text("Total Monthly Costs", 30, yPos + 5);
  doc.text("R33,000 - R60,000", pageWidth - 55, yPos + 5);

  // ===== PAGE 9: FINANCIAL PROJECTIONS - PART 2 =====
  doc.addPage();
  drawBubbles(0.05);
  drawPageHeader("Mr. Bubbles Bubbles - Business Proposal", 9);
  
  yPos = 40;
  yPos = drawSubHeader("Revenue Projections", yPos);
  
  doc.setFillColor(240, 249, 255);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 25, 3, 3, "F");
  doc.setTextColor(...primaryColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Key Assumptions:", 25, yPos + 5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...grayColor);
  doc.text("Average cars per day: 25-45  |  Average spend: R150-R160  |  Operating days: 26/month", 25, yPos + 15);
  
  yPos += 35;
  
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 45, 3, 3, "F");
  doc.setFillColor(...primaryColor);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 10, 3, 3, "F");
  doc.roundedRect(20, yPos + 2, pageWidth - 40, 5, 0, 0, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Scenario", 30, yPos + 4);
  doc.text("Calculation", 85, yPos + 4);
  doc.text("Monthly Revenue", pageWidth - 55, yPos + 4);
  
  yPos += 15;
  const scenarios = [
    ["Conservative", "25 cars x R150 x 26", "R97,500"],
    ["Moderate", "35 cars x R150 x 26", "R136,500"],
    ["Strong Location", "45 cars x R160 x 26", "R187,200"],
  ];
  
  scenarios.forEach(([scenario, calc, revenue], i) => {
    if (i % 2 === 0) {
      doc.setFillColor(255, 255, 255);
      doc.rect(20, yPos - 4, pageWidth - 40, 9, "F");
    }
    doc.setTextColor(...darkColor);
    doc.setFont("helvetica", "normal");
    doc.text(scenario, 30, yPos);
    doc.setTextColor(...grayColor);
    doc.text(calc, 85, yPos);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...greenColor);
    doc.text(revenue, pageWidth - 55, yPos);
    yPos += 9;
  });
  
  yPos += 15;
  yPos = drawSubHeader("Estimated Monthly Profit", yPos);
  
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 45, 3, 3, "F");
  doc.setFillColor(...greenColor);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 10, 3, 3, "F");
  doc.roundedRect(20, yPos + 2, pageWidth - 40, 5, 0, 0, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Scenario", 30, yPos + 4);
  doc.text("Revenue", 80, yPos + 4);
  doc.text("Costs", 120, yPos + 4);
  doc.text("Profit", pageWidth - 45, yPos + 4);
  
  yPos += 15;
  const profits = [
    ["Conservative", "R97,500", "R45,000", "R52,500"],
    ["Moderate", "R136,500", "R50,000", "R86,500"],
    ["Strong", "R187,200", "R55,000", "R132,200"],
  ];
  
  profits.forEach(([scenario, rev, cost, profit], i) => {
    if (i % 2 === 0) {
      doc.setFillColor(220, 252, 231);
      doc.rect(20, yPos - 4, pageWidth - 40, 9, "F");
    }
    doc.setTextColor(...darkColor);
    doc.setFont("helvetica", "normal");
    doc.text(scenario, 30, yPos);
    doc.setTextColor(...grayColor);
    doc.text(rev, 80, yPos);
    doc.text(cost, 120, yPos);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...greenColor);
    doc.text(profit, pageWidth - 45, yPos);
    yPos += 9;
  });
  
  yPos += 15;
  doc.setFillColor(...primaryColor);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 25, 3, 3, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Break-Even Estimate", 25, yPos + 8);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Achievable within 2-4 months, depending on traffic and rent structure.", 25, yPos + 17);

  // ===== PAGE 10: RISKS & CONCLUSION =====
  doc.addPage();
  drawBubbles(0.05);
  drawPageHeader("Mr. Bubbles Bubbles - Business Proposal", 10);
  
  yPos = 40;
  yPos = drawSectionHeader("Risk & Mitigation", yPos, "12");
  
  doc.setFillColor(254, 242, 242);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 55, 3, 3, "F");
  doc.setFillColor(153, 27, 27);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 10, 3, 3, "F");
  doc.roundedRect(20, yPos + 2, pageWidth - 40, 5, 0, 0, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Risk Factor", 30, yPos + 4);
  doc.text("Mitigation Strategy", 100, yPos + 4);
  
  yPos += 15;
  const risks = [
    ["Weather dependency", "Covered washing bays, promotions on slow days"],
    ["Inconsistent quality", "Staff training, supervision & clear SOPs"],
    ["Competition", "Loyalty rewards & superior customer experience"],
  ];
  
  risks.forEach(([risk, mitigation], i) => {
    if (i % 2 === 0) {
      doc.setFillColor(254, 226, 226);
      doc.rect(20, yPos - 4, pageWidth - 40, 12, "F");
    }
    doc.setTextColor(...darkColor);
    doc.setFont("helvetica", "normal");
    doc.text(risk, 30, yPos + 2);
    doc.setTextColor(...grayColor);
    const mitLines = doc.splitTextToSize(mitigation, 80);
    doc.text(mitLines, 100, yPos + 2);
    yPos += 13;
  });
  
  yPos += 12;
  yPos = drawSectionHeader("Conclusion", yPos, "13");
  
  doc.setFillColor(...primaryColor);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 50, 5, 5, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const conclusion = "Mr. Bubbles Bubbles offers a low-risk, high-value service that complements the tenant mix, enhances customer convenience, and drives repeat foot traffic. The business is operationally sound, financially viable, and aligned with operational standards.";
  const conclusionLines = doc.splitTextToSize(conclusion, pageWidth - 50);
  doc.text(conclusionLines, 25, yPos + 8);
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Thank you for considering this proposal.", pageWidth / 2, yPos + 38, { align: "center" });
  
  yPos += 65;
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(20, yPos, pageWidth - 40, 40, 3, 3, "F");
  
  doc.setTextColor(...darkColor);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Contact Information", pageWidth / 2, yPos + 12, { align: "center" });
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...grayColor);
  doc.text("Phone: 082 806 9569", pageWidth / 2, yPos + 23, { align: "center" });
  doc.text("Location: Boksburg Center, Gauteng", pageWidth / 2, yPos + 32, { align: "center" });

  doc.save("Mr_Bubbles_Business_Proposal.pdf");
};
