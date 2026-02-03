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
  doc.text("Mr. Bubbles", pageWidth / 2, 95, { align: "center" });
  
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
  doc.text("Boksburg Centre, Gauteng", pageWidth / 2, 215, { align: "center" });
  doc.text("Phone: 082 806 9569", pageWidth / 2, 228, { align: "center" });
  doc.text("www.mrbubbles.co.za", pageWidth / 2, 241, { align: "center" });
  
  doc.setFontSize(12);
  doc.text("February 2025", pageWidth / 2, 265, { align: "center" });

  // ===== PAGE 2: TABLE OF CONTENTS =====
  doc.addPage();
  drawBubbles(0.06);
  drawPageHeader("Mr. Bubbles - Mall Partnership Proposal", 2);
  
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
    { num: "3", title: "How It Works", page: "4" },
    { num: "4", title: "Spend Bands Earning System", page: "4" },
    { num: "5", title: "Rewards Ladder", page: "5" },
    { num: "6", title: "Financial Analysis", page: "5" },
    { num: "7", title: "Funding Model", page: "6" },
    { num: "8", title: "Program Controls", page: "6" },
    { num: "9", title: "Tenant Benefits", page: "7" },
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
    doc.text(".".repeat(50), 100, yPos + 3);
    doc.setTextColor(...primaryColor);
    doc.setFont("helvetica", "bold");
    doc.text(item.page, pageWidth - 32, yPos + 3);
    yPos += 15;
  });

  // ===== PAGE 3: EXECUTIVE SUMMARY & THE BIG IDEA =====
  doc.addPage();
  drawBubbles(0.05);
  drawPageHeader("Mr. Bubbles - Mall Partnership Proposal", 3);
  
  yPos = 40;
  yPos = drawSectionHeader("Executive Summary", yPos, "1");
  
  yPos = drawParagraph("Mr. Bubbles proposes a tenant-linked rewards program where customers earn points when they spend at participating mall restaurants and stores. Points are redeemable for car wash benefits, turning the car wash into a mall amenity that boosts tenant turnover and customer loyalty.", 20, yPos, pageWidth - 40);
  
  yPos = drawParagraph("This initiative positions the car wash as a customer experience amenity rather than a standalone retail tenant, creating a measurable retention tool that increases average basket size, dwell time, and repeat visits.", 20, yPos, pageWidth - 40);
  
  yPos += 5;
  yPos = drawSectionHeader("The Big Idea", yPos, "2");
  
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 38, 3, 3, "F");
  doc.setTextColor(...greenColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("This is not just a discount scheme. It's a measurable retention tool that:", 25, yPos + 6);
  yPos += 14;
  const benefits = [
    "Increases average basket size (\"spend a bit more to unlock reward\")",
    "Increases dwell time (wash while you shop)",
    "Increases repeat visits (points create a return loop)",
  ];
  benefits.forEach(b => { yPos = drawCheckmark(b, 25, yPos, pageWidth - 50); });
  
  yPos += 10;
  doc.setFillColor(240, 249, 255);
  doc.roundedRect(20, yPos - 3, (pageWidth - 50) / 2, 30, 3, 3, "F");
  doc.setTextColor(...primaryColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("For the Mall", 25, yPos + 5);
  doc.setTextColor(...grayColor);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("More spending, differentiation,", 25, yPos + 13);
  doc.text("foot traffic, valuable analytics.", 25, yPos + 19);
  
  doc.setFillColor(255, 247, 237);
  doc.roundedRect(20 + (pageWidth - 50) / 2 + 10, yPos - 3, (pageWidth - 50) / 2, 30, 3, 3, "F");
  doc.setTextColor(...orangeColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("For Tenants", 25 + (pageWidth - 50) / 2 + 10, yPos + 5);
  doc.setTextColor(...grayColor);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Free exposure, performance-based,", 25 + (pageWidth - 50) / 2 + 10, yPos + 13);
  doc.text("monthly reports, rewards repeat customers.", 25 + (pageWidth - 50) / 2 + 10, yPos + 19);

  // ===== PAGE 4: HOW IT WORKS & SPEND BANDS =====
  doc.addPage();
  drawBubbles(0.05);
  drawPageHeader("Mr. Bubbles - Mall Partnership Proposal", 4);
  
  yPos = 40;
  yPos = drawSectionHeader("How It Works", yPos, "3");
  
  yPos = drawSubHeader("Customer Journey", yPos);
  const journey = [
    "Customer spends at participating mall tenants (restaurants, retail, services)",
    "Earns loyalty points based on spend bands (10 points per R100 spent)",
    "Points accumulate in digital wallet (app or card-based system)",
    "Customer redeems points for car wash rewards at Mr. Bubbles",
    "Customer returns to mall to earn more points \u2014 creating a powerful loyalty loop",
  ];
  journey.forEach(j => { yPos = drawBulletPoint(j, 25, yPos, pageWidth - 50); });
  
  yPos += 8;
  yPos = drawSectionHeader("Spend Bands Earning System", yPos, "4");
  
  yPos = drawParagraph("Points are earned in spend bands to ensure fairness and sustainability. This structure ensures that rewards are earned over time through repeat mall visits rather than a single high-value transaction.", 20, yPos, pageWidth - 40);
  
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
  doc.text("In simple terms: 10 points per R100 spent at participating stores", 25, yPos + 6);

  // ===== PAGE 5: REWARDS LADDER & FINANCIAL ANALYSIS =====
  doc.addPage();
  drawBubbles(0.05);
  drawPageHeader("Mr. Bubbles - Mall Partnership Proposal", 5);
  
  yPos = 40;
  yPos = drawSectionHeader("Rewards Ladder", yPos, "5");
  
  yPos = drawSubHeader("Profit-Safe Structure (Upgrade-Heavy, Not Cash-Off Heavy)", yPos);
  
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 52, 3, 3, "F");
  doc.setFillColor(...primaryColor);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 10, 3, 3, "F");
  doc.roundedRect(20, yPos + 2, pageWidth - 40, 5, 0, 0, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Tier", 30, yPos + 4);
  doc.text("Points", 70, yPos + 4);
  doc.text("Reward", 110, yPos + 4);
  
  yPos += 15;
  const tiers = [
    ["Tier 1 - Engagement", "50 pts", "Free air freshener or tyre shine"],
    ["Tier 2 - Momentum", "120 pts", "Free interior wipe-down or premium add-on"],
    ["Tier 3 - Milestone", "250 pts", "R30 off any wash"],
    ["Tier 4 - Headline", "500 pts", "Free Basic Wash (up to R80)"],
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
    doc.text(points, 70, yPos);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...grayColor);
    doc.text(reward, 110, yPos);
    yPos += 9;
  });
  
  yPos += 10;
  yPos = drawSectionHeader("Financial Analysis", yPos, "6");
  
  yPos = drawSubHeader("Real Maths Check (This Protects You)", yPos);
  
  doc.setFillColor(240, 249, 255);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 50, 3, 3, "F");
  doc.setTextColor(...primaryColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Key Assumptions:", 25, yPos + 6);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...grayColor);
  yPos += 12;
  yPos = drawBulletPoint("Average customer mall spend per visit: R300", 25, yPos, pageWidth - 50);
  yPos = drawBulletPoint("Points earned per visit: 30 points", 25, yPos, pageWidth - 50);
  yPos = drawBulletPoint("Visits to reach free wash (500 pts): ~17 visits", 25, yPos, pageWidth - 50);
  
  yPos += 3;
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 14, 3, 3, "F");
  doc.setTextColor(...greenColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Your cost (~R45 variable) spread over 17 visits = Very healthy economics!", 25, yPos + 6);

  // ===== PAGE 6: FUNDING MODEL & PROGRAM CONTROLS =====
  doc.addPage();
  drawBubbles(0.05);
  drawPageHeader("Mr. Bubbles - Mall Partnership Proposal", 6);
  
  yPos = 40;
  yPos = drawSectionHeader("Funding Model", yPos, "7");
  
  yPos = drawSubHeader("Split the Reward Cost - Sustainable Long-Term", yPos);
  
  doc.setFillColor(240, 249, 255);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 38, 3, 3, "F");
  doc.setTextColor(...primaryColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Tenant Contribution (Optional, Performance-Based)", 25, yPos + 6);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...grayColor);
  doc.text("Participating tenants may contribute a small marketing fee (e.g. R10 per redemption)", 25, yPos + 14);
  doc.text("only when a reward is redeemed. This supports shared promotion and ensures", 25, yPos + 21);
  doc.text("the program remains sustainable.", 25, yPos + 28);
  
  yPos += 45;
  yPos = drawSubHeader("Your Contribution", yPos);
  const yourContrib = ["Low-cost upgrades (tyre shine, air freshener: R3-R12 cost)", "Limited cash-off discounts", "Daily redemption caps"];
  yourContrib.forEach(c => { yPos = drawBulletPoint(c, 25, yPos, pageWidth - 50); });
  
  yPos += 5;
  yPos = drawSubHeader("Mall Benefit", yPos);
  const mallBenefits = ["Increased customer spending", "Foot traffic retention", "Customer loyalty analytics", "Unique differentiator vs other malls"];
  mallBenefits.forEach(b => { yPos = drawBulletPoint(b, 25, yPos, pageWidth - 50); });
  
  yPos += 8;
  yPos = drawSectionHeader("Program Controls", yPos, "8");
  
  doc.setFillColor(240, 249, 255);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 55, 3, 3, "F");
  doc.setTextColor(...primaryColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Non-Negotiable Safeguards:", 25, yPos + 6);
  yPos += 12;
  const controls = [
    "Max 1 reward redemption per vehicle per day",
    "Max R30 discount per transaction (except headline reward)",
    "Points earned via QR scan linked to receipt number (fraud prevention)",
    "Redemptions subject to daily capacity and operational availability",
    "Points expire after 90 days (limits liability)",
    "Opt-in tenants only (start with 5-10 pilot)",
  ];
  controls.forEach(c => { yPos = drawCheckmark(c, 25, yPos, pageWidth - 50); });

  // ===== PAGE 7: TENANT BENEFITS & PILOT PLAN =====
  doc.addPage();
  drawBubbles(0.05);
  drawPageHeader("Mr. Bubbles - Mall Partnership Proposal", 7);
  
  yPos = 40;
  yPos = drawSectionHeader("Tenant Benefits", yPos, "9");
  
  yPos = drawSubHeader("What Each Participating Tenant Receives", yPos);
  const tenantSupport = [
    "Counter QR stand (\"Earn points for car wash rewards\")",
    "Short script for cashiers",
    "Inclusion on website / booking page (\"Participating Stores\")",
    "Monthly report: customers earned/redeemed via their store",
  ];
  tenantSupport.forEach(t => { yPos = drawBulletPoint(t, 25, yPos, pageWidth - 50); });
  
  yPos += 5;
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 28, 3, 3, "F");
  doc.setTextColor(...greenColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Why Tenants Love This Program:", 25, yPos + 6);
  yPos += 12;
  yPos = drawCheckmark("Encourages upsell (\"spend R100 more to earn points\")", 25, yPos, pageWidth - 50);
  yPos = drawCheckmark("Rewards their best repeat customers", 25, yPos, pageWidth - 50);
  yPos = drawCheckmark("No runaway discounting \u2014 program lasts years, not months", 25, yPos, pageWidth - 50);
  
  yPos += 10;
  yPos = drawSectionHeader("Pilot Plan & Success Metrics", yPos, "10");
  
  yPos = drawSubHeader("Phase 1: 30-Day Pilot", yPos);
  const phase1 = [
    "5-10 participating tenants",
    "1 bay operation",
    "Full reward ladder active",
    "Signage in 2-3 key areas",
    "Weekly check-ins with mall management",
  ];
  phase1.forEach(p => { yPos = drawBulletPoint(p, 25, yPos, pageWidth - 50); });
  
  yPos += 3;
  yPos = drawSubHeader("Phase 2: Scale to 3 Months", yPos);
  const phase2 = ["Add more tenants", "Add membership option (optional)", "Adjust reward ladder based on redemption rates", "Full marketing rollout"];
  phase2.forEach(p => { yPos = drawBulletPoint(p, 25, yPos, pageWidth - 50); });
  
  yPos += 5;
  doc.setFillColor(255, 247, 237);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 32, 3, 3, "F");
  doc.setTextColor(...orangeColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Pilot Success Indicators:", 25, yPos + 6);
  yPos += 10;
  yPos = drawCheckmark("Increase in repeat car wash visits", 25, yPos, pageWidth - 50);
  yPos = drawCheckmark("Measured reward redemptions", 25, yPos, pageWidth - 50);
  yPos = drawCheckmark("Tenant participation feedback & customer engagement metrics", 25, yPos, pageWidth - 50);

  // ===== PAGE 8: NEXT STEPS & CONCLUSION =====
  doc.addPage();
  drawBubbles(0.05);
  drawPageHeader("Mr. Bubbles - Mall Partnership Proposal", 8);
  
  yPos = 40;
  yPos = drawSectionHeader("Next Steps", yPos, "11");
  
  yPos = drawParagraph("We propose a 30-day pilot with selected tenants to validate customer uptake and operational flow.", 20, yPos, pageWidth - 40);
  
  yPos = drawParagraph("We welcome the opportunity to present this proposal in person and align it with Boksburg Centre's customer experience strategy.", 20, yPos, pageWidth - 40);
  
  yPos += 5;
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 65, 3, 3, "F");
  doc.setTextColor(...greenColor);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Why This Partnership Works", 25, yPos + 10);
  
  yPos += 18;
  const summary = [
    "Mall-friendly: Increases spend, loyalty, and analytics",
    "Finance-safe: All rewards above variable cost, 90-day expiry",
    "Customer-exciting: Clear goals, quick wins, headline reward",
    "Scalable: Pilot first, then expand based on results",
  ];
  summary.forEach(s => { yPos = drawCheckmark(s, 25, yPos, pageWidth - 50); });
  
  yPos += 10;
  doc.setFillColor(240, 249, 255);
  doc.roundedRect(20, yPos - 3, pageWidth - 40, 18, 3, 3, "F");
  doc.setTextColor(...primaryColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Optional: ", 25, yPos + 8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...grayColor);
  doc.text("Bonus points may be awarded during mall campaigns or off-peak periods at management's discretion.", 50, yPos + 8);
  
  yPos += 28;
  doc.setFillColor(...primaryColor);
  doc.roundedRect(20, yPos, pageWidth - 40, 45, 5, 5, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Ready to Partner?", pageWidth / 2, yPos + 15, { align: "center" });
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Contact us to discuss this partnership opportunity", pageWidth / 2, yPos + 28, { align: "center" });
  doc.text("082 806 9569  |  www.mrbubbles.co.za", pageWidth / 2, yPos + 40, { align: "center" });

  doc.save("Mr_Bubbles_Mall_Partnership_Proposal.pdf");
};
