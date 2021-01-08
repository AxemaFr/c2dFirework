export async function initRenderer(canvas) {
  const ctx = canvas.getContext('2d');

  function render(data, count, width, height) {
    if (width !== canvas.width || height !== canvas.height) {
      canvas.width = width;
      canvas.height = height;
      ctx.translate(width / 2, height / 2);
      ctx.fillStyle = 'white';
    }

    ctx.clearRect(
      -width / 2,
      -height / 2,
      width,
      height
    );

    ctx.beginPath();
    const len = count * 4;
    for (let ptr = 0; ptr < len; ptr += 4) {
      ctx.rect(
        data[ptr] - 1,
        data[ptr + 1] - 1,
        2,
        2
      );
    }
    ctx.fill();
  }

  return { render };
}
