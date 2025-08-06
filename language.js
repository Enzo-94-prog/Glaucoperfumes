
/* Oggetto contenente le traduzioni dei testi per le lingue supportate (inglese e olandese) */
const languageTexts = {
    
    /* Traduzioni in inglese (codice lingua: 'en')*/
    en: {
        intro: "Choosing a perfume is like choosing an emotion to wear every day.",
        
        /* Titoli dinamici dei report in lingua inglese, generati in base all'array 'reports' */
        titles: reports.map(r => `Fairphone's Impact Report of ${r.year}`),
    
        /* Etichette della barra di navigazione in inglese */
        nav: {
            logo: "fairphone",
            shop: "Shop",
            about: "About",
            stories: "Fairphone Stories",
            club: "Keep Club",
            business: "Business",
            support: "Support"
        },
    
        /* Titolo principale della pagina */
        header: "Fairphone Sustainability Reports"  
  },

    it: {
        intro: "Scegliere un profumo è come scegliere un'emozione da indossare ogni giorno.",
        
        titles: reports.map(r => `Rapporto di impatto di Fairphone dell'anno ${r.year}`),
       
        nav: {
            logo: "fairphone",
            shop: "Shop",
            about: "Cosa dicono di noi",
            stories: "Storie",
            club: "Keep Club",
            business: "Lavori",
            support: "Supporto"
        },
        
        header: "Report di sostenibilità di Fairphone"
    }
};



/* Seleziona il menu a tendina per il cambio lingua */
const switcher = document.getElementById('language-switcher');

/* Seleziona il paragrafo introduttivo da aggiornare */
const introParagraph = document.querySelector('.intro p');

/* Seleziona il titolo principale della pagina */
const pageTitle = document.getElementById('page-title');


/* Aggiunge un listener per il cambiamento di lingua (quando l'utente seleziona una lingua 
   diversa) */
switcher.addEventListener('change', (e) => {
  const lang = e.target.value;        /* Ottiene il valore selezionato (es. "en" o "nl") */
  const texts = languageTexts[lang];  /* Accede ai testi corrispondenti alla lingua selezionata */

  /* Aggiorna il testo introduttivo con quello della nuova lingua */
  introParagraph.textContent = texts.intro;

  /* Aggiorna i titoli dei report già presenti nella pagina */
  document.querySelectorAll('.report-card').forEach((card, i) => {
    card.querySelector('.report-title').textContent = texts.titles[i];
  });

  /* Aggiorna il titolo principale della pagina */
  pageTitle.textContent = texts.header;

  /* Aggiorna le voci della navbar (es. Shop) usando i data-key per associare i testi giusti */
  document.querySelectorAll('.nav-item').forEach(el => {
    const key = el.getAttribute('data-key');  /* es. "shop", "about", ecc. */
    el.textContent = texts.nav[key];          /* Sostituisce il testo con la traduzione corrispondente */
  });

  /* Aggiorna il logo testuale avendo previsto un cambiamento tra lingue */
  document.getElementById('navbar-logo').textContent = texts.nav.logo;
});