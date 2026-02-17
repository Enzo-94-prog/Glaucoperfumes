# Glaucoperfumes
A responsive perfume discovery web application built with HTML, CSS and Vanilla JavaScript.

![Glaucoperfumes preview](preview/social-preview.png)

A front-end web application that simulates a small product catalog website for perfumes.

The project was developed entirely with **HTML, CSS and Vanilla JavaScript**, without frameworks, to demonstrate core front-end development skills: DOM manipulation, dynamic rendering and responsive layout design.

**Live demo**
https://enzo-94-prog.github.io/Glaucoperfumes/

---

## Project Overview

Glaucoperfumes is not a static showcase.
The catalog and product pages are generated dynamically using JavaScript and a local dataset.

The goal was to structure a complete front-end project as if it were connected to a real backend API, focusing on application logic rather than only visual layout.

---

## Preview

<p align="center">
  <img src="docs/home-1.png" alt="Home hero section" width="900">
</p>

<p align="center">
  <img src="docs/home-2.png" alt="Home hero section" width="900">
</p>

---

## Example product page

<p align="center">
  <img src="docs/perfume-1.png" alt="Perfume detail page" width="850">
</p>

<p align="center">
  <img src="docs/perfume-2.png" alt="Olfactory pyramid" width="850">
</p>

<p align="center">
  <img src="docs/perfume-3.png" alt="Video review section" width="850">
</p>

---

## Main Features

* Dynamic catalog rendering from dataset
* Individual product pages
* Search by perfume name
* Olfactory pyramid visualization (top, heart and base notes)
* Embedded video reviews (when available)
* Homepage carousel (featured perfumes)
* Responsive layout (mobile and desktop)

---

## Technologies Used

* **HTML5** — semantic page structure
* **CSS3** — layout organization and responsive design
* **Vanilla JavaScript** — DOM manipulation and interaction logic
* **JSON dataset** — backend simulation

No external libraries or frameworks were used intentionally in order to work directly with browser APIs.

---

## What I Learned

During this project I improved my ability to:

* design a multi-page website from scratch
* separate structure, styling and logic
* dynamically update the DOM
* organize a maintainable codebase
* simulate how a front-end consumes backend data
* manage responsive behaviour across devices

---

## How to Run Locally

You can run the project with any static server.

### VS Code (recommended)

Open the folder → right click `index.html` → **Open with Live Server**

### Python

```bash
python -m http.server 8000
```

Then open:
http://localhost:8000

---

# Technical Documentation

## Key Files to Review

To quickly understand the architecture, these are the most relevant parts of the codebase:

* Dynamic rendering and dataset handling → [js/script_data.js](js/script_data.js)
* Search functionality → [js/search_bar.js](js/search_bar.js)
* UI interaction (navigation behaviour) → [js/navbar.js](js/navbar.js)
* Homepage carousel logic → [js/carosello.js](js/carosello.js)
* Data model used as a backend simulation → [data/perfumes.json](data/perfumes.json)

---

## Backend Simulation via JSON

The project does not include a real backend.

All product data is stored in `data/perfumes.json`.
JavaScript reads the dataset and uses it to render the catalog, generate product pages and handle search.

In practice, the JSON file acts as a small local database.
The same logic could later fetch data from an API with minimal changes.

---

## Project Structure

```text
Glaucoperfumes/
│
├── index.html
├── perfume.html
├── userPage.html
│
├── data/
│   └── perfumes.json
│
├── js/
│   ├── script_data.js
│   ├── search_bar.js
│   ├── navbar.js
│   └── carosello.js
│
├── css/
│   ├── index.css
│   ├── perfumes.css
│   ├── search_bar.css
│   └── userPage.css
│
├── img/
│   ├── logo.png
│   ├── favicon.ico
│   └── ...
|
├── preview/
│   └── social_preview.png
│   
│   
└── docs/
    ├── home-1.png
    ├── home-2.png
    ├── perfume-1.png
    ├── perfume-2.png
    └── perfume-3.png
```

---

## Design Choices

**JSON-driven catalog**
Adding a perfume only requires inserting a new object into the dataset. No HTML duplication is needed.

**No framework**
The project intentionally avoids frameworks to demonstrate understanding of DOM events, rendering logic and state handling.

**Placeholder images**
Official product photos are copyrighted marketing assets.
To keep the repository publicly shareable, each item uses project-owned placeholders.

---

## Roadmap

Possible future improvements:

* filtering by brand or fragrance family
* favorites using LocalStorage
* pagination or lazy loading
* replacing JSON with a real API
* user accounts and reviews

---

## Disclaimer

All trademarks and brand names belong to their respective owners.
This project is for educational and portfolio purposes only and is not affiliated with any fragrance brand.

---

## Author

Enzo Marcone — Information Technology for Digital Companies graduate interested in Front-End Development and Web Technologies.

---

## License

This project is licensed under the MIT License.
