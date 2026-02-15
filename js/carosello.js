// Funzione per caricare i dati dal JSON
async function loadPerfumes() {
  const response = await fetch("data/perfumes.json");
  return await response.json();
}

if (document.getElementById("carosello-container")) {
  loadPerfumes().then(async perfumes => {
    const carosello = document.querySelector(".carosello");
    if (!carosello) {
      console.error("Carosello non trovato!");
      return;
    }

    const lastPerfumes = perfumes.slice(-10).reverse();

    // --- Preload immagini ---
    await Promise.all(lastPerfumes.map(p => {
      return new Promise(resolve => {
        const img = new Image();
        img.src = p.image;
        img.onload = resolve;
        img.onerror = () => { img.src = 'img/perfume-placeholder.svg'; resolve(); }; // fallback se l'immagine manca
      });
    }));

    // --- Inserisci card ---
    lastPerfumes.forEach(p => {
      const item = document.createElement("a");
      item.classList.add("carosello-item");
      item.href = `perfume.html?id=${p.id}`;
      item.innerHTML = `
        <img src="${p.image}" onerror="this.onerror=null;this.src='img/perfume-placeholder.svg';" alt="${p.name}">
        <p>${p.name}</p>
        <div class="carosello-meta">${p.brand}</div>
      `;
      carosello.appendChild(item);
    });

    // --- Cloni per loop infinito ---
    const items = Array.from(carosello.children);
    const cloneCount = Math.min(3, items.length); // evita problemi se poche card

    // Cloni iniziali
    for (let i = items.length - cloneCount; i < items.length; i++) {
      const clone = items[i].cloneNode(true);
      clone.classList.add("clone");
      carosello.insertBefore(clone, carosello.firstChild);
    }

    // Cloni finali
    for (let i = 0; i < cloneCount; i++) {
      const clone = items[i].cloneNode(true);
      clone.classList.add("clone");
      carosello.appendChild(clone);
    }

    const allItems = Array.from(carosello.children);

    // --- Calcola dinamicamente la larghezza della card + gap ---
    const itemStyle = getComputedStyle(allItems[0]);
    const itemWidth = allItems[0].offsetWidth + parseInt(itemStyle.marginRight);

    let currentIndex = cloneCount;
    carosello.style.transform = `translateX(${-currentIndex * itemWidth}px)`;

    // Funzione di aggiornamento
    function updateCarousel(transition = true) {
      carosello.style.transition = transition ? "transform 0.5s linear" : "none";
      carosello.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
    }

    // --- Autoplay ---
    let interval = setInterval(() => {
      currentIndex++;
      updateCarousel();
    }, 3000);

    // --- Loop infinito ---
    carosello.addEventListener("transitionend", () => {
      if (currentIndex >= allItems.length - cloneCount) {
        currentIndex = cloneCount;
        updateCarousel(false);
      } else if (currentIndex < cloneCount) {
        currentIndex = allItems.length - cloneCount * 2;
        updateCarousel(false);
      }
    });



    /*
    // --- Swipe / Drag ---
    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;

    const stopAutoplay = () => clearInterval(interval);
    const restartAutoplay = () => interval = setInterval(() => { currentIndex++; updateCarousel(); }, 3000);

    const dragStart = (x) => { 
      isDragging = true; 
      startX = x; 
      scrollStart = -currentIndex * itemWidth; 
      stopAutoplay(); 
    };
    const dragMove = (x) => { 
      if(!isDragging) return; 
      const dx = x - startX; 
      carosello.style.transition = "none"; 
      carosello.style.transform = `translateX(${scrollStart + dx}px)`; 
    };
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

    */

  });

  
}
