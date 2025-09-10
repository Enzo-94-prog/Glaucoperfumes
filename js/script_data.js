
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
        <div class="perfume-card">

          <a href="perfume.html?id=${p.id}">
            <img src="${p.image}" alt="${p.name}" class="perfume-image">
          </a>
          
          <h2 class="perfume-title">${p.name}</h2>
          <p class="perfume-meta">${p.brand}</p>
    
        </div>
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

    if (perfume) {
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


      // Crea dinamicamente l'elemento <iframe> nel contenitore responsivo
      if (videoContainer && perfume.video_review) {

        const iframe = document.createElement("iframe");

        iframe.src = perfume.video_review;
        iframe.title = "Video recensione di " + perfume.name;
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;

        videoContainer.appendChild(iframe);
      }


    } 
  });
}
