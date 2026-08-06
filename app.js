const slides=[...document.querySelectorAll('.slide')];
let i=0;
const counter=document.getElementById('counter');
const progress=document.getElementById('progressBar');
const notesPanel=document.getElementById('notesPanel');
const notesText=document.getElementById('notesText');
const toc=document.getElementById('toc');
const tocList=document.getElementById('tocList');
slides.forEach((s,k)=>{
  const b=document.createElement('button');
  b.textContent=`${String(k+1).padStart(2,'0')}  ${s.dataset.title}`;
  b.onclick=()=>{show(k);toc.classList.remove('open')};
  tocList.appendChild(b);
});
function show(n){
  i=(n+slides.length)%slides.length;
  slides.forEach((s,k)=>s.classList.toggle('active',k===i));
  counter.textContent=`${i+1} / ${slides.length}`;
  progress.style.width=`${((i+1)/slides.length)*100}%`;
  document.title=`${i+1}. ${slides[i].dataset.title} — BVĐK Hóc Môn`;
  history.replaceState(null,'',`#${i+1}`);
  notesText.textContent=slides[i].dataset.note||'Chưa có ghi chú cho phần này.';
  [...tocList.children].forEach((b,k)=>b.classList.toggle('active',k===i));
}
document.getElementById('next').onclick=()=>show(i+1);
document.getElementById('prev').onclick=()=>show(i-1);
document.getElementById('fullscreen').onclick=()=>document.documentElement.requestFullscreen?.();
document.getElementById('notesBtn').onclick=()=>notesPanel.classList.toggle('open');
document.getElementById('closeNotes').onclick=()=>notesPanel.classList.remove('open');
document.getElementById('tocBtn').onclick=()=>toc.classList.toggle('open');
document.getElementById('closeToc').onclick=()=>toc.classList.remove('open');
addEventListener('keydown',e=>{
  if(['ArrowRight','PageDown',' '].includes(e.key))show(i+1);
  if(['ArrowLeft','PageUp'].includes(e.key))show(i-1);
  if(e.key==='Home')show(0);
  if(e.key==='End')show(slides.length-1);
  if(e.key.toLowerCase()==='f')document.documentElement.requestFullscreen?.();
  if(e.key.toLowerCase()==='p')window.print();
  if(e.key.toLowerCase()==='n')notesPanel.classList.toggle('open');
  if(e.key.toLowerCase()==='m')toc.classList.toggle('open');
  if(e.key==='Escape'){notesPanel.classList.remove('open');toc.classList.remove('open')}
});
show(Math.max(0,(parseInt(location.hash.slice(1))||1)-1));
