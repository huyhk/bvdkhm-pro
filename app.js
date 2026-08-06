const slides = [...document.querySelectorAll('.slide')];
let currentIndex = 0;

const counter = document.getElementById('counter');
const progress = document.getElementById('progressBar');
const notesPanel = document.getElementById('notesPanel');
const notesText = document.getElementById('notesText');
const toc = document.getElementById('toc');
const tocList = document.getElementById('tocList');

function isEditableTarget(target) {
  return target instanceof HTMLElement &&
    (target.matches('input, textarea, select, button, a, [contenteditable="true"]'));
}

slides.forEach((slide, index) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = `${String(index + 1).padStart(2, '0')}  ${slide.dataset.title}`;

  if (slide.classList.contains('chapter-opener')) {
    button.classList.add('chapter-item');
  }

  button.onclick = () => {
    show(index);
    toc.classList.remove('open');
  };

  tocList.appendChild(button);
});

function show(index, updateHash = true) {
  if (!slides.length) return;

  currentIndex = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    const active = slideIndex === currentIndex;
    slide.classList.toggle('active', active);
    slide.setAttribute('aria-hidden', String(!active));
  });

  counter.textContent = `${currentIndex + 1} / ${slides.length}`;
  progress.style.width = `${((currentIndex + 1) / slides.length) * 100}%`;
  document.title = `${currentIndex + 1}. ${slides[currentIndex].dataset.title} — BVĐK Hóc Môn`;
  notesText.textContent = slides[currentIndex].dataset.note || 'Chưa có ghi chú cho phần này.';

  [...tocList.children].forEach((button, buttonIndex) => {
    button.classList.toggle('active', buttonIndex === currentIndex);
  });

  if (updateHash) {
    history.replaceState(null, '', `#${currentIndex + 1}`);
  }
}

async function toggleFullscreen() {
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen?.();
    } else {
      await document.documentElement.requestFullscreen?.();
    }
  } catch (error) {
    console.warn('Không thể chuyển chế độ toàn màn hình.', error);
  }
}

document.getElementById('next').onclick = () => show(currentIndex + 1);
document.getElementById('prev').onclick = () => show(currentIndex - 1);
document.getElementById('fullscreen').onclick = toggleFullscreen;
document.getElementById('notesBtn').onclick = () => notesPanel.classList.toggle('open');
document.getElementById('closeNotes').onclick = () => notesPanel.classList.remove('open');
document.getElementById('tocBtn').onclick = () => toc.classList.toggle('open');
document.getElementById('closeToc').onclick = () => toc.classList.remove('open');

addEventListener('keydown', event => {
  if (isEditableTarget(event.target)) return;

  if (['ArrowRight', 'PageDown', ' '].includes(event.key)) {
    event.preventDefault();
    show(currentIndex + 1);
  }

  if (['ArrowLeft', 'PageUp'].includes(event.key)) {
    event.preventDefault();
    show(currentIndex - 1);
  }

  if (event.key === 'Home') show(0);
  if (event.key === 'End') show(slides.length - 1);
  if (event.key.toLowerCase() === 'f') toggleFullscreen();
  if (event.key.toLowerCase() === 'p') window.print();
  if (event.key.toLowerCase() === 'n') notesPanel.classList.toggle('open');
  if (event.key.toLowerCase() === 'm') toc.classList.toggle('open');

  if (event.key === 'Escape') {
    notesPanel.classList.remove('open');
    toc.classList.remove('open');
  }
});

addEventListener('hashchange', () => {
  const hashIndex = (parseInt(location.hash.slice(1), 10) || 1) - 1;
  show(Math.max(0, Math.min(hashIndex, slides.length - 1)), false);
});

const initialIndex = (parseInt(location.hash.slice(1), 10) || 1) - 1;
show(Math.max(0, Math.min(initialIndex, slides.length - 1)));
