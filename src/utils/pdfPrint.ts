import html2pdf from 'html2pdf.js';

/**
 * Utility to convert modern CSS color strings (including oklch, color-mix, lab)
 * into canvas-safe RGB or HEX format to prevent html2canvas parsing errors.
 */
export function toCanvasSafeColor(colorStr: string): string {
  if (!colorStr || colorStr === 'transparent' || colorStr === 'inherit' || colorStr === 'initial') {
    return colorStr;
  }
  // If it does not contain modern color functions, return as is
  if (
    !colorStr.includes('oklch') &&
    !colorStr.includes('color-mix') &&
    !colorStr.includes('lab') &&
    !colorStr.includes('lch')
  ) {
    return colorStr;
  }

  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#000000';
      ctx.fillStyle = colorStr;
      const parsed = ctx.fillStyle;
      if (parsed && (parsed.startsWith('#') || parsed.startsWith('rgb'))) {
        return parsed;
      }
    }
  } catch {
    // Fallback if canvas context fails
  }

  // Fallback defaults for standard theme colors
  if (colorStr.includes('amber') || colorStr.includes('yellow')) return '#f59e0b';
  if (colorStr.includes('blue')) return '#1e3a8a';
  return '#1e293b';
}

/**
 * Traverses cloned document elements and sanitizes modern CSS color definitions
 * (oklch, color-mix, etc.) to standard RGB/HEX before canvas rendering.
 */
export function sanitizeDocumentColors(doc: Document): void {
  const allElements = doc.querySelectorAll<HTMLElement>('*');
  const colorProps = [
    'color',
    'backgroundColor',
    'borderColor',
    'borderTopColor',
    'borderRightColor',
    'borderBottomColor',
    'borderLeftColor',
    'outlineColor',
    'fill',
    'stroke',
  ];

  allElements.forEach((el) => {
    // Sanitize inline style attributes
    const styleAttr = el.getAttribute('style');
    if (styleAttr && (styleAttr.includes('oklch') || styleAttr.includes('color-mix') || styleAttr.includes('var('))) {
      const updatedStyle = styleAttr.replace(/oklch\([^)]+\)/gi, (match) => toCanvasSafeColor(match));
      el.setAttribute('style', updatedStyle);
    }

    // Sanitize SVG attributes
    const fillAttr = el.getAttribute('fill');
    if (fillAttr && (fillAttr.includes('oklch') || fillAttr.includes('color-mix'))) {
      el.setAttribute('fill', toCanvasSafeColor(fillAttr));
    }
    const strokeAttr = el.getAttribute('stroke');
    if (strokeAttr && (strokeAttr.includes('oklch') || strokeAttr.includes('color-mix'))) {
      el.setAttribute('stroke', toCanvasSafeColor(strokeAttr));
    }

    // Sanitize computed color properties
    try {
      const computed = window.getComputedStyle(el);
      for (const prop of colorProps) {
        const val = computed.getPropertyValue(prop);
        if (val && (val.includes('oklch') || val.includes('color-mix') || val.includes('lab'))) {
          const safeVal = toCanvasSafeColor(val);
          el.style.setProperty(prop, safeVal, 'important');
        }
      }
    } catch {
      // Ignore reading computed styles on non-connected synthetic nodes
    }
  });
}

/**
 * Directly generates and triggers an immediate file download of the booklet as a .pdf file,
 * completely bypassing the browser's window.print() print preview window.
 * 
 * @param documentTitle Dynamic title based on grade/exam (e.g. 'KG2_Math_Revision_Booklet')
 * @param targetElement Optional HTMLElement or string ID of element to capture
 */
export async function downloadPDF(
  documentTitle: string = 'KG2_Math_Revision_Booklet',
  targetElement?: HTMLElement | string | null
): Promise<void> {
  // 1. Sanitize filename (supporting Arabic, English, numbers, hyphens)
  const sanitizedTitle = documentTitle
    .trim()
    .replace(/[^\w\u0600-\u06FF-]/g, '_')
    .replace(/__+/g, '_');
  const filename = `${sanitizedTitle || 'Math_Revision_Booklet'}.pdf`;

  // 2. Resolve target element
  let element: HTMLElement | null = null;
  if (typeof targetElement === 'string') {
    element = document.getElementById(targetElement);
  } else if (targetElement instanceof HTMLElement) {
    element = targetElement;
  }

  if (!element) {
    element = document.getElementById('printable-worksheet');
  }
  if (!element) {
    element = document.getElementById('printable-worksheet-wrapper');
  }
  if (!element) {
    element = document.querySelector('.a4-preview') as HTMLElement;
  }
  if (!element) {
    element = (document.querySelector('main') as HTMLElement) || document.body;
  }

  // 3. Configure html2pdf options
  const opt = {
    margin: [6, 6, 6, 6],
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
      letterRendering: true,
      onclone: (clonedDoc: Document) => {
        // Ensure hidden container is visible in cloned memory DOM for capture
        const clonedWrapper = clonedDoc.getElementById('printable-worksheet-wrapper');
        if (clonedWrapper) {
          clonedWrapper.style.display = 'block';
          clonedWrapper.style.visibility = 'visible';
          clonedWrapper.style.position = 'relative';
        }

        const clonedWorksheet = clonedDoc.getElementById('printable-worksheet');
        if (clonedWorksheet) {
          clonedWorksheet.style.display = 'flex';
          clonedWorksheet.style.visibility = 'visible';
        }

        // Hide screen-only interactive controls (.no-print)
        const noPrintElements = clonedDoc.querySelectorAll('.no-print');
        noPrintElements.forEach((el) => {
          (el as HTMLElement).style.display = 'none';
        });

        // Sanitize modern CSS colors (oklch, color-mix) in cloned document
        sanitizeDocumentColors(clonedDoc);
      },
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
      compress: true,
    },
    pagebreak: {
      mode: ['css', 'legacy'],
      avoid: [
        '.section-card',
        '.header-card',
        '.number-box',
        '.sequence-row',
        '.inline-eq',
        '.question-card',
        '.question-box',
        '.question-container',
        '.avoid-break',
        'table',
        'tr',
      ],
    },
  };

  try {
    // Direct PDF compilation & immediate browser file download
    await (html2pdf() as any).set(opt).from(element).save();
  } catch (err) {
    console.error('Direct PDF export error:', err);
  }
}

/**
 * Alias for downloadPDF to ensure backwards compatibility
 */
export function triggerPrint(title?: string, element?: HTMLElement | string | null): void {
  downloadPDF(title || 'KG2_Math_Revision_Booklet', element);
}
