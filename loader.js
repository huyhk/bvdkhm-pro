const SECTION_FILES = [
  "sections/01-gioi-thieu-de-an.html",
  "sections/02-boi-canh-va-co-hoi.html",
  "sections/03-dinh-huong-giai-phap.html",
  "sections/04-trai-nghiem-theo-doi-tuong.html",
  "sections/05-ung-dung-tri-tue-nhan-tao.html",
  "sections/06-chi-tiet-giai-phap.html",
  "sections/07-gia-tri-va-lo-trinh.html"
];

async function loadPresentation() {
  const deck = document.getElementById("deck");

  try {
    const fragments = await Promise.all(
      SECTION_FILES.map(async (url) => {
        const response = await fetch(url, { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Không tải được ${url} (${response.status})`);
        }
        return response.text();
      })
    );

    deck.innerHTML = fragments.join("\n");

    const appScript = document.createElement("script");
    appScript.src = "app.js";
    appScript.defer = false;
    appScript.onload = () => document.documentElement.classList.add("presentation-ready");
    appScript.onerror = () => showLoadError(new Error("Không tải được app.js"));
    document.body.appendChild(appScript);
  } catch (error) {
    showLoadError(error);
  }
}

function showLoadError(error) {
  console.error(error);
  const deck = document.getElementById("deck");
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
