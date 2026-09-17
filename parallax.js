const artwork = document.querySelector('.art');
const cursorLayer = artwork.querySelector('.cursor-layer');
const cursorTip = cursorLayer.querySelector('.cursor-tip');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let frame = null;
let x = 0;
let y = 0;
let cursorHome = null;

function render() {
  artwork.style.setProperty('--pointer-x', x);
  artwork.style.setProperty('--pointer-y', y);
  frame = null;
}

function reset() {
  artwork.classList.remove('is-cursor-active');
  cursorLayer.style.removeProperty('--cursor-x');
  cursorLayer.style.removeProperty('--cursor-y');
  cursorHome = null;
  if (frame !== null) cancelAnimationFrame(frame);
  x = 0;
  y = 0;
  render();
}

function trackPointer(event) {
  if (event.pointerType !== 'mouse') return;

  const bounds = artwork.getBoundingClientRect();
  if (cursorHome === null) {
    const tip = cursorTip.getBoundingClientRect();
    const layer = cursorLayer.getBoundingClientRect();
    // Subtract the layer's position so re-entry also works during its return.
    cursorHome = { x: tip.left - layer.left, y: tip.top - layer.top };
  }
  artwork.classList.add('is-cursor-active');
  cursorLayer.style.setProperty('--cursor-x', `${event.clientX - bounds.left - cursorHome.x}px`);
  cursorLayer.style.setProperty('--cursor-y', `${event.clientY - bounds.top - cursorHome.y}px`);

  // Cursor tracking remains immediate even when decorative motion is disabled.
  if (reducedMotion.matches) return;
  const clamp = (value) => Math.max(-1, Math.min(1, value));
  x = clamp((event.clientX - bounds.left) / bounds.width * 2 - 1);
  y = clamp((event.clientY - bounds.top) / bounds.height * 2 - 1);

  if (frame === null) frame = requestAnimationFrame(render);
}

artwork.addEventListener('pointerenter', trackPointer);
artwork.addEventListener('pointermove', trackPointer);
artwork.addEventListener('pointerleave', reset);
artwork.addEventListener('pointercancel', reset);
window.addEventListener('blur', reset);
window.addEventListener('resize', reset);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) reset();
});
reducedMotion.addEventListener('change', reset);
