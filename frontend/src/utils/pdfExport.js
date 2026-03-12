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

    // Show loading state
    const originalContent = element.innerHTML;
    
    // Capture the element as canvas
    const canvas = await html2canvas(element, {
      scale: 2, // Higher quality
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    // Calculate PDF dimensions
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: imgHeight > imgWidth ? 'portrait' : 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

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
