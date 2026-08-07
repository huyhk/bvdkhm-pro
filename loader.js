async function loadPresentation() {
  const deck = document.getElementById('deck');

  try {
    const manifestResponse = await fetch('sections/manifest.json', { cache: 'no-store' });
    if (!manifestResponse.ok) {
      throw new Error(`Không tải được sections/manifest.json (${manifestResponse.status})`);
    }

    const manifest = await manifestResponse.json();
    const sectionFiles = manifest.map(item => item.file);

    const fragments = await Promise.all(
      sectionFiles.map(async url => {
        const response = await fetch(url, { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`Không tải được ${url} (${response.status})`);
        }
        return response.text();
      })
    );

    deck.innerHTML = fragments.join('\n');

    const appScript = document.createElement('script');
    appScript.src = "app.js?v=2.0-s2";
    appScript.onload = () => document.documentElement.classList.add('presentation-ready');
    appScript.onerror = () => showLoadError(new Error('Không tải được app.js'));
    document.body.appendChild(appScript);
  } catch (error) {
    showLoadError(error);
  }
}

function showLoadError(error) {
  console.error(error);
  const deck = document.getElementById('deck');

  deck.innerHTML = `
    <section class="load-error">
      <div>
        <strong>Không thể tải nội dung trình bày</strong>
        <p>${error.message}</p>
        <small>
          Khi xem trên máy cá nhân, hãy chạy <code>preview.bat</code>
          hoặc mở bằng một web server cục bộ.
        </small>
      </div>
    </section>`;
}

loadPresentation();
