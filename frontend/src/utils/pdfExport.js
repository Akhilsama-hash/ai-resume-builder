import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Export resume to PDF
 * Captures the resume preview and converts to high-quality PDF
 */
export const exportToPDF = async (resumeData, template) => {
  try {
    const element = document.getElementById('resume-preview');
    
    if (!element) {
      alert('Resume preview not found');
      return;
    }

    // Capture the element as canvas with higher scale for better quality
    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    });

    // A4 dimensions in mm
    const pdfWidth = 210;
    const pdfHeight = 297;
    
    // Calculate dimensions to fit on one page
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    
    // If content is taller than one page, scale it down to fit
    if (imgHeight > pdfHeight) {
      const scaleFactor = pdfHeight / imgHeight;
      const scaledWidth = imgWidth * scaleFactor;
      const scaledHeight = pdfHeight;
      const xOffset = (pdfWidth - scaledWidth) / 2;
      
      pdf.addImage(imgData, 'JPEG', xOffset, 0, scaledWidth, scaledHeight);
    } else {
      // Center vertically if shorter than page
      const yOffset = (pdfHeight - imgHeight) / 2;
      pdf.addImage(imgData, 'JPEG', 0, yOffset, imgWidth, imgHeight);
    }

    // Generate filename
    const fileName = `${resumeData.name || 'Resume'}_${template}_${Date.now()}.pdf`;
    
    // Download PDF
    pdf.save(fileName);

    console.log('PDF exported successfully');
  } catch (error) {
    console.error('Error exporting PDF:', error);
    alert('Failed to export PDF. Please try again.');
  }
};

/**
 * Print resume
 * Opens browser print dialog
 */
export const printResume = () => {
  window.print();
};
