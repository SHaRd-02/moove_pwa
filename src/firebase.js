// firebase.js

// Importar las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, getRedirectResult, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase (reemplaza esto con tus claves reales)
const firebaseConfig = {
  apiKey: "AIzaSyCR6xXBhiIeH00S59-27zJsmcOLIt9JCWQ",
  authDomain: "mooove-pwa.firebaseapp.com",
  projectId: "mooove-pwa",
  storageBucket: "mooove-pwa.firebasestorage.app",
  messagingSenderId: "67182474532",
  appId: "1:67182474532:web:de9f1b7cd67d23a8b46fb1"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firebase Authentication y Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Crear el proveedor de Google
const provider = new GoogleAuthProvider();

// Función para manejar el inicio de sesión con Google
const signInWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      // El usuario se ha autenticado
      const user = result.user;
      return user;
    })
    .catch((error) => {
      // Manejar errores
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      throw error;
    });
};

// Función para obtener el resultado de redirección (usado cuando usas getRedirectResult)
const getUserFromRedirect = () => {
  return getRedirectResult(auth)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      return user;
    })
    .catch((error) => {
      console.error(error.code, error.message);
      throw error;
    });
};

// Exportar las funciones necesarias
export { auth, db, provider, signInWithGoogle, getUserFromRedirect };