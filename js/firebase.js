// ── firebase.js ─────────────────────────────────────────────
// FIX 1: All SDK imports now use the SAME version (10.12.2)
//         Previously firebase.js used 9.23.0 while all other
//         files imported from 10.12.2 — causing silent failures.
// FIX 2: Place this file at  /js/firebase.js  (all pages import
//         from "./js/firebase.js").  Do NOT put it in the root.

import { initializeApp }  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth }        from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore }   from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey:            "AIzaSyCLPNGY6w2otiBUGfbjnOM86DYfvh-zt4U",
  authDomain:        "cyber-buddy-academy.firebaseapp.com",
  projectId:         "cyber-buddy-academy",
  storageBucket:     "cyber-buddy-academy.appspot.com",
  messagingSenderId: "378058712667",
  appId:             "1:378058712667:web:88b72bcde024c217dac17e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db   = getFirestore(app);
