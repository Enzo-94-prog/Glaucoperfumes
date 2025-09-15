
// Esempio di utilizzo delle funzioni contenute in firebase.js

import { auth, registerUser, loginUser, logoutUser, onUserStateChanged, addFavorite, removeFavorite, getFavorites } from './firebase.js';

// Esempio: registrazione
registerUser("pippo@email.com", "password123", "Pippo")
  .then(user => console.log("Registrato:", user.uid))
  .catch(err => console.error(err.message));

// Esempio: login
loginUser("pippo@email.com", "password123")
  .then(user => console.log("Loggato:", user.uid))
  .catch(err => console.error(err.message));

// Controllo login
onUserStateChanged(user => {
  if (user) {
    console.log("Utente loggato:", user.uid);
  } else {
    console.log("Nessun utente loggato");
  }
});

// Gestione preferiti
addFavorite("UID_UTENTE", "ID_PROFUMO");
removeFavorite("UID_UTENTE", "ID_PROFUMO");
getFavorites("UID_UTENTE").then(ids => console.log(ids));
