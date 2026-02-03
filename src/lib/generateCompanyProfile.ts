import jsPDF from "jspdf";

export const generateCompanyProfile = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const primaryColor: [number, number, number] = [14, 116, 144];
  const darkColor: [number, number, number] = [30, 41, 59];
  const grayColor: [number, number, number] = [100, 116, 139];

  let yPos = 20;

  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 50, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text("Mr. Bubbles Bubbles", pageWidth / 2, 25, { align: "center" });

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Premium Car Wash Experience", pageWidth / 2, 35, { align: "center" });

  yPos = 65;

  doc.setTextColor(...darkColor);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("About Us", 20, yPos);

  yPos += 10;
  doc.setTextColor(...grayColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  const aboutText = "Mr. Bubbles Bubbles is a premier car wash service located in Boksburg, Gauteng. We are dedicated to providing exceptional car care services with attention to detail and customer satisfaction. Our experienced team uses premium products and techniques to ensure your vehicle receives the royal bubble treatment it deserves.";
  const aboutLines = doc.splitTextToSize(aboutText, pageWidth - 40);
  doc.text(aboutLines, 20, yPos);

  yPos += aboutLines.length * 6 + 15;

  doc.setTextColor(...darkColor);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Our Services & Pricing", 20, yPos);

  yPos += 12;

  const services = [
    {
      name: "Quick Bubble - R80",
      features: ["Exterior Hand Wash & Dry", "Wheel & Mag Cleaning", "Window Cleaning", "Tyre Shine"],
    },
    {
      name: "Full Service - R120",
      features: ["All Quick Bubble services", "Interior Vacuum", "Dashboard & Console Wipe", "Door Panels Clean", "Air Freshener"],
    },
    {
      name: "Premium Detail - R250",
      features: ["All Full Service features", "Leather/Seat Treatment", "Carpet Deep Clean", "High-Definition Wax Polish", "Boot & Spare Wheel Clean"],
    },
    {
      name: "Royal Treatment - R450",
      features: ["All Premium Detail features", "Engine Bay Clean", "Machine Buff Polish", "Interior Roof Clean", "Full Exterior Hand Polish"],
    },
  ];

  services.forEach((service) => {
    doc.setTextColor(...primaryColor);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(service.name, 20, yPos);
    yPos += 6;

    doc.setTextColor(...grayColor);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    service.features.forEach((feature) => {
      doc.text(`  • ${feature}`, 25, yPos);
      yPos += 5;
    });
    yPos += 5;
  });

  yPos += 5;
  doc.setTextColor(...darkColor);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Why Choose Us?", 20, yPos);

  yPos += 10;
  doc.setTextColor(...grayColor);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  const benefits = [
    "Professional & Experienced Team - Our skilled staff are trained in the latest car care techniques",
    "Premium Products - We use only high-quality cleaning products safe for all vehicle types",
    "Attention to Detail - Every corner of your vehicle receives meticulous care",
    "Convenient Location - Easily accessible in Boksburg Center, Gauteng",
    "Loyalty Rewards - Earn stamps with every wash and get your 10th wash FREE",
    "Customer Satisfaction - We guarantee you'll love the results",
  ];

  benefits.forEach((benefit) => {
    const benefitLines = doc.splitTextToSize(`• ${benefit}`, pageWidth - 45);
    doc.text(benefitLines, 20, yPos);
    yPos += benefitLines.length * 5 + 3;
  });

  doc.setFillColor(...primaryColor);
  doc.rect(0, 270, pageWidth, 27, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Contact Us", pageWidth / 2, 278, { align: "center" });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Phone: 082 806 9569  |  Location: Boksburg Center, Gauteng  |  Hours: Mon-Sat 7:00 AM - 6:00 PM", pageWidth / 2, 286, { align: "center" });

  doc.save("Mr_Bubbles_Company_Profile.pdf");
};
