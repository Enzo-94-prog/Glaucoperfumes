
document.addEventListener('DOMContentLoaded', () => {

    const caroselloContainer = document.getElementById('carosello-container');
    const carosello = caroselloContainer.querySelector('.carosello');
    const btnNext = caroselloContainer.querySelector('.next');
    const btnPrev = caroselloContainer.querySelector('.prev');

    let posizione = 0;
    let itemWidth = 0;

    // Carica i profumi dal JSON
    fetch('data/perfumes.json')
        .then(response => response.json())
        .then(data => {
            console.log('Dati caricati:', data); // debug

            // Prendi gli ultimi 10 profumi
            const ultimiProfumi = data.slice(-10).reverse();

            ultimiProfumi.forEach(profumo => {
                const item = document.createElement('div');
                item.className = 'carosello-item';
                item.innerHTML = `
                    <img src="${profumo.image}" alt="${profumo.name}">
                    <p>${profumo.name}</p>
                `;
                carosello.appendChild(item);
            });

            // Aggiorna la larghezza di una card per lo scroll
            const firstItem = carosello.querySelector('.carosello-item');
            itemWidth = firstItem.offsetWidth + 20; // include margin
        })
        .catch(err => console.error('Errore nel fetch JSON:', err));

    // Navigazione avanti
    btnNext.addEventListener('click', () => {
        if (!itemWidth) return; // attendi che i dati siano caricati
        const maxScroll = carosello.scrollWidth - caroselloContainer.querySelector('.carosello-wrapper').offsetWidth;
        if (-posizione < maxScroll) {
            posizione -= itemWidth;
            if (-posizione > maxScroll) posizione = -maxScroll;
            carosello.style.transform = `translateX(${posizione}px)`;
        }
    });

    // Navigazione indietro
    btnPrev.addEventListener('click', () => {
        if (!itemWidth) return;
        if (posizione < 0) {
            posizione += itemWidth;
            if (posizione > 0) posizione = 0;
            carosello.style.transform = `translateX(${posizione}px)`;
        }
    });

});
