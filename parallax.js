const artwork = document.querySelector('.art');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let frame = null;
let x = 0;
let y = 0;

function render() {
  artwork.style.setProperty('--pointer-x', x);
  artwork.style.setProperty('--pointer-y', y);
  frame = null;
}

function reset() {
  if (frame !== null) cancelAnimationFrame(frame);
  x = 0;
  y = 0;
  render();
}

artwork.addEventListener('pointermove', (event) => {
  if (reducedMotion.matches || event.pointerType === 'touch') return;

  const bounds = artwork.getBoundingClientRect();
  const clamp = (value) => Math.max(-1, Math.min(1, value));
  x = clamp((event.clientX - bounds.left) / bounds.width * 2 - 1);
  y = clamp((event.clientY - bounds.top) / bounds.height * 2 - 1);

  if (frame === null) frame = requestAnimationFrame(render);
});

artwork.addEventListener('pointerleave', reset);
artwork.addEventListener('pointercancel', reset);
window.addEventListener('blur', reset);
window.addEventListener('resize', reset);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) reset();
});
reducedMotion.addEventListener('change', reset);
