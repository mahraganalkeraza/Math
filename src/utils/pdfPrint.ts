import html2pdf from 'html2pdf.js';

/**
 * Converts a modern color-mix CSS function to a safe standard color value.
 */
export function convertColorMixToSafeColor(colorStr: string): string {
  const cleanStr = colorStr.trim().toLowerCase();
  if (cleanStr.includes('amber') || cleanStr.includes('yellow')) {
    return '#f59e0b';
  }
  if (cleanStr.includes('blue')) {
    return '#1e3a8a';
  }
  if (cleanStr.includes('white')) {
    return '#ffffff';
  }
  if (cleanStr.includes('transparent')) {
    return 'rgba(0,0,0,0)';
  }
  return '#475569';
}

/**
 * Converts modern CSS oklch/oklab/lab/lch color strings into canvas-safe HEX or RGB formats
 * by analyzing their lightness and hue values.
 */
export function convertOklchAndOklabToSafeColor(colorStr: string): string {
  try {
    const cleanStr = colorStr.trim().toLowerCase();
    // Extract numbers inside the function
    const numbersMatch = cleanStr.match(/[\d.]+/g);
    if (numbersMatch && numbersMatch.length >= 1) {
      let lightness = parseFloat(numbersMatch[0]); // Lightness is 0 to 1 or 0 to 100
      if (lightness > 1) {
        lightness = lightness / 100;
      }
      
      const hasAlpha = cleanStr.includes('/');
      let alpha = 1;
      if (hasAlpha && numbersMatch.length >= 4) {
        alpha = parseFloat(numbersMatch[numbersMatch.length - 1]);
        if (alpha > 1) {
          alpha = alpha / 100;
        }
      }

      // 1. High lightness -> Light backgrounds or white
      if (lightness > 0.93) {
        return alpha < 1 ? `rgba(255, 255, 255, ${alpha})` : '#ffffff';
      }
      if (lightness > 0.85) {
        return alpha < 1 ? `rgba(248, 250, 252, ${alpha})` : '#f8fafc'; // slate-50 equivalent
      }

      // 2. Low lightness -> Dark text/borders
      if (lightness < 0.3) {
        return alpha < 1 ? `rgba(15, 23, 42, ${alpha})` : '#0f172a'; // slate-900 equivalent
      }
      if (lightness < 0.5) {
        return alpha < 1 ? `rgba(30, 41, 59, ${alpha})` : '#1e293b'; // slate-800 equivalent
      }

      // 3. Midtones (amber/yellow or blue)
      // Check for amber/yellow range
      if (cleanStr.includes('amber') || cleanStr.includes('yellow')) {
        return alpha < 1 ? `rgba(245, 158, 11, ${alpha})` : '#f59e0b';
      }
      if (cleanStr.includes('blue')) {
        return alpha < 1 ? `rgba(30, 58, 138, ${alpha})` : '#1e3a8a';
      }

      // Try checking Hue if it's oklch or lch
      if ((cleanStr.startsWith('oklch') || cleanStr.startsWith('lch')) && numbersMatch.length >= 3) {
        const hue = parseFloat(numbersMatch[2]);
        // yellow is around 60-110
        if (hue >= 60 && hue <= 110) {
          return alpha < 1 ? `rgba(245, 158, 11, ${alpha})` : '#f59e0b';
        }
        // blue is around 220-290
        if (hue >= 220 && hue <= 290) {
          return alpha < 1 ? `rgba(30, 58, 138, ${alpha})` : '#1e3a8a';
        }
      }

      // Default safe slate-600 mid-tone
      return alpha < 1 ? `rgba(71, 85, 105, ${alpha})` : '#475569';
    }
  } catch (e) {
    // Ignore and fallback
  }

  // Fallback defaults for standard theme colors
  if (colorStr.includes('amber') || colorStr.includes('yellow')) return '#f59e0b';
  if (colorStr.includes('blue')) return '#1e3a8a';
  return '#1e293b';
}

/**
 * Parses CSS text and recursively replaces oklch, oklab, lab, lch, and color-mix functions
 * with safe HEX/RGB/RGBA formats, properly handling nested parentheses.
 */
export function replaceModernColorFunctions(cssText: string): string {
  const targets = ['oklch(', 'oklab(', 'lab(', 'lch(', 'color-mix('];
  let result = cssText;

  for (const target of targets) {
    let index = result.indexOf(target);
    while (index !== -1) {
      const startIdx = index;
      const parenStart = index + target.length;
      let depth = 1;
      let endIdx = parenStart;

      while (endIdx < result.length && depth > 0) {
        const char = result[endIdx];
        if (char === '(') depth++;
        else if (char === ')') depth--;
        endIdx++;
      }

      if (depth === 0) {
        // We found the full matched function block (supports nesting)
        const fullMatch = result.substring(startIdx, endIdx);
        let safeColor = '';
        if (target === 'color-mix(') {
          safeColor = convertColorMixToSafeColor(fullMatch);
        } else {
          safeColor = convertOklchAndOklabToSafeColor(fullMatch);
        }
        // Replace it in the result string
        result = result.substring(0, startIdx) + safeColor + result.substring(endIdx);
        // Search again from the same or next position
        index = result.indexOf(target, startIdx + safeColor.length);
      } else {
        // Unmatched parenthesis, break to avoid infinite loop
        break;
      }
    }
  }

  return result;
}

