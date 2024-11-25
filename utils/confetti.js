import confetti from 'canvas-confetti';

const defaults = {
  spread: 360,
  ticks: 100,
  gravity: 0.5,
  decay: 0.94,
  startVelocity: 30,
  shapes: ['star'],
  colors: ['#198754', '#0d6efd', '#ffc107', '#0dcaf0', '#20c997']
};

const shoot = () => {
  confetti({
    ...defaults,
    particleCount: 100,
    scalar: 1.2,
    shapes: ['star']
  });

  confetti({
    ...defaults,
    particleCount: 100,
    scalar: 0.75,
    shapes: ['circle']
  });
};

const triggerConfetti = () => {
  setTimeout(shoot, 0);
  setTimeout(shoot, 200);
  setTimeout(shoot, 400);
  confetti({
    particleCount: 50,
    angle: 60,
    spread: 100,
    origin: { x: 0, y: 0.65 }
  });

  confetti({
    particleCount: 50,
    angle: 120,
    spread: 100,
    origin: { x: 1, y: 0.65 }
  });
};

export default triggerConfetti;
