async function loadDeck(){
  const deck = document.getElementById('deck');
  try{
    const res = await fetch('sections/manifest.json?v=2.0-m3', {cache:'no-store'});
    if(!res.ok) throw new Error('Không tải được manifest');
    const manifest = await res.json();

    const fragments = await Promise.all(manifest.map(async item => {
      const r = await fetch(item.file + '?v=2.0-m3', {cache:'no-store'});
      if(!r.ok) throw new Error('Không tải được ' + item.file);
      return r.text();
    }));

    deck.innerHTML = fragments.join('\n');
    const s = document.createElement('script');
    s.src = 'app.js?v=2.0-m3';
    document.body.appendChild(s);
  }catch(err){
    deck.innerHTML = `<section class="load-error"><strong>Không thể tải Đề án v2</strong><p>${err.message}</p><small>Hãy chạy preview.bat hoặc mở qua web server.</small></section>`;
  }
}
loadDeck();
