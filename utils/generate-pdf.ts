import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export async function generatePDF(elementId: string, fileName: string) {
  const element = document.getElementById(elementId)
  if (!element) return

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    })

    const imgWidth = 210 // A4 width in mm
    const pageHeight = 297 // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    const pdf = new jsPDF("p", "mm", "a4")

    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, imgWidth, imgHeight)
    pdf.save(fileName)
  } catch (error) {
    console.error("Error generating PDF:", error)
  }
}

