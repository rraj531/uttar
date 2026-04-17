import { jsPDF } from 'jspdf';
import { format } from 'date-fns';

export const generateWellnessPDF = (question, aiResponse) => {
  const doc = new jsPDF();
  
  // Custom Fonts (Using standard ones as placeholders, but jsPDF handles basic well)
  doc.setFont('helvetica');
  
  // Title
  doc.setFontSize(22);
  doc.setTextColor(188, 108, 77); // uttar-clay
  doc.text('Uttar \u2013 Your Mental Wellness Companion', 20, 30);
  
  // Subtitle/Date
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on: ${format(new Date(), 'PPpp')}`, 20, 40);
  
  doc.line(20, 45, 190, 45); // horizontal line
  
  // Section 1: User Query
  doc.setFontSize(14);
  doc.setTextColor(45, 45, 45); // uttar-charcoal
  doc.text('Your Query:', 20, 60);
  
  doc.setFontSize(12);
  doc.setTextColor(80, 80, 80);
  const splitQuestion = doc.splitTextToSize(question, 170);
  doc.text(splitQuestion, 20, 70);
  
  // Calculate next Y position
  let nextY = 70 + (splitQuestion.length * 7) + 15;
  
  // Section 2: AI Response
  doc.setFontSize(14);
  doc.setTextColor(45, 45, 45);
  doc.text('Uttar\'s Response:', 20, nextY);
  
  nextY += 10;
  
  doc.setFontSize(12);
  doc.setTextColor(80, 80, 80);
  const splitResponse = doc.splitTextToSize(aiResponse, 170);
  
  // Check if we need to add a new page for the response
  if (nextY + (splitResponse.length * 6) > 280) {
      doc.addPage();
      nextY = 20;
  }
  
  doc.text(splitResponse, 20, nextY);
  
  const finalY = nextY + (splitResponse.length * 6);
  
  // Footer
  doc.setFontSize(10);
  doc.setTextColor(188, 108, 77);
  doc.text(`Stay strong \u2665`, 20, Math.min(finalY + 20, 280));
  
  // Save the PDF
  doc.save('Uttar_Wellness_Session.pdf');
};
