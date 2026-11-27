(() => {
  const container = document.querySelector('.speckles');
  if (!container) return;

  // A fixed seed keeps the logo consistent across reloads and screen sizes.
  let seed = 1986;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const shapes = ['fleck', 'shard', 'zigzag'];
  const columns = 16;
  const rows = 22;
  const fragment = document.createDocumentFragment();

  // Jitter one speckle per cell for even coverage without obvious rows.
  // The parent triangle clips the pattern, including speckles at its edges.
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const speckle = document.createElement('span');
      speckle.className = `speckle speckle--${shapes[Math.floor(random() * shapes.length)]}`;
      speckle.style.left = `${(column + random()) / columns * 100}%`;
      speckle.style.top = `${(row + random()) / rows * 100}%`;
      speckle.style.transform = `translate(-50%, -50%) rotate(${random() * 360}deg) scale(${0.6 + random() * 0.4})`;
      fragment.append(speckle);
    }
  }

  container.replaceChildren(fragment);
})();
