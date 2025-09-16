
// Funzione per caricare i dati dal JSON
async function loadPerfumes() {
  const response = await fetch("data/perfumes.json");
  return await response.json();
}


if (document.getElementById("carosello-container")) {
  loadPerfumes().then(async perfumes => {
    const carosello = document.querySelector(".carosello");
    const lastPerfumes = perfumes.slice(-10).reverse();

    // --- Preload immagini ---
    await Promise.all(lastPerfumes.map(p => {
      return new Promise(resolve => {
        const img = new Image();
        img.src = p.image;
        img.onload = resolve;
      });
    }));

    // --- Inserisci card reali come <a> ---
    lastPerfumes.forEach(p => {
      const item = document.createElement("a");
      item.classList.add("carosello-item");
      item.href = `perfume.html?id=${p.id}`;
      item.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <p>${p.name}</p>
        <div class="carosello-meta">${p.brand}</div>
      `;
      carosello.appendChild(item);
    });

    // --- Cloni multipli per scorrimento continuo ---
    const cloneCount = 3; // numero di card da clonare all'inizio e alla fine
    const items = Array.from(carosello.children);

    // Cloni iniziali (ultime cloneCount card)
    for (let i = items.length - cloneCount; i < items.length; i++) {
      const clone = items[i].cloneNode(true);
      clone.classList.add("clone");
      carosello.insertBefore(clone, carosello.firstChild);
    }

    // Cloni finali (prime cloneCount card)
    for (let i = 0; i < cloneCount; i++) {
      const clone = items[i].cloneNode(true);
      clone.classList.add("clone");
      carosello.appendChild(clone);
    }

    const totalItems = carosello.children.length;
    const itemWidth = 180 + 15; // larghezza card + gap
    let currentIndex = cloneCount; // partiamo dalla prima reale

    // Posizione iniziale
    carosello.style.transform = `translateX(${-currentIndex * itemWidth}px)`;

    // Aggiorna carosello
    function updateCarousel(transition = true) {
      carosello.style.transition = transition ? "transform 0.5s linear" : "none";
      carosello.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
    }

    // --- Autoplay infinito ---
    let interval = setInterval(() => {
      currentIndex++;
      updateCarousel();
    }, 3000);

    // --- Loop infinito senza scatti ---
    carosello.addEventListener("transitionend", () => {
      if (currentIndex >= totalItems - cloneCount) {
        currentIndex = cloneCount;
        updateCarousel(false);
      } else if (currentIndex < cloneCount) {
        currentIndex = totalItems - cloneCount * 2;
        updateCarousel(false);
      }
    });

    // --- Swipe/drag ---
    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;

    const stopAutoplay = () => clearInterval(interval);
    const restartAutoplay = () => interval = setInterval(() => { currentIndex++; updateCarousel(); }, 3000);

    const dragStart = (x) => { isDragging = true; startX = x; scrollStart = -currentIndex * itemWidth; stopAutoplay(); };
    const dragMove = (x) => { if(!isDragging) return; const dx = x - startX; carosello.style.transition="none"; carosello.style.transform = `translateX(${scrollStart + dx}px)`; };
    const dragEnd = (x) => {
      if(!isDragging) return;
      const dx = x - startX;
      if(dx < -50) currentIndex++;
      if(dx > 50) currentIndex--;
      updateCarousel();
      isDragging = false;
      restartAutoplay();
    };

    // Eventi mouse
    carosello.addEventListener("mousedown", e => dragStart(e.pageX));
    carosello.addEventListener("mousemove", e => dragMove(e.pageX));
    carosello.addEventListener("mouseup", e => dragEnd(e.pageX));
    carosello.addEventListener("mouseleave", e => dragEnd(e.pageX));

    // Eventi touch
    carosello.addEventListener("touchstart", e => dragStart(e.touches[0].pageX));
    carosello.addEventListener("touchmove", e => dragMove(e.touches[0].pageX));
    carosello.addEventListener("touchend", e => dragEnd(e.changedTouches[0].pageX));
  });
}
