/**
 * Triggers native browser print / save-as-PDF flow.
 * Direct browser printing (window.print()) natively handles modern CSS color
 * functions like `oklch` without canvas parsing errors, producing high-fidelity vector PDF output.
 */
export function downloadPDF(documentTitle: string = 'Math_KG2_Revision'): void {
  const previousTitle = document.title;
  
  // تنظيف العنوان مع دعم الحروف العربية والإنجليزية والأرقام والشرطات
  const sanitizedTitle = documentTitle.trim().replace(/[^\w\u0600-\u06FF-]/g, '_');

  try {
    // ضبط عنوان المستند ليعتمده المتصفح كاسم للملف عند الحفظ كـ PDF
    document.title = sanitizedTitle || 'Math_Revision_Booklet';

    // استدعاء نافذة الطباعة المباشرة من المتصفح
    window.print();
  } catch (err) {
    console.error('Native print call failed:', err);
  } finally {
    // استعادة العنوان الأصلي للمستند بعد فتح نافذة الطباعة
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