import { initPhysics } from './js-c2d/physics.js';
import { initRenderer } from './js-c2d/renderer.js';

async function main() {
  const canvas = document.querySelector('canvas');
  const countInput = document.querySelector('#count');
  const fpsInput = document.querySelector('#fps');

  let particlesCount;
  let canvasWidth;
  let canvasHeight;

  const { getData, tick, fire } = await initPhysics();
  const { render } = await initRenderer(canvas);

  {
    const resizeHandler = () => {
      canvasWidth = canvas.clientWidth;
      canvasHeight = canvas.clientHeight;
    }

    window.addEventListener('resize', resizeHandler);
    resizeHandler();
  }

  {
    const inputHandler = () => {
      const inputValue = Math.trunc(countInput.value);
      if (inputValue > 0) {
        particlesCount = inputValue;
      }
    }
    countInput.addEventListener('input', inputHandler);
    inputHandler();
  }

  {
    const clickHandler = (e) => {
      fire(e.offsetX - canvas.clientWidth / 2, e.offsetY - canvas.clientHeight / 2);
    }

    canvas.addEventListener('click', clickHandler);
  }

  {
    let lastTs = 0;
    let framesDrawn = 0;

    const frame = (timestamp) => {
      requestAnimationFrame(frame);

      tick(particlesCount);
      render(getData(), particlesCount, canvasWidth, canvasHeight);

      framesDrawn++;
      if (timestamp > lastTs + 2000) {
        fpsInput.value = (1000 * framesDrawn / (timestamp - lastTs)).toFixed(1) + ' FPS';
        lastTs = timestamp;
        framesDrawn = 0;
      }
    }
    frame();
  }
};

main();
