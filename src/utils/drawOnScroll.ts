/**
 * Measure each path and pre-hide it via stroke-dasharray.
 * Returns the array of lengths (used by the animation).
 *
 * Falls back to 1000 when getTotalLength() returns 0 — rare, but possible
 * on some browsers if the path is inside an unrendered SVG. With the inline
 * SVG approach used here it shouldn't trigger, but the fallback prevents a
 * fully-drawn flash if it ever does.
 */
export function setupPathDrawing(paths: SVGPathElement[]): number[] {
  return paths.map((p) => {
    const measured = p.getTotalLength();
    const len = measured > 0 ? measured : 1000;
    p.setAttribute("stroke-dasharray", String(len));
    p.setAttribute("stroke-dashoffset", String(len));
    return len;
  });
}
