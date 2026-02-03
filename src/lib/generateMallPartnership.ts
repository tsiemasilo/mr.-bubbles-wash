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

  const drawPageHeader = (title: string, pageNum: number, totalPages: number) => {
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, 18, "F");
    doc.setFillColor(...accentColor);
    doc.rect(0, 18, pageWidth, 2, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(title, 15, 12);
    doc.setFont("helvetica", "normal");
    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - 30, 12);
  };

  const drawFooter = () => {
    doc.setFillColor(...accentColor);
    doc.rect(0, pageHeight - 10, pageWidth, 10, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7);
    doc.text("Mr. Bubbles \u2013 Premium Car Wash  |  Boksburg Centre, Gauteng  |  082 806 9569", pageWidth / 2, pageHeight - 4, { align: "center" });
  };

  const drawSectionBox = (title: string, x: number, y: number, width: number): number => {
    doc.setFillColor(...primaryColor);
    doc.roundedRect(x, y, width, 8, 1, 1, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(title, x + 3, y + 5.5);
    return y + 10;
  };

  // ===== PAGE 1: COVER & OVERVIEW =====
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 35, "F");
  doc.setFillColor(...accentColor);
  doc.rect(0, 35, pageWidth, 3, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("MALL SPEND-TO-WASH REWARDS PARTNERSHIP", pageWidth / 2, 15, { align: "center" });
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text('"Shop \u2022 Dine \u2022 Wash" \u2014 Mr. Bubbles \u2013 Premium Car Wash Experience', pageWidth / 2, 28, { align: "center" });

  let y = 45;

  // The Big Idea
  doc.setFillColor(240, 249, 255);
  doc.roundedRect(10, y, pageWidth - 20, 28, 2, 2, "F");
  doc.setTextColor(...primaryColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("THE BIG IDEA", 15, y + 7);
  doc.setTextColor(...darkColor);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const bigIdea = "A tenant-linked rewards program where customers earn points spending at mall stores and redeem for car wash benefits. This initiative positions the car wash as a customer experience amenity rather than a standalone retail tenant.";
  const ideaLines = doc.splitTextToSize(bigIdea, pageWidth - 30);
  doc.text(ideaLines, 15, y + 14);
  y += 34;

  // How It Works
  y = drawSectionBox("HOW IT WORKS", 10, y, pageWidth - 20);
  doc.setTextColor(...grayColor);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const steps = [
    "1. Customer spends at participating mall tenants (restaurants, retail, services)",
    "2. Earns loyalty points based on spend bands (10 points per R100 spent)",
    "3. Points accumulate in digital wallet (app or card-based system)",
    "4. Customer redeems points for car wash rewards at Mr. Bubbles",
    "5. Customer returns to mall to earn more points \u2014 creating a powerful loyalty loop"
  ];
  steps.forEach(step => {
    doc.text(step, 15, y);
    y += 6;
  });
  y += 4;

  // Spend Bands - THE KEY DIFFERENTIATOR
  doc.setFillColor(255, 247, 237);
  doc.roundedRect(10, y, pageWidth - 20, 52, 2, 2, "F");
  doc.setTextColor(...goldColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("SPEND BANDS EARNING SYSTEM (Not Linear Points)", 15, y + 8);
  
  doc.setTextColor(...darkColor);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Points are earned in spend bands to ensure fairness and sustainability:", 15, y + 16);

  // Spend bands table
  const tableY = y + 22;
  doc.setFillColor(...primaryColor);
  doc.roundedRect(20, tableY, 80, 8, 1, 1, "F");
  doc.roundedRect(100, tableY, 50, 8, 1, 1, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("Mall Spend", 25, tableY + 5.5);
  doc.text("Points Earned", 105, tableY + 5.5);

  const bands = [
    ["R100 \u2013 R199", "10 points"],
    ["R200 \u2013 R299", "20 points"],
    ["R300 \u2013 R399", "30 points"],
    ["R400 \u2013 R499", "40 points"],
    ["Every additional R100", "+10 points"],
  ];
  
  let tableRowY = tableY + 8;
  bands.forEach((band, i) => {
    doc.setFillColor(i % 2 === 0 ? 248 : 255, i % 2 === 0 ? 250 : 255, i % 2 === 0 ? 252 : 255);
    doc.rect(20, tableRowY, 80, 6, "F");
    doc.rect(100, tableRowY, 50, 6, "F");
    doc.setTextColor(...grayColor);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(band[0], 25, tableRowY + 4.5);
    doc.text(band[1], 105, tableRowY + 4.5);
    tableRowY += 6;
  });

  doc.setTextColor(...primaryColor);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("In simple terms: 10 points per R100 spent", 160, y + 35);
  
  y += 58;

  // Key benefit statement
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(10, y, pageWidth - 20, 14, 2, 2, "F");
  doc.setTextColor(...greenColor);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("\u2713 This structure ensures rewards are earned over time through repeat mall visits rather than a single high-value transaction.", 15, y + 9);
  y += 20;

  // Rewards Ladder
  y = drawSectionBox("REWARDS LADDER (Profit-Safe Structure)", 10, y, pageWidth - 20);
  
  const tiers = [
    { tier: "Tier 1 \u2013 Engagement", points: "50 pts", reward: "Free air freshener or tyre shine", note: "Quick win, very low cost" },
    { tier: "Tier 2 \u2013 Momentum", points: "120 pts", reward: "Free interior wipe-down or premium add-on", note: "Builds momentum" },
    { tier: "Tier 3 \u2013 Milestone", points: "250 pts", reward: "R30 off any wash", note: "Feels significant" },
    { tier: "Tier 4 \u2013 Headline", points: "500 pts", reward: "Free Basic Wash (up to R80)", note: "The goal customers chase" },
  ];

  tiers.forEach((t, i) => {
    const colors: [number, number, number][] = [[240, 249, 255], [240, 253, 244], [255, 247, 237], [254, 242, 242]];
    doc.setFillColor(...colors[i]);
    doc.roundedRect(10, y, pageWidth - 20, 12, 1, 1, "F");
    doc.setTextColor(...primaryColor);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(t.tier, 15, y + 5);
    doc.setTextColor(...goldColor);
    doc.text(t.points, 55, y + 5);
    doc.setTextColor(...darkColor);
    doc.setFont("helvetica", "normal");
    doc.text(t.reward, 80, y + 5);
    doc.setTextColor(...grayColor);
    doc.setFontSize(7);
    doc.text(`(${t.note})`, 15, y + 10);
    y += 14;
  });

  drawFooter();

  // ===== PAGE 2: FINANCIALS & CONTROLS =====
  doc.addPage();
  drawPageHeader("Mall Spend-to-Wash Partnership", 2, 2);

  y = 28;

  // Real Maths Check
  doc.setFillColor(255, 247, 237);
  doc.roundedRect(10, y, pageWidth - 20, 42, 2, 2, "F");
  doc.setTextColor(...goldColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("REAL MATHS CHECK (This Protects You)", 15, y + 8);

  doc.setTextColor(...darkColor);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Assumptions:", 15, y + 16);
  doc.setTextColor(...grayColor);
  doc.text("\u2022 Average customer mall spend per visit: R300", 20, y + 22);
  doc.text("\u2022 Points earned per visit: 30 points", 20, y + 28);
  doc.text("\u2022 Visits to reach free wash (500 pts): \u00b117 visits", 20, y + 34);
  
  doc.setTextColor(...greenColor);
  doc.setFont("helvetica", "bold");
  doc.text("Your actual cost (~R45 variable) spread over 17 visits = Very healthy economics!", 15, y + 41);
  y += 48;

  // Two columns
  const colWidth = (pageWidth - 25) / 2;
  const leftX = 10;
  const rightX = leftX + colWidth + 5;

  // Financial Protection
  let leftY = drawSectionBox("FINANCIAL PROTECTION", leftX, y, colWidth);
  doc.setTextColor(...grayColor);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  const financials = [
    "\u2713 Upgrades cost R3-R12 (high perceived value)",
    "\u2713 Free wash requires 500 pts (~17 visits)",
    "\u2713 Variable cost ~R45 per free wash",
    "\u2713 All rewards above variable cost threshold",
    "\u2713 Points expire after 90 days (limits liability)",
    "\u2713 No runaway discounting possible"
  ];
  financials.forEach(item => {
    doc.text(item, leftX + 3, leftY);
    leftY += 6;
  });

  // Funding Model
  let rightY = drawSectionBox("FUNDING MODEL", rightX, y, colWidth);
  doc.setTextColor(...grayColor);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  const funding = [
    "Tenant Contribution (Optional):",
    "  \u2022 R10 per redemption (performance-based)",
    "  \u2022 Only charged when reward redeemed",
    "Your Contribution:",
    "  \u2022 Low-cost upgrades, daily caps",
    "Mall Benefit:",
    "  \u2022 Increased spend, retention, analytics"
  ];
  funding.forEach(item => {
    doc.text(item, rightX + 3, rightY);
    rightY += 5.5;
  });

  y += 48;

  // Program Controls
  leftY = drawSectionBox("PROGRAM CONTROLS", leftX, y, colWidth);
  doc.setTextColor(...grayColor);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  const controls = [
    "\u2713 Max 1 reward per vehicle per day",
    "\u2713 Max R30 discount per transaction",
    "\u2713 QR-linked fraud prevention",
    "\u2713 Subject to daily capacity/availability",
    "\u2713 Opt-in tenants (start 5-10 pilot)",
    "\u2713 90-day point expiry"
  ];
  controls.forEach(item => {
    doc.text(item, leftX + 3, leftY);
    leftY += 6;
  });

  // Tenant Benefits
  rightY = drawSectionBox("WHY TENANTS LOVE IT", rightX, y, colWidth);
  doc.setTextColor(...grayColor);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  const tenantBenefits = [
    "\u2713 Encourages upsell (\"spend R100 more\")",
    "\u2713 Rewards their best repeat customers",
    "\u2713 No runaway discounting risk",
    "\u2713 Program lasts years, not months",
    "\u2713 Monthly performance reports",
    "\u2713 Simple & measurable"
  ];
  tenantBenefits.forEach(item => {
    doc.text(item, rightX + 3, rightY);
    rightY += 6;
  });

  y += 48;

  // Bonus points note
  doc.setFillColor(240, 249, 255);
  doc.roundedRect(10, y, pageWidth - 20, 12, 2, 2, "F");
  doc.setTextColor(...primaryColor);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("OPTIONAL: ", 15, y + 8);
  doc.setFont("helvetica", "normal");
  doc.text("Bonus points may be awarded during mall campaigns or off-peak periods at management's discretion.", 40, y + 8);
  y += 18;

  // Pilot Plan
  doc.setFillColor(255, 247, 237);
  doc.roundedRect(10, y, pageWidth - 20, 28, 2, 2, "F");
  doc.setTextColor(...goldColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("30-DAY PILOT PLAN", 15, y + 8);
  doc.setTextColor(...grayColor);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("\u2022 5-10 participating tenants     \u2022 1 bay operation     \u2022 Full reward ladder active     \u2022 Signage in key areas", 15, y + 16);
  doc.setTextColor(...primaryColor);
  doc.setFont("helvetica", "bold");
  doc.text("Success Indicators: ", 15, y + 24);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...grayColor);
  doc.text("Repeat visits \u2022 Redemption rates \u2022 Tenant feedback \u2022 Customer engagement", 55, y + 24);
  y += 34;

  // Next Steps CTA
  doc.setFillColor(...primaryColor);
  doc.roundedRect(10, y, pageWidth - 20, 26, 2, 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("NEXT STEPS", 15, y + 8);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("We propose a 30-day pilot with selected tenants to validate customer uptake and operational flow.", 15, y + 16);
  doc.text("We welcome the opportunity to present this proposal and align with Boksburg Centre's customer experience strategy.", 15, y + 23);

  drawFooter();

  doc.save("Mr_Bubbles_Mall_Partnership_Proposal.pdf");
};
