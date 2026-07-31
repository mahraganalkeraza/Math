/**
 * Triggers native browser print / save-as-PDF flow.
 * Direct browser printing (window.print()) natively handles modern CSS color
 * functions like `oklch` without canvas parsing errors, producing high-fidelity vector PDF output.
 */
export async function downloadPDF(documentTitle: string = 'Math_KG2_Revision'): Promise<void> {
  const previousTitle = document.title;
  const sanitizedTitle = documentTitle.replace(/[^a-zA-Z0-9_-]/g, '_');

  try {
    // Set document title so native browser print suggests this file name when saving to PDF
    document.title = sanitizedTitle;

    // Direct browser print is the most reliable & error-free way to handle oklch & Tailwind v4
    window.print();
  } catch (err) {
    console.warn('Native print call completed:', err);
  } finally {
    // Restore original document title after print dialog closes
    setTimeout(() => {
      document.title = previousTitle;
    }, 1000);
  }
}

/**
 * Convenience alias for triggering print/PDF export
 */
export function triggerPrint(title?: string): void {
  downloadPDF(title || 'Math_KG2_Revision');
}
