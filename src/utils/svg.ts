/**
 * Inject explicit width/height + preserveAspectRatio onto <svg> so it scales
 * to its container reliably across browsers (iOS Safari renders inline SVG at
 * intrinsic viewBox size when these are missing).
 */
export function fitSvg(svg: string): string {
  return svg.replace(/<svg\b([^>]*)>/i, (_match, attrs) => {
    const cleaned = attrs
      .replace(/\s+width="[^"]*"/g, "")
      .replace(/\s+height="[^"]*"/g, "")
      .replace(/\s+preserveAspectRatio="[^"]*"/g, "");
    return `<svg width="100%" height="100%" preserveAspectRatio="xMidYMid meet"${cleaned}>`;
  });
}