/**
 * Utility to convert modern CSS color strings (including oklch, oklab, color-mix, lab)
 * into canvas-safe RGB or HEX format to prevent html2canvas parsing errors.
 */
export function toCanvasSafeColor(colorStr: string): string {
  if (!colorStr || colorStr === 'transparent' || colorStr === 'inherit' || colorStr === 'initial') {
    return colorStr;
  }

  const cleanStr = colorStr.trim().toLowerCase();

  // If it does not contain modern color functions, return as is
  if (
    !cleanStr.includes('oklch') &&
    !cleanStr.includes('oklab') &&
    !cleanStr.includes('color-mix') &&
    !cleanStr.includes('lab') &&
    !cleanStr.includes('lch')
  ) {
    return colorStr;
  }

  return replaceModernColorFunctions(colorStr);
}

/**
 * Traverses original and cloned elements in parallel, copying resolved canvas-safe
 * computed styles from original elements into the corresponding cloned element style overrides.
 */
export function sanitizeDocumentColors(clonedTarget: HTMLElement, originalElement: HTMLElement): void {
  const origList = [originalElement, ...Array.from(originalElement.querySelectorAll<HTMLElement>('*'))];
  const cloneList = [clonedTarget, ...Array.from(clonedTarget.querySelectorAll<HTMLElement>('*'))];

  const count = Math.min(origList.length, cloneList.length);

  const colorProps = [
    'color',
    'background-color',
    'border-color',
    'border-top-color',
    'border-right-color',
    'border-bottom-color',
    'border-left-color',
    'outline-color',
    'fill',
    'stroke',
  ];

  for (let i = 0; i < count; i++) {
    const origEl = origList[i];
    const cloneEl = cloneList[i];

    // 1. Sanitize standard fill/stroke attributes first
    const fillAttr = origEl.getAttribute('fill');
    if (fillAttr && (fillAttr.includes('oklch') || fillAttr.includes('oklab') || fillAttr.includes('color-mix'))) {
      cloneEl.setAttribute('fill', toCanvasSafeColor(fillAttr));
    }
    const strokeAttr = origEl.getAttribute('stroke');
    if (strokeAttr && (strokeAttr.includes('oklch') || strokeAttr.includes('oklab') || strokeAttr.includes('color-mix'))) {
      cloneEl.setAttribute('stroke', toCanvasSafeColor(strokeAttr));
    }

    // 2. Read computed styles from the original live elements (full layout/style resolution)
    try {
      const computed = window.getComputedStyle(origEl);
      for (const prop of colorProps) {
        const val = computed.getPropertyValue(prop);
        if (
          val &&
          (val.includes('oklch') ||
            val.includes('oklab') ||
            val.includes('color-mix') ||
            val.includes('lab') ||
            val.includes('lch'))
        ) {
          const safeVal = toCanvasSafeColor(val);
          cloneEl.style.setProperty(prop, safeVal, 'important');
        }
      }
    } catch {
      // Ignore errors on non-connected nodes or pseudo-elements
    }
  }
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

  // 3. Mark the active original element with a temporary data attribute to identify its clone
  if (element) {
    element.setAttribute('data-pdf-capture-root', 'true');
  }

  // 4. Configure html2pdf options
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

        // Sanitize <style> tags in cloned document to completely bypass html2canvas parser crash
        const styleTags = clonedDoc.querySelectorAll('style');
        styleTags.forEach((styleTag) => {
          let cssText = styleTag.textContent || '';
          if (
            cssText.includes('oklch') ||
            cssText.includes('oklab') ||
            cssText.includes('lab') ||
            cssText.includes('lch') ||
            cssText.includes('color-mix')
          ) {
            styleTag.textContent = replaceModernColorFunctions(cssText);
          }
        });

        // Sanitize modern CSS colors (oklch, color-mix) in cloned document elements
        const clonedTarget = clonedDoc.querySelector('[data-pdf-capture-root]') as HTMLElement;
        if (clonedTarget && element) {
          sanitizeDocumentColors(clonedTarget, element);
        }
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
  } finally {
    if (element) {
      element.removeAttribute('data-pdf-capture-root');
    }
  }
}

/**
 * Alias for downloadPDF to ensure backwards compatibility
 */
export function triggerPrint(title?: string, element?: HTMLElement | string | null): void {
  downloadPDF(title || 'KG2_Math_Revision_Booklet', element);
}
