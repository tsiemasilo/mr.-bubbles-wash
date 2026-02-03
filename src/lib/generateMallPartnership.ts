import jsPDF from "jspdf";

export const generateMallPartnership = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  const primaryColor: [number, number, number] = [14, 116, 144];
  const darkColor: [number, number, number] = [15, 23, 42];
  const grayColor: [number, number, number] = [71, 85, 105];
  const accentColor: [number, number, number] = [6, 182, 212];
  const goldColor: [number, number, number] = [180, 130, 50];
  const greenColor: [number, number, number] = [22, 101, 52];

  const drawBubbles = (opacity: number = 0.08) => {
    doc.setDrawColor(...primaryColor);
    doc.setFillColor(...primaryColor);
    const bubbles = [
      { x: 15, y: 50, r: 12 }, { x: 195, y: 45, r: 15 },
      { x: 25, y: 280, r: 10 }, { x: 185, y: 275, r: 12 },
      { x: 180, y: 120, r: 8 }, { x: 20, y: 150, r: 6 },
    ];
    doc.setGState(doc.GState({ opacity }));
    bubbles.forEach(b => doc.circle(b.x, b.y, b.r, "F"));
    doc.setGState(doc.GState({ opacity: 1 }));
  };

  const drawPageHeader = (title: string, pageNum: number) => {
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, 18, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(title, 15, 12);
    doc.setFont("helvetica", "normal");
    doc.text(`Page ${pageNum}`, pageWidth - 25, 12);
  };

  const drawSectionTitle = (title: string, yPos: number): number => {
    doc.setFillColor(...primaryColor);
    doc.roundedRect(15, yPos, pageWidth - 30, 12, 2, 2, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(title, 20, yPos + 8);
    return yPos + 18;
  };

  const drawBullet = (text: string, x: number, yPos: number, maxWidth: number): number => {
    doc.setTextColor(...grayColor);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("\u2022", x, yPos);
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x + 6, yPos);
    return yPos + (lines.length * 5) + 2;
  };

  const drawCheckItem = (text: string, x: number, yPos: number, maxWidth: number): number => {
    doc.setTextColor(...greenColor);
    doc.setFontSize(11);
    doc.text("\u2713", x, yPos);
    doc.setTextColor(...grayColor);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x + 6, yPos);
    return yPos + (lines.length * 5) + 2;
  };

  // ===== PAGE 1: COVER =====
  drawBubbles(0.08);
  
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 50, "F");
  doc.setFillColor(...accentColor);
  doc.rect(0, 50, pageWidth, 4, "F");
  
  doc.setFillColor(...goldColor);
  doc.rect(0, pageHeight - 50, pageWidth, 50, "F");

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(30, 70, pageWidth - 60, 130, 5, 5, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text("MALL LOYALTY PARTNERSHIP", pageWidth / 2, 30, { align: "center" });
  doc.setFontSize(14);
  doc.text("Spend-to-Wash Rewards Program", pageWidth / 2, 42, { align: "center" });

  doc.setTextColor(...primaryColor);
  doc.setFontSize(26);
  doc.setFont("helvetica", "bold");
  doc.text("Mr. Bubbles Bubbles", pageWidth / 2, 95, { align: "center" });
  
  doc.setFontSize(13);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...grayColor);
  doc.text("Premium Car Wash Experience", pageWidth / 2, 108, { align: "center" });

  doc.setFillColor(...accentColor);
  doc.rect(55, 118, pageWidth - 110, 2, "F");

  doc.setFillColor(240, 249, 255);
  doc.roundedRect(40, 128, pageWidth - 80, 30, 3, 3, "F");
  doc.setTextColor(...darkColor);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text('"Shop \u2022 Dine \u2022 Wash"', pageWidth / 2, 140, { align: "center" });
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...grayColor);
  doc.text("A mall-wide loyalty perk that increases spend and drives repeat visits", pageWidth / 2, 152, { align: "center" });

  doc.setFontSize(12);
  doc.setTextColor(...primaryColor);
  doc.setFont("helvetica", "bold");
  doc.text("PARTNERSHIP PROPOSAL", pageWidth / 2, 180, { align: "center" });

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.text("Boksburg Center, Gauteng", pageWidth / 2, pageHeight - 32, { align: "center" });
  doc.text("Phone: 082 806 9569  |  www.mrbubbles.co.za", pageWidth / 2, pageHeight - 20, { align: "center" });

  // ===== PAGE 2: THE BIG IDEA =====
  doc.addPage();
  drawBubbles(0.05);
  drawPageHeader("Mall Loyalty Partnership Proposal", 2);

  let yPos = 30;
  yPos = drawSectionTitle("The Big Idea", yPos);
  
  doc.setTextColor(...darkColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  const bigIdea = "Mr. Bubbles Bubbles proposes a tenant-linked rewards program where customers earn points when they spend at participating mall restaurants and stores. Points are redeemable for car wash benefits (discounts and upgrades), turning the car wash into a mall amenity that boosts tenant turnover and customer loyalty.";
  const bigIdeaLines = doc.splitTextToSize(bigIdea, pageWidth - 40);
  doc.text(bigIdeaLines, 20, yPos + 6);
  yPos += bigIdeaLines.length * 5 + 12;

  doc.setFillColor(255, 247, 237);
  doc.roundedRect(20, yPos, pageWidth - 40, 38, 3, 3, "F");
  doc.setTextColor(...darkColor);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("This is not just a discount scheme.", 25, yPos + 10);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("It's a measurable retention tool that:", 25, yPos + 18);
  doc.setTextColor(...grayColor);
  doc.text("\u2022 Increases average basket size (\"spend a bit more to unlock reward\")", 30, yPos + 26);
  doc.text("\u2022 Increases dwell time (wash while you shop)", 30, yPos + 32);
  doc.text("\u2022 Increases repeat visits (points create a return loop)", 30, yPos + 38);
  yPos += 48;

  yPos = drawSectionTitle("1. How It Works", yPos);
  
  doc.setTextColor(...darkColor);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Customer Journey:", 20, yPos + 6);
  yPos += 12;

  const journey = [
    "Customer spends at participating mall tenants (restaurants, retail)",
    "Scans QR code or shows receipt to earn 1 point per R1 spent",
    "Points accumulate in digital wallet (app or card)",
    "Customer redeems points for car wash rewards at Mr. Bubbles",
    "Customer returns to mall to earn more points - creating loyalty loop"
  ];
  journey.forEach((item, i) => {
    doc.setFillColor(240, 249, 255);
    doc.roundedRect(20, yPos, pageWidth - 40, 10, 2, 2, "F");
    doc.setTextColor(...primaryColor);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(`${i + 1}`, 25, yPos + 7);
    doc.setTextColor(...grayColor);
    doc.setFont("helvetica", "normal");
    doc.text(item, 35, yPos + 7);
    yPos += 12;
  });

  yPos += 8;
  yPos = drawSectionTitle("2. Rewards Ladder", yPos);

  doc.setTextColor(...darkColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Key Principle: Upgrade-heavy rewards, not cash-off heavy", 20, yPos + 6);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...grayColor);
  doc.text("Upgrades feel valuable to customers but cost far less than discounts.", 20, yPos + 13);
  yPos += 20;

  const tiers = [
    { tier: "Tier 1", name: "Frequent Wins", points: "250-400", rewards: "Free tyre shine, air freshener, interior wipe-down", color: [240, 249, 255] as [number, number, number] },
    { tier: "Tier 2", name: "Milestones", points: "800", rewards: "R30 off any wash OR free premium add-on", color: [240, 253, 244] as [number, number, number] },
    { tier: "Tier 3", name: "Big Reward", points: "1,500", rewards: "Free Basic Wash (up to R80 value)", color: [255, 247, 237] as [number, number, number] },
    { tier: "Tier 4", name: "Premium", points: "3,000", rewards: "Free Wash + Vacuum (Deluxe upgrade)", color: [254, 242, 242] as [number, number, number] },
  ];

  tiers.forEach((t) => {
    doc.setFillColor(...t.color);
    doc.roundedRect(20, yPos, pageWidth - 40, 14, 2, 2, "F");
    doc.setTextColor(...primaryColor);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(t.tier, 25, yPos + 6);
    doc.setTextColor(...darkColor);
    doc.text(`${t.name} (${t.points} pts)`, 50, yPos + 6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...grayColor);
    doc.text(t.rewards, 25, yPos + 12);
    yPos += 16;
  });

  // ===== PAGE 3: FINANCIALS =====
  doc.addPage();
  drawBubbles(0.05);
  drawPageHeader("Mall Loyalty Partnership Proposal", 3);

  yPos = 30;
  yPos = drawSectionTitle("3. Financial Analysis", yPos);

  doc.setTextColor(...darkColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Your Pricing & Costs (Boksburg/East Rand)", 20, yPos + 6);
  yPos += 14;

  doc.setFillColor(248, 250, 252);
  doc.roundedRect(20, yPos, 80, 45, 2, 2, "F");
  doc.roundedRect(105, yPos, 85, 45, 2, 2, "F");

  doc.setTextColor(...primaryColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Pricing", 25, yPos + 8);
  doc.text("Variable Costs/Car", 110, yPos + 8);

  doc.setTextColor(...grayColor);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Basic Wash: R80", 25, yPos + 18);
  doc.text("Wash + Vacuum: R140", 25, yPos + 25);
  doc.text("Average Ticket: R140", 25, yPos + 32);
  doc.text("Gross Margin: R79-R106", 25, yPos + 39);

  doc.text("Chemicals: R10-R18", 110, yPos + 18);
  doc.text("Water/Electricity: R4-R8", 110, yPos + 25);
  doc.text("Labour: R20-R35", 110, yPos + 32);
  doc.text("Total: R34-R61", 110, yPos + 39);
  yPos += 52;

  doc.setTextColor(...darkColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Reward Cost Analysis:", 20, yPos);
  yPos += 8;

  doc.setFillColor(240, 253, 244);
  doc.roundedRect(20, yPos, pageWidth - 40, 32, 2, 2, "F");
  doc.setTextColor(...greenColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Low-Cost Upgrades (Best for Margin)", 25, yPos + 8);
  doc.setTextColor(...grayColor);
  doc.setFont("helvetica", "normal");
  doc.text("\u2022 Tyre shine / air freshener: Cost R3-R8", 30, yPos + 16);
  doc.text("\u2022 Interior wipe-down: Cost R5-R12", 30, yPos + 23);
  doc.text("\u2022 R30 off: Sacrifices part of margin, not whole ticket", 30, yPos + 30);
  yPos += 38;

  doc.setFillColor(255, 247, 237);
  doc.roundedRect(20, yPos, pageWidth - 40, 28, 2, 2, "F");
  doc.setTextColor(...goldColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Free Basic Wash (1,500 points)", 25, yPos + 8);
  doc.setTextColor(...grayColor);
  doc.setFont("helvetica", "normal");
  doc.text("\u2022 Requires R1,500 mall spend to earn", 30, yPos + 16);
  doc.text("\u2022 Your actual cost: ~R45 (variable cost only)", 30, yPos + 23);
  yPos += 35;

  yPos = drawSectionTitle("4. Funding Model", yPos);

  doc.setTextColor(...darkColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Split the Reward Cost - Sustainable Long-Term", 20, yPos + 6);
  yPos += 14;

  const fundingItems = [
    { title: "Tenant Contribution", desc: "R10 per redemption (performance-based marketing fee)", color: [240, 249, 255] as [number, number, number] },
    { title: "Your Contribution", desc: "Low-cost upgrades, limited R-off, daily caps", color: [240, 253, 244] as [number, number, number] },
    { title: "Mall Benefit", desc: "More spending, differentiation, foot traffic retention", color: [255, 247, 237] as [number, number, number] },
  ];

  fundingItems.forEach((item) => {
    doc.setFillColor(...item.color);
    doc.roundedRect(20, yPos, pageWidth - 40, 14, 2, 2, "F");
    doc.setTextColor(...primaryColor);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(item.title, 25, yPos + 6);
    doc.setTextColor(...grayColor);
    doc.setFont("helvetica", "normal");
    doc.text(item.desc, 25, yPos + 12);
    yPos += 16;
  });

  // ===== PAGE 4: CONTROLS & TENANT SUPPORT =====
  doc.addPage();
  drawBubbles(0.05);
  drawPageHeader("Mall Loyalty Partnership Proposal", 4);

  yPos = 30;
  yPos = drawSectionTitle("5. Program Controls (Non-Negotiable)", yPos);

  const controls = [
    "Redemption Limits: Max 1 reward per vehicle per day, max R30 discount per transaction",
    "Booking Benefits: Booked customers get priority slot (improves flow)",
    "Fraud Prevention: Points earned via QR scan linked to receipt number",
    "Point Expiry: 90 days (keeps cycle moving, limits liability)",
    "Participation: Opt-in tenants, start with 5-10 as pilot"
  ];

  controls.forEach((item) => {
    yPos = drawCheckItem(item, 20, yPos, pageWidth - 45);
  });

  yPos += 6;
  yPos = drawSectionTitle("6. Tenant Support Package", yPos);

  doc.setTextColor(...darkColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Each participating tenant receives:", 20, yPos + 6);
  yPos += 12;

  const tenantSupport = [
    "Counter QR stand: \"Earn points for car wash rewards\"",
    "Short script for cashiers",
    "Inclusion on website / booking page (\"Participating Stores\")",
    "Monthly report: customers earned/redeemed via their store"
  ];

  tenantSupport.forEach((item) => {
    yPos = drawBullet(item, 25, yPos, pageWidth - 50);
  });

  yPos += 6;
  doc.setFillColor(240, 249, 255);
  doc.roundedRect(20, yPos, pageWidth - 40, 18, 2, 2, "F");
  doc.setTextColor(...primaryColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Tenants love programs that are:", 25, yPos + 8);
  doc.setTextColor(...grayColor);
  doc.setFont("helvetica", "normal");
  doc.text("Simple  \u2022  Performance-based  \u2022  Measurable", 25, yPos + 15);
  yPos += 26;

  yPos = drawSectionTitle("7. Reporting & Analytics", yPos);

  doc.setTextColor(...darkColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Monthly reporting includes:", 20, yPos + 6);
  yPos += 12;

  const reports = [
    "Number of participating tenants",
    "Points issued vs points redeemed",
    "Redemptions by tenant category (restaurants vs retail)",
    "Peak redemption times",
    "Estimated incremental mall spend influenced",
    "Customer repeat rate (re-booking rate)"
  ];

  reports.forEach((item) => {
    yPos = drawCheckItem(item, 25, yPos, pageWidth - 50);
  });

  yPos += 4;
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(20, yPos, pageWidth - 40, 12, 2, 2, "F");
  doc.setTextColor(...greenColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("This turns your program into a mall analytics asset!", pageWidth / 2, yPos + 8, { align: "center" });

  // ===== PAGE 5: PILOT & CONCLUSION =====
  doc.addPage();
  drawBubbles(0.05);
  drawPageHeader("Mall Loyalty Partnership Proposal", 5);

  yPos = 30;
  yPos = drawSectionTitle("8. Pilot Roll-Out Plan", yPos);

  doc.setFillColor(240, 249, 255);
  doc.roundedRect(20, yPos, 82, 50, 3, 3, "F");
  doc.roundedRect(108, yPos, 82, 50, 3, 3, "F");

  doc.setTextColor(...primaryColor);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Phase 1: 30-Day Pilot", 25, yPos + 10);
  doc.text("Phase 2: Scale (3 Months)", 113, yPos + 10);

  doc.setTextColor(...grayColor);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("\u2022 5-10 tenants", 25, yPos + 20);
  doc.text("\u2022 1 bay operation", 25, yPos + 27);
  doc.text("\u2022 Reward ladder active", 25, yPos + 34);
  doc.text("\u2022 Signage in 2-3 key areas", 25, yPos + 41);
  doc.text("\u2022 Weekly check-ins", 25, yPos + 48);

  doc.text("\u2022 Add more tenants", 113, yPos + 20);
  doc.text("\u2022 Add membership option", 113, yPos + 27);
  doc.text("\u2022 Adjust reward ladder", 113, yPos + 34);
  doc.text("\u2022 Full marketing rollout", 113, yPos + 41);
  doc.text("\u2022 Monthly reporting", 113, yPos + 48);
  yPos += 60;

  yPos = drawSectionTitle("9. Why This Partnership Works", yPos);

  const benefits = [
    { for: "For the Mall", items: ["Increased tenant turnover", "Customer loyalty tool", "Unique differentiator", "Analytics & insights"] },
    { for: "For Tenants", items: ["Free marketing exposure", "Performance-based cost", "Customer engagement", "Monthly reports"] },
    { for: "For Mr. Bubbles", items: ["Steady customer flow", "Brand visibility", "Premium positioning", "Revenue growth"] },
  ];

  const colWidth = (pageWidth - 50) / 3;
  benefits.forEach((b, i) => {
    const x = 20 + (i * (colWidth + 5));
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(x, yPos, colWidth, 45, 2, 2, "F");
    doc.setTextColor(...primaryColor);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(b.for, x + 5, yPos + 10);
    doc.setTextColor(...grayColor);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    b.items.forEach((item, j) => {
      doc.text(`\u2022 ${item}`, x + 5, yPos + 20 + (j * 7));
    });
  });
  yPos += 55;

  doc.setFillColor(...primaryColor);
  doc.roundedRect(20, yPos, pageWidth - 40, 35, 3, 3, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Ready to Partner?", pageWidth / 2, yPos + 12, { align: "center" });
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Contact us to discuss this partnership opportunity", pageWidth / 2, yPos + 22, { align: "center" });
  doc.text("082 806 9569  |  www.mrbubbles.co.za", pageWidth / 2, yPos + 30, { align: "center" });

  // Footer on last page
  doc.setFillColor(...accentColor);
  doc.rect(0, pageHeight - 15, pageWidth, 15, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text("Mr. Bubbles Bubbles  |  Boksburg Center, Gauteng  |  February 2025", pageWidth / 2, pageHeight - 6, { align: "center" });

  doc.save("Mr_Bubbles_Mall_Partnership_Proposal.pdf");
};
