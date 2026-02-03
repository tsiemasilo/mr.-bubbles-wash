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

  // Header banner
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 28, "F");
  doc.setFillColor(...accentColor);
  doc.rect(0, 28, pageWidth, 2, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("MALL SPEND-TO-WASH REWARDS PARTNERSHIP", pageWidth / 2, 12, { align: "center" });
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text('"Shop \u2022 Dine \u2022 Wash" \u2014 Mr. Bubbles \u2013 Premium Car Wash Experience', pageWidth / 2, 22, { align: "center" });

  let y = 36;

  // The Big Idea
  doc.setFillColor(240, 249, 255);
  doc.roundedRect(10, y, pageWidth - 20, 24, 2, 2, "F");
  doc.setTextColor(...primaryColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("THE BIG IDEA", 15, y + 6);
  doc.setTextColor(...darkColor);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  const bigIdea = "A tenant-linked rewards program where customers earn points spending at mall stores and redeem for car wash benefits. This initiative positions the car wash as a customer experience amenity rather than a standalone retail tenant.";
  const ideaLines = doc.splitTextToSize(bigIdea, pageWidth - 30);
  doc.text(ideaLines, 15, y + 12);
  y += 28;

  // Two column layout
  const colWidth = (pageWidth - 25) / 2;
  const leftX = 10;
  const rightX = leftX + colWidth + 5;

  // Left column - How It Works
  doc.setFillColor(...primaryColor);
  doc.roundedRect(leftX, y, colWidth, 8, 1, 1, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("HOW IT WORKS", leftX + 3, y + 5.5);

  let leftY = y + 12;
  doc.setTextColor(...grayColor);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  const steps = [
    "1. Customer spends at participating tenants",
    "2. Earns 1 point per R1 spent (QR/receipt)",
    "3. Points accumulate in digital wallet",
    "4. Redeems for car wash rewards",
    "5. Returns to mall \u2192 loyalty loop created"
  ];
  steps.forEach(step => {
    doc.text(step, leftX + 3, leftY);
    leftY += 5;
  });

  // Right column - Rewards Ladder
  doc.setFillColor(...primaryColor);
  doc.roundedRect(rightX, y, colWidth, 8, 1, 1, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("REWARDS LADDER", rightX + 3, y + 5.5);

  let rightY = y + 12;
  const tiers = [
    { tier: "Tier 1 (250-400 pts)", reward: "Tyre shine, air freshener, wipe-down" },
    { tier: "Tier 2 (800 pts)", reward: "R30 off OR free premium add-on" },
    { tier: "Tier 3 (1,500 pts)", reward: "Free Basic Wash (up to R80)" },
    { tier: "Tier 4 (3,000 pts)", reward: "Free Wash + Vacuum upgrade" },
  ];
  doc.setFontSize(7);
  tiers.forEach(t => {
    doc.setTextColor(...primaryColor);
    doc.setFont("helvetica", "bold");
    doc.text(t.tier, rightX + 3, rightY);
    doc.setTextColor(...grayColor);
    doc.setFont("helvetica", "normal");
    doc.text(t.reward, rightX + 3, rightY + 4);
    rightY += 10;
  });

  y += 48;

  // Financial Analysis & Funding Model side by side
  doc.setFillColor(...primaryColor);
  doc.roundedRect(leftX, y, colWidth, 8, 1, 1, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("FINANCIAL PROTECTION", leftX + 3, y + 5.5);

  leftY = y + 12;
  doc.setTextColor(...grayColor);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  const financials = [
    "\u2022 Upgrades cost R3-R12 (feel valuable to customers)",
    "\u2022 Free wash requires R1,500 mall spend first",
    "\u2022 Your actual cost: ~R45 variable cost only",
    "\u2022 All rewards structured above variable cost",
    "\u2022 Points expire after 90 days (limits liability)"
  ];
  financials.forEach(item => {
    doc.text(item, leftX + 3, leftY);
    leftY += 5;
  });

  doc.setFillColor(...primaryColor);
  doc.roundedRect(rightX, y, colWidth, 8, 1, 1, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("FUNDING MODEL", rightX + 3, y + 5.5);

  rightY = y + 12;
  doc.setTextColor(...grayColor);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  const funding = [
    "Tenant Contribution (Optional):",
    "  R10 per redemption (performance-based)",
    "Your Contribution:",
    "  Low-cost upgrades, daily caps",
    "Mall Benefit:",
    "  Increased spend, retention, analytics"
  ];
  funding.forEach(item => {
    doc.text(item, rightX + 3, rightY);
    rightY += 5;
  });

  y += 38;

  // Program Controls & Tenant Support
  doc.setFillColor(...primaryColor);
  doc.roundedRect(leftX, y, colWidth, 8, 1, 1, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("PROGRAM CONTROLS", leftX + 3, y + 5.5);

  leftY = y + 12;
  doc.setTextColor(...grayColor);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  const controls = [
    "\u2713 Max 1 reward per vehicle per day",
    "\u2713 Max R30 discount per transaction",
    "\u2713 QR-linked fraud prevention",
    "\u2713 Subject to daily capacity/availability",
    "\u2713 Opt-in tenants (start with 5-10 pilot)"
  ];
  controls.forEach(item => {
    doc.text(item, leftX + 3, leftY);
    leftY += 5;
  });

  doc.setFillColor(...primaryColor);
  doc.roundedRect(rightX, y, colWidth, 8, 1, 1, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("TENANT SUPPORT", rightX + 3, y + 5.5);

  rightY = y + 12;
  doc.setTextColor(...grayColor);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  const support = [
    "\u2713 Counter QR stand provided",
    "\u2713 Cashier script included",
    "\u2713 Website listing as partner store",
    "\u2713 Monthly performance reports",
    "\u2713 Simple, measurable, performance-based"
  ];
  support.forEach(item => {
    doc.text(item, rightX + 3, rightY);
    rightY += 5;
  });

  y += 38;

  // Pilot Plan & Success Metrics
  doc.setFillColor(255, 247, 237);
  doc.roundedRect(10, y, pageWidth - 20, 32, 2, 2, "F");
  
  doc.setTextColor(...goldColor);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("30-DAY PILOT PLAN", 15, y + 6);
  
  doc.setTextColor(...grayColor);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.text("\u2022 5-10 participating tenants     \u2022 1 bay operation     \u2022 Full reward ladder active     \u2022 Signage in 2-3 key areas", 15, y + 13);
  
  doc.setTextColor(...primaryColor);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("Pilot Success Indicators:", 15, y + 20);
  doc.setTextColor(...grayColor);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.text("\u2713 Increase in repeat visits     \u2713 Measured redemptions     \u2713 Tenant feedback     \u2713 Customer engagement metrics", 15, y + 26);

  y += 38;

  // Benefits for all parties
  doc.setFillColor(...primaryColor);
  doc.roundedRect(10, y, pageWidth - 20, 8, 1, 1, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("WHY THIS PARTNERSHIP WORKS", 15, y + 5.5);

  y += 12;
  const benefitWidth = (pageWidth - 30) / 3;
  
  const benefits = [
    { title: "FOR THE MALL", items: "More spending, differentiation, foot traffic, analytics" },
    { title: "FOR TENANTS", items: "Free exposure, performance-based, monthly reports" },
    { title: "FOR MR. BUBBLES", items: "Steady flow, brand visibility, premium positioning" },
  ];
  
  benefits.forEach((b, i) => {
    const x = 10 + (i * (benefitWidth + 5));
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(x, y, benefitWidth, 18, 1, 1, "F");
    doc.setTextColor(...primaryColor);
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.text(b.title, x + 3, y + 5);
    doc.setTextColor(...grayColor);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6);
    const lines = doc.splitTextToSize(b.items, benefitWidth - 6);
    doc.text(lines, x + 3, y + 10);
  });

  y += 24;

  // Next Steps CTA
  doc.setFillColor(...primaryColor);
  doc.roundedRect(10, y, pageWidth - 20, 22, 2, 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("NEXT STEPS", 15, y + 7);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("We propose a 30-day pilot with selected tenants to validate customer uptake and operational flow.", 15, y + 13);
  doc.text("We welcome the opportunity to present this proposal and align with Boksburg Centre's customer experience strategy.", 15, y + 19);

  // Footer
  doc.setFillColor(...accentColor);
  doc.rect(0, pageHeight - 12, pageWidth, 12, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("Mr. Bubbles \u2013 Premium Car Wash  |  Boksburg Centre, Gauteng  |  082 806 9569  |  www.mrbubbles.co.za", pageWidth / 2, pageHeight - 5, { align: "center" });

  doc.save("Mr_Bubbles_Mall_Partnership_Proposal.pdf");
};
