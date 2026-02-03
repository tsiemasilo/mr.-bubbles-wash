import jsPDF from "jspdf";

export const generateMallPartnership = () => {
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
    doc.rect(0, 0, pageWidth, 28, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(title, 20, 18);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Page ${pageNum}`, pageWidth - 28, 18);
    doc.setFillColor(...accentColor);
    doc.rect(0, 28, pageWidth, 3, "F");
  };

  const drawSectionHeader = (title: string, yPos: number, number?: string): number => {
    doc.setFillColor(240, 249, 255);
    doc.roundedRect(15, yPos - 7, pageWidth - 30, 16, 2, 2, "F");
    doc.setFillColor(...primaryColor);
    doc.roundedRect(15, yPos - 7, 5, 16, 1, 1, "F");
    doc.setTextColor(...primaryColor);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    const headerText = number ? `${number}. ${title}` : title;
    doc.text(headerText, 26, yPos + 4);
    return yPos + 20;
  };

  const drawSubHeader = (title: string, yPos: number): number => {
    doc.setTextColor(...darkColor);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text(title, 25, yPos);
    return yPos + 9;
  };

  const drawBulletPoint = (text: string, x: number, yPos: number, maxWidth: number): number => {
    doc.setFillColor(...accentColor);
    doc.circle(x + 2, yPos - 2, 2, "F");
    doc.setTextColor(...grayColor);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(text, maxWidth - 12);
    doc.text(lines, x + 10, yPos);
    return yPos + (lines.length * 6) + 2.5;
  };

  const drawCheckmark = (text: string, x: number, yPos: number, maxWidth: number): number => {
    doc.setTextColor(...greenColor);
    doc.setFontSize(12);
    doc.text("\u2713", x + 2, yPos);
    doc.setTextColor(...grayColor);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(text, maxWidth - 12);
    doc.text(lines, x + 12, yPos);
    return yPos + (lines.length * 6) + 2.5;
  };

  const drawParagraph = (text: string, x: number, yPos: number, maxWidth: number): number => {
    doc.setTextColor(...grayColor);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, yPos);
    return yPos + (lines.length * 6) + 4;
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
  doc.setFontSize(32);
  doc.setFont("helvetica", "bold");
  doc.text("Mr. Bubbles Bubbles", pageWidth / 2, 95, { align: "center" });
  
  doc.setFontSize(15);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...grayColor);
  doc.text("Premium Car Wash Experience", pageWidth / 2, 110, { align: "center" });
  
  doc.setFillColor(...accentColor);
  doc.rect(60, 120, pageWidth - 120, 2, "F");
  
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...darkColor);
  doc.text("MALL LOYALTY PARTNERSHIP", pageWidth / 2, 140, { align: "center" });
  
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...grayColor);
  doc.text("Spend-to-Wash Rewards Program", pageWidth / 2, 154, { align: "center" });
  doc.text('"Shop \u2022 Dine \u2022 Wash"', pageWidth / 2, 166, { align: "center" });
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.text("Location: Boksburg Centre, Gauteng", pageWidth / 2, 210, { align: "center" });
  doc.text("Phone: 082 806 9569", pageWidth / 2, 223, { align: "center" });
  doc.text("Website: www.mrbubbles.co.za", pageWidth / 2, 236, { align: "center" });
  
  doc.setFontSize(12);
  doc.text("Date: February 2025", pageWidth / 2, 260, { align: "center" });

  // ===== PAGE 2: TABLE OF CONTENTS =====
  doc.addPage();
  drawBubbles(0.06);
  drawPageHeader("Mr. Bubbles Bubbles - Mall Partnership Proposal", 2);
  
  let yPos = 48;
  doc.setTextColor(...darkColor);
  doc.setFontSize(26);
  doc.setFont("helvetica", "bold");
  doc.text("Table of Contents", pageWidth / 2, yPos, { align: "center" });
  doc.setFillColor(...accentColor);
  doc.rect(70, yPos + 6, pageWidth - 140, 2, "F");
  
  yPos = 72;
  const tocItems = [
    { num: "1", title: "Executive Summary", page: "3" },
    { num: "2", title: "The Big Idea", page: "3" },
    { num: "3", title: "How the Program Works", page: "4" },
    { num: "4", title: "Spend-Band Earning System", page: "4" },
    { num: "5", title: "Rewards Ladder", page: "5" },
    { num: "6", title: "Financial Sustainability & Margin Protection", page: "5" },
    { num: "7", title: "Funding Model", page: "6" },
    { num: "8", title: "Program Controls & Risk Management", page: "6" },
    { num: "9", title: "Tenant Benefits (Centre Performance)", page: "7" },
    { num: "10", title: "Pilot Plan & Success Metrics", page: "7" },
    { num: "11", title: "Next Steps", page: "8" },
  ];
  
  tocItems.forEach((item) => {
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(25, yPos - 5, pageWidth - 50, 13, 2, 2, "F");
    doc.setTextColor(...primaryColor);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`${item.num}.`, 30, yPos + 3);
    doc.setTextColor(...darkColor);
    doc.setFont("helvetica", "normal");
    doc.text(item.title, 44, yPos + 3);
    doc.setTextColor(...lightGray);
    doc.text(".".repeat(40), 115, yPos + 3);
    doc.setTextColor(...primaryColor);
    doc.setFont("helvetica", "bold");
    doc.text(item.page, pageWidth - 32, yPos + 3);
    yPos += 15;
  });

  // ===== PAGE 3: EXECUTIVE SUMMARY & THE BIG IDEA =====
  doc.addPage();
  drawBubbles(0.05);
  drawPageHeader("Mr. Bubbles Bubbles - Mall Partnership Proposal", 3);
  
  yPos = 40;
  yPos = drawSectionHeader("Executive Summary", yPos, "1");
  
  yPos = drawParagraph("Mr. Bubbles proposes a tenant-linked loyalty rewards program whereby customers earn points when they spend at participating restaurants, retail stores, and service outlets within Boksburg Centre. These points are redeemable for car wash rewards at Mr. Bubbles.", 20, yPos, pageWidth - 40);
  
  yPos = drawParagraph("The initiative positions the car wash as a customer experience amenity, rather than a standalone retail tenant, creating a measurable retention tool that increases average basket size, dwell time, and repeat visits across the centre.", 20, yPos, pageWidth - 40);
  
  yPos += 5;
  yPos = drawSectionHeader("The Big Idea", yPos, "2");
  
  doc.setFillColor(255, 247, 237);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 16, 3, 3, "F");
  doc.setTextColor(...orangeColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("This is not a discount scheme.", 25, yPos + 6);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...grayColor);
  doc.text("It is a structured, measurable loyalty system designed to positively influence customer behaviour.", 25, yPos + 13);
  yPos += 22;
  
  yPos = drawSubHeader("The Program is Designed to:", yPos);
  const programBenefits = [
    "Increase average basket size (\"spend slightly more to unlock rewards\")",
    "Increase dwell time (\"wash while shopping or dining\")",
    "Increase repeat centre visits through progressive rewards",
  ];
  programBenefits.forEach(b => { yPos = drawBulletPoint(b, 25, yPos, pageWidth - 50); });
  
  yPos += 5;
  yPos = drawSubHeader("Value Delivered:", yPos);
  
  doc.setFillColor(240, 249, 255);
  doc.roundedRect(20, yPos - 3, (pageWidth - 50) / 2, 38, 3, 3, "F");
  doc.setTextColor(...primaryColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("For the Centre", 25, yPos + 6);
  doc.setTextColor(...grayColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("\u2022 Increased overall tenant spend", 25, yPos + 15);
  doc.text("\u2022 Strong differentiation versus", 25, yPos + 22);
  doc.text("  competing centres", 25, yPos + 29);
  doc.text("\u2022 Actionable customer analytics", 25, yPos + 36);
  
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(20 + (pageWidth - 50) / 2 + 10, yPos - 3, (pageWidth - 50) / 2, 38, 3, 3, "F");
  doc.setTextColor(...greenColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("For Tenants", 25 + (pageWidth - 50) / 2 + 10, yPos + 6);
  doc.setTextColor(...grayColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("\u2022 Additional marketing exposure", 25 + (pageWidth - 50) / 2 + 10, yPos + 15);
  doc.text("\u2022 Performance-based participation", 25 + (pageWidth - 50) / 2 + 10, yPos + 22);
  doc.text("\u2022 Rewards focused on repeat", 25 + (pageWidth - 50) / 2 + 10, yPos + 29);
  doc.text("  customers", 25 + (pageWidth - 50) / 2 + 10, yPos + 36);

  // ===== PAGE 4: HOW IT WORKS & SPEND BANDS =====
  doc.addPage();
  drawBubbles(0.05);
  drawPageHeader("Mr. Bubbles Bubbles - Mall Partnership Proposal", 4);
  
  yPos = 40;
  yPos = drawSectionHeader("How the Program Works", yPos, "3");
  
  yPos = drawSubHeader("Customer Journey", yPos);
  const journey = [
    "Customer spends at participating centre tenants",
    "Customer earns loyalty points based on defined spend bands",
    "Points accumulate in a digital wallet (QR-based or card-based)",
    "Points are redeemed for car wash rewards at Mr. Bubbles",
    "Customer returns to the centre to earn additional points, creating a repeat-visit loop",
  ];
  journey.forEach(j => { yPos = drawBulletPoint(j, 25, yPos, pageWidth - 50); });
  
  yPos += 8;
  yPos = drawSectionHeader("Spend-Band Earning System", yPos, "4");
  
  yPos = drawParagraph("Points are earned in spend bands to ensure fairness, sustainability, and long-term viability. This approach encourages repeat centre visits rather than rewarding once-off high-value transactions.", 20, yPos, pageWidth - 40);
  
  yPos += 3;
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 60, 3, 3, "F");
  doc.setFillColor(...primaryColor);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 10, 3, 3, "F");
  doc.roundedRect(20, yPos + 2, pageWidth - 40, 5, 0, 0, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Mall Spend", 35, yPos + 4);
  doc.text("Points Earned", pageWidth - 55, yPos + 4);
  
  yPos += 15;
  const bands = [
    ["R100 \u2013 R199", "10 points"],
    ["R200 \u2013 R299", "20 points"],
    ["R300 \u2013 R399", "30 points"],
    ["R400 \u2013 R499", "40 points"],
    ["Every additional R100", "+10 points"],
  ];
  
  bands.forEach(([spend, points], i) => {
    if (i % 2 === 0) {
      doc.setFillColor(255, 255, 255);
      doc.rect(20, yPos - 4, pageWidth - 40, 9, "F");
    }
    doc.setTextColor(...darkColor);
    doc.setFont("helvetica", "normal");
    doc.text(spend, 35, yPos);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);
    doc.text(points, pageWidth - 55, yPos);
    yPos += 9;
  });
  
  yPos += 8;
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 14, 3, 3, "F");
  doc.setTextColor(...greenColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("In simple terms: Customers earn 10 points for every R100 spent at participating tenants.", 25, yPos + 6);

  // ===== PAGE 5: REWARDS LADDER & FINANCIAL ANALYSIS =====
  doc.addPage();
  drawBubbles(0.05);
  drawPageHeader("Mr. Bubbles Bubbles - Mall Partnership Proposal", 5);
  
  yPos = 40;
  yPos = drawSectionHeader("Rewards Ladder", yPos, "5");
  
  yPos = drawSubHeader("Upgrade-Focused, Profit-Safe Reward Structure", yPos);
  
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 52, 3, 3, "F");
  doc.setFillColor(...primaryColor);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 10, 3, 3, "F");
  doc.roundedRect(20, yPos + 2, pageWidth - 40, 5, 0, 0, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Tier", 30, yPos + 4);
  doc.text("Points", 75, yPos + 4);
  doc.text("Reward", 110, yPos + 4);
  
  yPos += 15;
  const tiers = [
    ["Tier 1 \u2013 Engagement", "50 pts", "Free air freshener or tyre shine"],
    ["Tier 2 \u2013 Momentum", "120 pts", "Free interior wipe-down or premium add-on"],
    ["Tier 3 \u2013 Milestone", "250 pts", "R30 off any wash"],
    ["Tier 4 \u2013 Headline", "500 pts", "Free Basic Wash (up to R80)"],
  ];
  
  tiers.forEach(([tier, points, reward], i) => {
    if (i % 2 === 0) {
      doc.setFillColor(255, 255, 255);
      doc.rect(20, yPos - 4, pageWidth - 40, 9, "F");
    }
    doc.setTextColor(...darkColor);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(tier, 30, yPos);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);
    doc.text(points, 75, yPos);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...grayColor);
    doc.text(reward, 110, yPos);
    yPos += 9;
  });
  
  yPos += 3;
  doc.setTextColor(...grayColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text("Rewards are designed to offer high perceived customer value while protecting operating margins.", 25, yPos);
  
  yPos += 12;
  yPos = drawSectionHeader("Financial Sustainability & Margin Protection", yPos, "6");
  
  yPos = drawSubHeader("Key Assumptions", yPos);
  
  doc.setFillColor(240, 249, 255);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 55, 3, 3, "F");
  doc.setTextColor(...grayColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  yPos += 5;
  doc.text("\u2022 Average customer spend per centre visit: R300", 25, yPos);
  yPos += 7;
  doc.text("\u2022 Points earned per visit: 30 points", 25, yPos);
  yPos += 7;
  doc.text("\u2022 Visits required to reach headline reward (500 points): \u00b117 visits", 25, yPos);
  
  yPos += 10;
  doc.setTextColor(...primaryColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Cost Impact", 25, yPos);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...grayColor);
  doc.setFontSize(10);
  yPos += 7;
  doc.text("\u2022 Variable cost of a basic wash: \u00b1R45", 25, yPos);
  yPos += 7;
  doc.text("\u2022 Reward cost is distributed across \u00b117 influenced visits", 25, yPos);
  
  yPos += 10;
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 20, 3, 3, "F");
  doc.setTextColor(...greenColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Outcome: Strong customer retention with healthy unit economics.", 25, yPos + 5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...grayColor);
  doc.text("All rewards are structured to ensure variable operating costs are covered on every redemption.", 25, yPos + 13);

  // ===== PAGE 6: FUNDING MODEL & PROGRAM CONTROLS =====
  doc.addPage();
  drawBubbles(0.05);
  drawPageHeader("Mr. Bubbles Bubbles - Mall Partnership Proposal", 6);
  
  yPos = 40;
  yPos = drawSectionHeader("Funding Model", yPos, "7");
  
  yPos = drawSubHeader("Split-Cost Structure (Sustainable & Low Risk)", yPos);
  
  doc.setFillColor(240, 249, 255);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 28, 3, 3, "F");
  doc.setTextColor(...primaryColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Tenant Contribution (Optional & Performance-Based)", 25, yPos + 6);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...grayColor);
  doc.setFontSize(10);
  doc.text("Participating tenants may contribute a small marketing fee (e.g. R10 per redemption),", 25, yPos + 14);
  doc.text("payable only when a reward is redeemed. This supports shared promotion and long-term sustainability.", 25, yPos + 21);
  
  yPos += 35;
  yPos = drawSubHeader("Mr. Bubbles Contribution", yPos);
  const yourContrib = [
    "Low-cost service upgrades (\u00b1R3\u2013R12 cost)",
    "Limited cash-off rewards",
    "Daily redemption caps",
  ];
  yourContrib.forEach(c => { yPos = drawBulletPoint(c, 25, yPos, pageWidth - 50); });
  
  yPos += 5;
  yPos = drawSubHeader("Centre Benefit", yPos);
  const centreBenefits = [
    "Increased spend and dwell time",
    "Customer loyalty data",
    "Unique experiential differentiator",
  ];
  centreBenefits.forEach(b => { yPos = drawBulletPoint(b, 25, yPos, pageWidth - 50); });
  
  yPos += 8;
  yPos = drawSectionHeader("Program Controls & Risk Management", yPos, "8");
  
  yPos = drawParagraph("The following safeguards ensure operational stability and minimal centre impact:", 20, yPos, pageWidth - 40);
  
  doc.setFillColor(240, 249, 255);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 62, 3, 3, "F");
  yPos += 5;
  const controls = [
    "Maximum one reward redemption per vehicle per day",
    "Maximum R30 discount per transaction (excluding headline reward)",
    "Points earned via QR scan linked to receipt reference",
    "Redemptions subject to daily capacity and operational availability",
    "Points expire after 90 days, limiting long-term liability",
    "Participation is opt-in, starting with 5\u201310 tenants during pilot",
  ];
  controls.forEach(c => { yPos = drawCheckmark(c, 25, yPos, pageWidth - 50); });
  
  yPos += 5;
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 14, 3, 3, "F");
  doc.setTextColor(...greenColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("The program will be managed to ensure no disruption to parking flow, pedestrian movement,", 25, yPos + 4);
  doc.text("or overall centre operations.", 25, yPos + 11);

  // ===== PAGE 7: TENANT BENEFITS & PILOT PLAN =====
  doc.addPage();
  drawBubbles(0.05);
  drawPageHeader("Mr. Bubbles Bubbles - Mall Partnership Proposal", 7);
  
  yPos = 40;
  yPos = drawSectionHeader("Tenant Benefits (Supporting Overall Centre Performance)", yPos, "9");
  
  yPos = drawSubHeader("Participating Tenants Receive:", yPos);
  const tenantSupport = [
    "Counter QR stand: \"Earn points for car wash rewards\"",
    "Simple cashier guidance",
    "Listing on the Mr. Bubbles website and booking platform",
    "Monthly performance summary (earnings and redemptions)",
  ];
  tenantSupport.forEach(t => { yPos = drawBulletPoint(t, 25, yPos, pageWidth - 50); });
  
  yPos += 3;
  doc.setFillColor(240, 249, 255);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 14, 3, 3, "F");
  doc.setTextColor(...primaryColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text("This structure supports tenant performance while reinforcing overall centre loyalty.", 25, yPos + 6);
  
  yPos += 20;
  yPos = drawSectionHeader("Pilot Plan & Success Metrics", yPos, "10");
  
  yPos = drawSubHeader("Phase 1: 30-Day Pilot", yPos);
  const phase1 = [
    "5\u201310 participating tenants",
    "Single wash bay operation",
    "Full rewards ladder active",
    "Signage in 2\u20133 strategic centre locations",
    "Weekly operational check-ins",
  ];
  phase1.forEach(p => { yPos = drawBulletPoint(p, 25, yPos, pageWidth - 50); });
  
  yPos += 3;
  yPos = drawSubHeader("Phase 2: 3-Month Scale", yPos);
  const phase2 = [
    "Expanded tenant participation",
    "Optional membership offering",
    "Reward optimisation based on data",
    "Full marketing rollout",
  ];
  phase2.forEach(p => { yPos = drawBulletPoint(p, 25, yPos, pageWidth - 50); });
  
  yPos += 5;
  doc.setFillColor(255, 247, 237);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 38, 3, 3, "F");
  doc.setTextColor(...orangeColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Pilot Success Indicators", 25, yPos + 6);
  yPos += 12;
  yPos = drawCheckmark("Increase in repeat car wash visits", 25, yPos, pageWidth - 50);
  yPos = drawCheckmark("Reward redemption activity", 25, yPos, pageWidth - 50);
  yPos = drawCheckmark("Tenant participation feedback", 25, yPos, pageWidth - 50);
  yPos = drawCheckmark("Customer engagement trends", 25, yPos, pageWidth - 50);

  // ===== PAGE 8: NEXT STEPS & CONCLUSION =====
  doc.addPage();
  drawBubbles(0.05);
  drawPageHeader("Mr. Bubbles Bubbles - Mall Partnership Proposal", 8);
  
  yPos = 40;
  yPos = drawSectionHeader("Next Steps", yPos, "11");
  
  yPos = drawParagraph("We propose a 30-day pilot program with selected tenants to validate customer uptake, operational flow, and commercial impact.", 20, yPos, pageWidth - 40);
  
  yPos = drawParagraph("We welcome the opportunity to present this proposal in person and align it with Boksburg Centre's customer experience and retention strategy.", 20, yPos, pageWidth - 40);
  
  yPos += 5;
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 50, 3, 3, "F");
  doc.setTextColor(...greenColor);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Why This Partnership Works", 25, yPos + 10);
  
  yPos += 18;
  yPos = drawCheckmark("Centre-friendly: Drives spend, loyalty, and insights", 25, yPos, pageWidth - 50);
  yPos = drawCheckmark("Finance-safe: Rewards capped, expiring, and above variable cost", 25, yPos, pageWidth - 50);
  yPos = drawCheckmark("Customer-focused: Clear goals, quick wins, aspirational rewards", 25, yPos, pageWidth - 50);
  yPos = drawCheckmark("Scalable: Pilot-led and data-driven", 25, yPos, pageWidth - 50);
  
  yPos += 10;
  doc.setFillColor(240, 249, 255);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 18, 3, 3, "F");
  doc.setTextColor(...primaryColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Optional:", 25, yPos + 5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...grayColor);
  doc.text("Bonus points may be introduced during centre campaigns or off-peak periods", 50, yPos + 5);
  doc.text("at management's discretion.", 25, yPos + 12);
  
  yPos += 30;
  doc.setFillColor(...primaryColor);
  doc.roundedRect(20, yPos, pageWidth - 40, 55, 5, 5, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Ready to Partner?", pageWidth / 2, yPos + 18, { align: "center" });
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Contact us to discuss this partnership opportunity", pageWidth / 2, yPos + 32, { align: "center" });
  
  doc.setFontSize(11);
  doc.text("082 806 9569  |  www.mrbubbles.co.za", pageWidth / 2, yPos + 45, { align: "center" });

  doc.save("Mr_Bubbles_Mall_Partnership_Proposal.pdf");
};
