
// Variabile globale per salvare i profumi caricati
let perfumes = [];

// Carica i dati dal JSON ma non mostra nulla subito
async function loadPerfumes() {
  try {
    const response = await fetch("data/perfumes.json");
    perfumes = await response.json();
  } catch (error) {
    console.error("Errore nel caricamento del JSON:", error);
  }
}

// Funzione per creare e mostrare le card
function renderPerfumes(list) {
  const container = document.getElementById("cards-container");
  container.innerHTML = ""; // pulisce prima

  if (list.length === 0) {
    container.innerHTML = `<p class="no-results">Nessun profumo trovato</p>`;
    return;
  }

  list.forEach(perfume => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${perfume.immagine || 'img/default.jpg'}" alt="${perfume.nome}" class="card-img">
      <h2>${perfume.nome}</h2>
      <p>${perfume.descrizione}</p>
    `;
    container.appendChild(card);
  });
}

// Inizializza tutto quando il DOM è pronto
window.addEventListener("DOMContentLoaded", async () => {
  await loadPerfumes(); // carico il JSON ma non mostro nulla

  const searchInput = document.getElementById("search");

  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase().trim();

    if (query === "") {
      document.getElementById("cards-container").innerHTML = ""; // svuota se non c’è testo
      return;
    }

    const filtered = perfumes.filter(perfume =>
      perfume.nome.toLowerCase().includes(query)
    );

    renderPerfumes(filtered);
  });
});
