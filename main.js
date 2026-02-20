import './style.css';
import anime from 'animejs';

document.addEventListener('DOMContentLoaded', () => {
  const stats = {
    projects: 12,
    years: 8,
    laptime: 1.2,
    champs: 3
  };

  anime({
    targets: { value: 0 },
    value: stats.projects,
    round: 1,
    easing: 'easeOutQuad',
    duration: 2000,
    delay: 500,
    update: (anim) => {
      document.getElementById('projects-counter').innerText = anim.animations[0].currentValue;
    }
  });

  anime({
    targets: { value: 0 },
    value: stats.years,
    round: 1,
    easing: 'easeOutQuad',
    duration: 2000,
    delay: 600,
    update: (anim) => {
      document.getElementById('years-counter').innerText = anim.animations[0].currentValue;
    }
  });

  anime({
    targets: { value: 0 },
    value: stats.laptime,
    rounding: 0.1,
    easing: 'easeOutQuad',
    duration: 2000,
    delay: 700,
    update: (anim) => {
      document.getElementById('laptime-counter').innerText = anim.animations[0].currentValue.toFixed(1);
    }
  });

  anime({
    targets: { value: 0 },
    value: stats.champs,
    round: 1,
    easing: 'easeOutQuad',
    duration: 2000,
    delay: 800,
    update: (anim) => {
      document.getElementById('champs-counter').innerText = anim.animations[0].currentValue;
    }
  });
});