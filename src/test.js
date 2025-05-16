import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';

// Configuración de Firebase (reemplaza esto con tus claves reales)
const firebaseConfig = {
    apiKey: "AIzaSyCR6xXBhiIeH00S59-27zJsmcOLIt9JCWQ",
    authDomain: "mooove-pwa.firebaseapp.com",
    projectId: "mooove-pwa",
    storageBucket: "mooove-pwa.firebasestorage.app",
    messagingSenderId: "67182474532",
    appId: "1:67182474532:web:de9f1b7cd67d23a8b46fb1"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

(async () => {
  try {
    const newsRef = collection(db, 'news');
    await addDoc(newsRef, {
      title: 'Prueba',
      body: 'Contenido de prueba',
      timestamp: Timestamp.now(),
    });
    console.log('Documento agregado correctamente.');
  } catch (error) {
    console.error('Error al agregar el documento:', error);
  }
})();