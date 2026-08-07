const slides=[...document.querySelectorAll('.slide')];
const counter=document.getElementById('counter');
const progress=document.getElementById('progressBar');
const toc=document.getElementById('toc');
const tocList=document.getElementById('tocList');
let current=0;

slides.forEach((slide,i)=>{
  const b=document.createElement('button');
  b.type='button';
  b.textContent=`${String(i+1).padStart(2,'0')}  ${slide.dataset.title}`;
  if(slide.classList.contains('chapter')) b.classList.add('chapter-link');
  b.onclick=()=>{show(i);toc.classList.remove('open')};
  tocList.appendChild(b);
});

function show(i, hash=true){
  if(!slides.length) return;
  current=(i+slides.length)%slides.length;
  slides.forEach((s,n)=>s.classList.toggle('active',n===current));
  [...tocList.children].forEach((b,n)=>b.classList.toggle('active',n===current));
  counter.textContent=`${current+1} / ${slides.length}`;
  progress.style.width=`${((current+1)/slides.length)*100}%`;
  document.title=`${current+1}. ${slides[current].dataset.title} — Đề án v2`;
  if(hash) history.replaceState(null,'',`#${current+1}`);
}

document.getElementById('prev').onclick=()=>show(current-1);
document.getElementById('next').onclick=()=>show(current+1);
document.getElementById('tocBtn').onclick=()=>toc.classList.toggle('open');
document.getElementById('closeToc').onclick=()=>toc.classList.remove('open');
document.getElementById('fullscreen').onclick=()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();

addEventListener('keydown',e=>{
  if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();show(current+1)}
  if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();show(current-1)}
  if(e.key==='Home') show(0);
  if(e.key==='End') show(slides.length-1);
  if(e.key.toLowerCase()==='m') toc.classList.toggle('open');
  if(e.key.toLowerCase()==='f') document.getElementById('fullscreen').click();
  if(e.key==='Escape') toc.classList.remove('open');
});

const start=Math.max(0,Math.min((parseInt(location.hash.slice(1))||1)-1,slides.length-1));
show(start,false);
