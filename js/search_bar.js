
let perfumes = [];

document.addEventListener("DOMContentLoaded", async () => {
  // Carico i dati dal JSON
  try {
    const response = await fetch("data/perfumes.json");
    perfumes = await response.json();
  } catch (error) {
    console.error("Errore nel caricamento del file perfumes.json:", error);
    return;
  }

  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  // Event listener sulla barra di ricerca
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    searchResults.innerHTML = "";

    if (!query) {
      searchResults.style.display = "none";
      return;
    }

    // Filtra i profumi per nome o brand
    const filtered = perfumes.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query)
    );

    if (!filtered.length) {
      searchResults.style.display = "none";
      return;
    }

    searchResults.style.display = "block"; // mostra i risultati

    // Mostra i risultati
    filtered.forEach(p => {
      const item = document.createElement("a");
      item.href = `perfume.html?id=${p.id}`;
      item.classList.add("result-item");
      item.innerHTML = `
        <img src="${p.image}" onerror="this.onerror=null;this.src='img/perfume-placeholder.svg';" alt="${p.name}">
        <span>${p.name} -&nbsp;</span>
        <span>${p.brand}</span>
      `;

      // chiude e svuota SOLO quando clicchi un risultato
      item.addEventListener("click", () => {
        searchResults.style.display = "none";
        searchInput.value = ""; 
      });

      searchResults.appendChild(item);
    });
  });

  // chiude il box solo se clicchi fuori (campo non viene svuotato)
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.style.display = "none";
    }
  });
});
