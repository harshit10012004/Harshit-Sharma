import anime from 'animejs/lib/anime.es.js';

document.addEventListener('DOMContentLoaded', () => {
  anime({
    targets: '.exp-card',
    opacity: [0, 1],
    translateX: [-20, 0],
    easing: 'easeOutQuad',
    duration: 800,
    delay: anime.stagger(200)
  });
});