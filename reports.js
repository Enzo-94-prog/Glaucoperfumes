
/* Array di oggetti contenente i report di sostenibilità Fairphone dove ogni oggetto 
   rappresenta un singolo report */
const reports = [
    {
        title: "Fairphone's Impact Report of 2024",         /* Titolo del report */
        link: "documents/Fairphone_Impact-report_2024.pdf", /* Percorso relativo al file PDF */
        year: "2024",                                       /* Anno del report */
        preview: "img/2024_preview.jpg"                     /* Immagine di anteprima del report */
    },
    {
        title: "Fairphone's Impact Report of 2023",
        link: "documents/Fairphone_Impact-report_2023.pdf",
        year: "2023",
        preview: "img/2023_preview.jpg"
    },
    {
        title: "Fairphone's Impact Report of 2022",
        link: "documents/Fairphone_Impact-report_2022.pdf",
        year: "2022",
        preview: "img/2022_preview.jpg"
    },
    {
        title: "Fairphone's Impact Report of 2021",
        link: "documents/Fairphone_Impact-report_2021.pdf",
        year: "2021",
        preview: "img/2021_preview.jpg"
    },
    {
        title: "Fairphone's Impact Report of 2020",
        link: "documents/Fairphone_Impact-report_2020.pdf",
        year: "2020",
        preview: "img/2020_preview.jpg"
    }
];



/* "document.getElementById('reportList')" seleziona dal DOM l’elemento HTML con 
    id "reportList", "container" è l'HTMLelement (oggetto JavaScript) in cui 
    verranno inserite le schede dei report */
const container = document.getElementById('reportList');

/* Itera sull’array dei report per generarne dinamicamente la visualizzazione */
reports.forEach(report => {

    /* Crea un nuovo elemento <div> per rappresentare la card del report */
    const card = document.createElement('div');

    /* Applica una classe CSS per lo stile visivo della card */
    card.className = 'report-card';

    
    /* Viene utilizzata una template string (``) per includere i dati dell’oggetto report 
       anzichè la concatenazione classica con l'operatore "+" */
    
    /* "innerHTML" inserisce all’interno della card il titolo, l’anno e il bottone per il 
        download */
    card.innerHTML = `
        <img src="${report.preview}" alt="Anteprima report ${report.year}" class="report-preview" />
        <div class="report-title"> ${report.title} </div>                        <!-- Titolo del report -->
        <a href="${report.link}" class="download-btn" download="${report.link}">
            Download PDF                                                         <!-- Pulsante di download -->
        </a>
    `;

    // Aggiunge la card completa come figlio del contenitore #reportList nel DOM
    container.appendChild(card);
});