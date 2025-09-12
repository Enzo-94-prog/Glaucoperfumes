
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

    searchResults.style.display = "block"; // il div appare visibile

    // Mostra i risultati
    filtered.forEach(p => {
      const item = document.createElement("a"); //crea un elemento a(link)
      item.href = `perfume.html?id=${p.id}`;  // collegamento alla pagina
      item.classList.add("result-item");
      item.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <span>${p.name} -&nbsp;</span>
        <span>${p.brand}</span>
      `;
      searchResults.appendChild(item);
    });
  });
});
