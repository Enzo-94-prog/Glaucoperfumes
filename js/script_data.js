
// Funzione per caricare i dati dal JSON
async function loadPerfumes() {
  const response = await fetch("data/perfumes.json");
  return await response.json();
}

/* --------------------------------------------------------------------- */

// Se siamo nella index.html -> mostra lista profumi
if (document.getElementById("perfume-list")) {
  loadPerfumes().then(perfumes => {
    const container = document.getElementById("perfume-list");
    perfumes.forEach(p => {
      container.innerHTML += `
        <a href="perfume.html?id=${p.id}" class="perfume-card"> 
          <div>
            <img src="${p.image}" onerror="this.onerror=null;this.src='img/perfume-placeholder.svg';" alt="${p.name}" class="perfume-image">
            <h2 class="perfume-title">${p.name}</h2>
            <p class="perfume-meta">${p.brand}</p>
          </div>
        </a>
      `;
    });
  });
}

/* --------------------------------------------------------------------- */

// Se siamo in perfume.html -> mostra dettagli profumo
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
        <img src="${perfume.image}" onerror="this.onerror=null;this.src='img/perfume-placeholder.svg';" alt="${perfume.name}">
        <p><strong>Marca:</strong> ${perfume.brand}</p> 
        <p><strong>Categoria:</strong> ${perfume.category}</p>
        <p><strong>Note:</strong> ${perfume.notes}</p>
        <p><strong>Prezzo:</strong> ${perfume.price}</p>
        <p>${perfume.description}</p>
      </div>
    `;

    // Gestione videorecensione
    let videoLinkNotEmbedded = "";
    let videoLink = ""; // conterrà il link corretto per l'incorporamento

    if (videoContainer && perfume.video_review) {
      videoLinkNotEmbedded = perfume.video_review;
      videoLink = YoutubeUrlToEmbed(videoLinkNotEmbedded);
    
      if (videoLink) { // controlla che sia un URL valido
        const iframe = document.createElement("iframe");
        iframe.src = videoLink;
        iframe.title = "Video recensione di " + perfume.name;
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        videoContainer.appendChild(iframe);
      } else {
        console.warn("URL video non valido:", videoLinkNotEmbedded);
      }
    }

    // Popolo la descrizione
    if (descriptionContainer) {
      descriptionContainer.innerHTML = `
        <h1>Descrizione</h1>
        <h2>${perfume.detailed_description}</h2>
        <p><strong>Note di Apertura:</strong></p><li>${perfume.top_notes}</li>
        <p><strong>Note Centrali:</strong></p><li>${perfume.middle_notes}</li>
        <p><strong>Note di Base:</strong></p><li>${perfume.base_notes}</li>
        <br>
        <p><strong> CARATTERISTICHE </strong>
        <p><strong>Genere:</strong> ${perfume.genre}</p>
        <p><strong>Durata:</strong> ${perfume.longevity}</p>
        <p><strong>Proiezione:</strong> ${perfume.projection}</p>
        <p><strong>Stagione:</strong> ${perfume.season}</p>
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

// Se siamo in perfume.html -> lista profumi sotto la descrizione
if (document.getElementById("perfume-list-related")) {

  const params = new URLSearchParams(window.location.search);
  const perfumeId = parseInt(params.get("id"));

  loadPerfumes().then(perfumes => {

    const container = document.getElementById("perfume-list-related");

    perfumes
      .filter(p => p.id !== perfumeId) // esclude il profumo attuale
      .forEach(p => {

        container.innerHTML += `
          <a href="perfume.html?id=${p.id}" class="perfume-list-card">
            <div>
              <img src="${p.image}" 
                   onerror="this.onerror=null;this.src='img/perfume-placeholder.svg';"
                   alt="${p.name}"
                   class="perfume-list-image">

              <h2 class="perfume-list-title">${p.name}</h2>
              <p class="perfume-list-meta">${p.brand}</p>
            </div>
          </a>
        `;

      });

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
// Converte un url youtube in url embed
function YoutubeUrlToEmbed (url) {
  try {
    const newUrl = new URL(url);  /* "new URL(url)" genera un oggetto con: 
                                        u.hostname => "youtu.be"
                                        u.pathname => "/7AhtYg_QwjM"
                                        u.searchParams => {}  // nessun parametro */
    let videoId = null;

    // URL corto: youtu.be/ID
    if (newUrl.hostname === "youtu.be") { // newUrl.hostname => "youtu.be"
      videoId = newUrl.pathname.slice(1); /* rimuove lo slash iniziale "(slice(1))" 
                                             e memorizza l'ID in videoId */
    }

    // URL standard: youtube.com/watch?v=ID
    if (newUrl.hostname.includes("youtube.com")) {  /* includes("youtube.com") verifica 
                                                       se hostname (youtube.com in questo caso) 
                                                       contiene la stringa "youtube.com" */
                                                    
      videoId = newUrl.searchParams.get("v");  /* newUrl.searchParams è un oggetto nativo di 
                                                  JavaScript che rappresenta i parametri 
                                                  della query string dell’URL, ovvero la 
                                                  parte dell'url che segue "?".
                                                  Esempio: "https://www.youtube.com/watch?v=7AhtYg_QwjM&t=10"
                                                            "v" e "t" sono i parametri della query string,
                                                            newUrl.searchParams.get("v") cerca il parametro v
                                                            e restituisce il suo valore:
                                                            newUrl.searchParams.get("v") => 7AhtYg_QwjM    */
    }

    // URL shorts: youtube.com/short/ID
    if(newUrl.hostname.includes("youtube.com") && newUrl.pathname.startsWith("/shorts/")) {
      videoId = newUrl.pathname.split("/")[2];
    }

    if (!videoId) return null; // se non viene trovato l'ID

    return `https://www.youtube.com/embed/${videoId}`;

  } catch (err) {
    console.error("URL non valido:", err);
    
    return null;
  }
}
