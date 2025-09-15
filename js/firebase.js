
// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, deleteDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
  
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



  // Configurazione Firebase 
  const firebaseConfig = {
    apiKey: "AIzaSyCLomyPhD-4Q7R5Qc9_zjKoaPQlOvAAihc",
    authDomain: "glaucoparfumes.firebaseapp.com",
    projectId: "glaucoparfumes",
    storageBucket: "glaucoparfumes.firebasestorage.app",
    messagingSenderId: "325133937205",
    appId: "1:325133937205:web:7b340a220aca70a9865f7c",
    measurementId: "G-D420Y60JE6"
  };


  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app); 


// ================================================
// FUNZIONI AUTH
// ================================================

// Registrazione utente
export async function registerUser(email, password, nickname) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCredential.user.uid;
  // Salva nickname in Firestore
  await setDoc(doc(db, "users", uid), { nickname: nickname });
  return userCredential.user;
}

// Login utente
export async function loginUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

// Logout
export async function logoutUser() {
  await signOut(auth);
}

// Stato di login
export function onUserStateChanged(callback) {
  onAuthStateChanged(auth, callback);
}

// ================================================
// FUNZIONI PREFERITI
// ================================================

// Aggiungi un profumo ai preferiti
export async function addFavorite(uid, perfumeId) {
  await setDoc(doc(db, "users", uid, "favorites", perfumeId), { liked: true });
}

// Rimuovi un profumo dai preferiti
export async function removeFavorite(uid, perfumeId) {
  await deleteDoc(doc(db, "users", uid, "favorites", perfumeId));
}

// Leggi tutti i preferiti di un utente
export async function getFavorites(uid) {
  const favoritesCol = collection(db, "users", uid, "favorites");
  const snapshot = await getDocs(favoritesCol);
  const favoriteIds = snapshot.docs.map(doc => doc.id);
  return favoriteIds;
}
