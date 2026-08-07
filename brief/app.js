
const slides = [...document.querySelectorAll('.slide')];
let index = 0;
const counter = document.getElementById('counter');
const progress = document.getElementById('pageProgress').firstElementChild;

function show(next) {
  index = (next + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
  counter.textContent = `${index + 1} / ${slides.length}`;
  progress.style.width = `${((index + 1) / slides.length) * 100}%`;
  history.replaceState(null, '', `#${index + 1}`);
  document.title = `${index + 1}. ${slides[index].dataset.title} - Tóm tắt đề án`;
}
document.getElementById('prev').onclick = () => show(index - 1);
document.getElementById('next').onclick = () => show(index + 1);
document.getElementById('fullscreen').onclick = () =>
  document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();

addEventListener('keydown', e => {
  if (['ArrowRight','PageDown',' '].includes(e.key)) { e.preventDefault(); show(index + 1); }
  if (['ArrowLeft','PageUp'].includes(e.key)) { e.preventDefault(); show(index - 1); }
  if (e.key === 'Home') show(0);
  if (e.key === 'End') show(slides.length - 1);
  if (e.key.toLowerCase() === 'f') document.getElementById('fullscreen').click();
});
const initial = Math.max(0, Math.min((parseInt(location.hash.slice(1)) || 1) - 1, slides.length - 1));
show(initial);
