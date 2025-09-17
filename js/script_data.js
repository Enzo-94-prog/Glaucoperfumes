
// Funzione per caricare i dati dal JSON
async function loadPerfumes() {
  const response = await fetch("data/perfumes.json");
  return await response.json();
}

/* --------------------------------------------------------------------- */

// Se siamo nella index.html → mostra lista profumi
if (document.getElementById("perfume-list")) {
  loadPerfumes().then(perfumes => {
    const container = document.getElementById("perfume-list");
    perfumes.forEach(p => {
      container.innerHTML += `
        <a href="perfume.html?id=${p.id}" class="perfume-card"> 
          <div>
            <img src="${p.image}" alt="${p.name}" class="perfume-image">
            <h2 class="perfume-title">${p.name}</h2>
            <p class="perfume-meta">${p.brand}</p>
          </div>
        </a>
      `;
    });
  });
}

/* --------------------------------------------------------------------- */

// Se siamo in perfume.html → mostra dettagli profumo
if (document.getElementById("perfume-card")) {
  const params = new URLSearchParams(window.location.search);
  const perfumeId = parseInt(params.get("id"));

  loadPerfumes().then(perfumes => {
    const perfume = perfumes.find(p => p.id === perfumeId);
    const container = document.getElementById("perfume-card");
    const videoContainer = document.getElementById("video-container"); 
    const descriptionContainer = document.getElementById("perfume-details");

    if (!perfume) return;

    // Popolo i dati principali del profumo
    container.innerHTML = `
      <div class="perfume-card">
        <h1>${perfume.name}</h1>
        <img src="${perfume.image}" alt="${perfume.name}">
        <p><strong>Marca:</strong> ${perfume.brand}</p> 
        <p><strong>Categoria:</strong> ${perfume.category}</p>
        <p><strong>Note:</strong> ${perfume.notes}</p>
        <p><strong>Prezzo:</strong> ${perfume.price}</p>
        <p>${perfume.description}</p>
      </div>
    `;

    // Gestione video
    let videoLink = "";
    let videoLinkNotEmbedded = "";
    if (videoContainer && perfume.video_review) {
      videoLink = perfume.video_review;
      videoLinkNotEmbedded = embedToYoutubeUrl(videoLink);
      const iframe = document.createElement("iframe");
      iframe.src = videoLink;
      iframe.title = "Video recensione di " + perfume.name;
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      videoContainer.appendChild(iframe);
    }

    // Popolo la descrizione
    if (descriptionContainer) {
      descriptionContainer.innerHTML = `
        <h1>Descrizione</h1>
        <h2>${perfume.detailed_description}</h2>
        <div class="perfume-details">
          <p><strong>Note di Apertura:</strong></p><li>${perfume.top_notes}</li>
          <p><strong>Note Centrali:</strong></p><li>${perfume.middle_notes}</li>
          <p><strong>Note di Base:</strong></p><li>${perfume.base_notes}</li>
          <br>
          <p><strong> CARATTERISTICHE </strong>
          <p><strong>Genere:</strong> ${perfume.genre}</p>
          <p><strong>Durata:</strong> ${perfume.longevity}</p>
          <p><strong>Proiezione:</strong> ${perfume.projection}</p>
          <p><strong>Stagione:</strong> ${perfume.season}</p>
        </div>
      `;

      // Creo il pulsante share
      const shareButton = document.createElement("div");
      shareButton.classList.add("share-button");

      // Nodo di testo
      const textNode = document.createTextNode("Condividi Recensione");

      // Icona
      const imageButton = document.createElement("img");
      imageButton.src = "img/share-button.png";
      imageButton.alt = "Condividi";
      imageButton.classList.add("share-icon-button");

      // Testo prima, immagine dopo
      shareButton.appendChild(textNode);
      shareButton.appendChild(imageButton);

      // Inserisco tra video e descrizione
      descriptionContainer.parentNode.insertBefore(shareButton, descriptionContainer);

      // Click handler per copiare dati
      shareButton.addEventListener("click", async () => {
        const textToCopy = `${perfume.name} - ${perfume.brand}\n\nVideo: ${videoLinkNotEmbedded}\n\nLink al sito: ${window.location.href}`;
        try {
          await navigator.clipboard.writeText(textToCopy);
          showToast("Dati copiati negli appunti!");
        } catch (err) {
          console.error("Errore copia dati:", err);
          showToast("Impossibile copiare i dati.");
        }
      });
    }
  });
}

/* --------------------------------------------------------------------- */
// Funzione toast 
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* --------------------------------------------------------------------- */
// Converte youtube embed in link classico
function embedToYoutubeUrl(embedUrl) {
  try {
    const url = new URL(embedUrl);
    if (!url.hostname.includes("youtube.com")) return embedUrl;
    const pathParts = url.pathname.split("/");
    const videoId = pathParts[pathParts.length - 1];
    return `https://www.youtube.com/watch?v=${videoId}`;
  } catch (err) {
    console.error("Errore conversione URL YouTube:", err);
    return embedUrl;
  }
}
