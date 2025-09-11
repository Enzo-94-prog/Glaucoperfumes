
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

    if (perfume) {
      container.innerHTML = `
        <div class="perfume-card">

          <h1>${perfume.name}</h1>
          <img src="${perfume.image}" alt="${perfume.name}">
          <p><strong> Marca: </strong> ${perfume.brand}</p> 
          <p><strong> Categoria: </strong> ${perfume.category}</p>
          <p><strong> Note: </strong> ${perfume.notes}</p>
          <p><strong> Prezzo: </strong> ${perfume.price}</p>
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

      if(descriptionContainer) {

        descriptionContainer.innerHTML = `
        
        <h1> Descrizione </h1>
        <h2> ${perfume.detailed_description} </h2>

        <div class="perfume-details">

          <p><strong> Note di Apertura: </strong></p>
          <li>${perfume.top_notes}</li>
          
          <p><strong> Note Centrali: </strong></p>
          <li>${perfume.middle_notes}</li>
          
          <p><strong> Note di Base: </strong></p>
          <li>${perfume.base_notes}</li>

          <br></br>
          <p><strong> Genere: </strong>${perfume.genre}</p>
          <p><strong> Durata: </strong>${perfume.longevity}</p>
          <p><strong> Proiezione: </strong>${perfume.projection}</p>
          <p><strong> Stagione: </strong>${perfume.season}</p>

         
        </div>


        
        `;
      }
    } 
  });
}
