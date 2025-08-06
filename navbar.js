
/* Seleziona l'icona hamburger */
const hamburger = document.getElementById('hamburger');

/* Seleziona la lista dei link di navigazione */
const navLinks = document.getElementById('navbar-links');

/* Seleziona l'intera barra di navigazione */
const navbar = document.querySelector('.navbar');


/* Gestisce il click sull'hamburger per aprire/chiudere il menu */
hamburger.addEventListener('click', () => {

  /* Alterna la classe 'active' sull'icona hamburger (anima le 3 linee in una X) */
  hamburger.classList.toggle('active');  
  
  /* Mostra o nasconde i link di navigazione */
  navLinks.classList.toggle('active');   
  
  /* Aggiunge o rimuove la classe 'menu-open' per cambiare lo sfondo/blur */
  navbar.classList.toggle('menu-open');       


  /* Se il menu è stato chiuso (quindi non ha più la classe 'menu-open') */
  if (!navbar.classList.contains('menu-open')) {

    /* Forza il repaint per ripristinare correttamente il blur dopo la chiusura del menu */
    navbar.style.display = 'none';
    navbar.offsetHeight;           /* Forza un reflow del layout */
    navbar.style.display = '';
  }

});


/* Aggiunge un listener globale per chiudere il menu cliccando fuori dalla navbar */
document.addEventListener('click', (event) => {

  /* Verifica se il click è avvenuto dentro la navbar */
  const isClickInsideNavbar = navbar.contains(event.target);

  /* Verifica se il click è avvenuto sull'icona hamburger */
  const isClickOnHamburger = hamburger.contains(event.target);

  /* Verifica se il menu è attualmente aperto */
  const isMenuOpen = navbar.classList.contains('menu-open');


/* Se il click è esterno a navbar e hamburger, e il menu è aperto */  
if (!isClickInsideNavbar && !isClickOnHamburger && isMenuOpen) {
    
    /* Chiude il menu rimuovendo tutte le classi attive */
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    navbar.classList.remove('menu-open');


    /* Forza il repaint per riattivare correttamente il blur */
    navbar.style.display = 'none';
    navbar.offsetHeight;
    navbar.style.display = '';
  }

});