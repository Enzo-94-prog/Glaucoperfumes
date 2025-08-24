
// Funzione per caricare i dati dal JSON
async function loadPerfumes() {
  const response = await fetch("data/perfumes.json");
  return await response.json();
}

// Se siamo nella index.html → mostra lista profumi
if (document.getElementById("perfume-list")) {
  loadPerfumes().then(perfumes => {
    const container = document.getElementById("perfume-list");
    perfumes.forEach(p => {
      container.innerHTML += `
        <div class="perfume-card">
          <img src="${p.image}" alt="${p.name}">
          <h2>${p.name}</h2>
          <p>${p.brand}</p>
          <a href="perfume.html?id=${p.id}">Scopri di più</a>
        </div>
      `;
    });
  });
}

// Se siamo in perfume.html → mostra dettagli profumo
if (document.getElementById("perfume-details")) {
  const params = new URLSearchParams(window.location.search);
  const perfumeId = parseInt(params.get("id"));

  loadPerfumes().then(perfumes => {
    const perfume = perfumes.find(p => p.id === perfumeId);
    const container = document.getElementById("perfume-details");

    if (perfume) {
      container.innerHTML = `
        <h1>${perfume.name}</h1>
        <img src="${perfume.image}" alt="${perfume.name}">
        <p><strong>Marca:</strong> ${perfume.brand}</p>
        <p><strong>Categoria:</strong> ${perfume.category}</p>
        <p><strong>Note:</strong> ${perfume.notes}</p>
        <p><strong>Prezzo:</strong> ${perfume.price}</p>
        <p>${perfume.description}</p>
      `;
    } else {
      container.innerHTML = "<p>Profumo non trovato.</p>";
    }
  });
}
