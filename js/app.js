
import { auth, registerUser, loginUser, logoutUser, onUserStateChanged, addFavorite, removeFavorite, getFavorites } from './firebase.js';

// ELEMENTI DOM
const nicknameInput = document.getElementById("nickname");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userInfo = document.getElementById("user-info");

const authSection = document.getElementById("auth-section");
const perfumesSection = document.getElementById("perfumes-section");
const perfumesList = document.getElementById("perfumes-list");
const favoritesList = document.getElementById("favorites-list");

// 🔹 CARICAMENTO di PERFUMES.JSON
let perfumes = [];
fetch('perfumes.json')
  .then(res => res.json())
  .then(data => {
    perfumes = data;
    renderPerfumes([]);
  });

// ==========================================
// REGISTRAZIONE E LOGIN
// ==========================================
registerBtn.addEventListener("click", async () => {
  try {
    const user = await registerUser(emailInput.value, passwordInput.value, nicknameInput.value);
    console.log("Registrato:", user.uid);
  } catch(err) {
    alert(err.message);
  }
});

loginBtn.addEventListener("click", async () => {
  try {
    const user = await loginUser(emailInput.value, passwordInput.value);
    console.log("Loggato:", user.uid);
  } catch(err) {
    alert(err.message);
  }
});

logoutBtn.addEventListener("click", async () => {
  await logoutUser();
});



// ==========================================
// STATO DI LOGIN
// ==========================================
let currentUser = null;

onUserStateChanged(async user => {
  currentUser = user;
  if(user){
    authSection.style.display = "none";
    perfumesSection.style.display = "block";
    logoutBtn.style.display = "inline-block";
    userInfo.textContent = `Benvenuto, ${user.email}`;

    // Carica preferiti
    const favIds = await getFavorites(user.uid);
    renderPerfumes(favIds);

  } else {
    authSection.style.display = "block";
    perfumesSection.style.display = "none";
    logoutBtn.style.display = "none";
    userInfo.textContent = "";
  }
});



// ==========================================
// RENDER PERFUMES E PREFERITI
// ==========================================
function renderPerfumes(favoriteIds){
  perfumesList.innerHTML = "";
  favoritesList.innerHTML = "";

  perfumes.forEach(p => {
    // Lista generale
    const li = document.createElement("li");
    li.textContent = `${p.name} - ${p.brand}`;

    if(currentUser){
      const favBtn = document.createElement("button");
      favBtn.textContent = favoriteIds.includes(p.id) ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti";
      favBtn.addEventListener("click", async () => {
        if(favoriteIds.includes(p.id)){
          await removeFavorite(currentUser.uid, p.id);
          favoriteIds = favoriteIds.filter(id => id !== p.id);
        } else {
          await addFavorite(currentUser.uid, p.id);
          favoriteIds.push(p.id);
        }
        renderPerfumes(favoriteIds);
      });
      li.appendChild(favBtn);
    }

    perfumesList.appendChild(li);

    // Lista preferiti
    if(favoriteIds.includes(p.id)){
      const favLi = document.createElement("li");
      favLi.textContent = `${p.name} - ${p.brand}`;
      favoritesList.appendChild(favLi);
    }
  });
}
