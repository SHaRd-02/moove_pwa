// imports from other js files
import { ruta5y10ValleCoords, ruta5y10ValleWaypoints, rutaRefugioValleCoords } from "./routes.js";
import { signInWithGoogle, getUserFromRedirect, auth, signOutUser, db, collection, addDoc, Timestamp, getDocs, storage, ref, uploadBytes, getDownloadURL, query, orderBy } from './firebase.js';


// DOM elements
// nav buttons
const searchSectionBtn = document.getElementById('search-section-btn');
const newsSectionBtn = document.getElementById('news-section-btn');
const accountSectionBtn = document.getElementById('account-section-btn');

// sections elements
const accountSectionEle = document.getElementById('account-section');
const newsSectionEle = document.getElementById('news-section');
const searchSectionEle = document.getElementById('search-section');

// select route elements
const selectRouteEle = document.getElementById('select-route');
const selectRouteBtn = document.getElementById('select-route-btn');
// routes div info elements
const routeOriginEle = document.getElementById('route-origin');
const routeDestinationEle = document.getElementById('route-destiny');
const tarifPriceEle = document.getElementById('tarif-price');
const routeEtaEle = document.getElementById('route-eta');
// start trip elements
const startTripBtn = document.getElementById('start-trip-btn');
console.log("startTripBtn:", startTripBtn);
// card user elements
const userCardDiv = document.getElementById('user-card-div');
const loaderEle = document.getElementById('loader-div');
const userCardImg = document.getElementById('user-card-img');
const userCardName = document.getElementById('user-card-name');
const userCardMiddleName = document.getElementById('user-card-middle-name');
const userCardLastname = document.getElementById('user-card-lastname');
const signOutBtn = document.getElementById('sign-out-btn'); 
const signInGoogleBtn = document.getElementById('sign-in-google-btn');

//news section
const addNewsBtn = document.getElementById('add-news-btn');
const addNewsModal = document.getElementById('add-news-modal');
const newsCloseModalBtn = document.getElementById('news-close-modal-btn');
const newsDashboard = document.getElementById('news-dashboard');
const publishNewsBtn = document.getElementById('publish-news-btn');
const newsTextBodyInput= document.getElementById('news-text-body-input');
const newsTitleInput = document.getElementById('news-title-input');
const loaderNews= document.getElementById('loader-news');

const newsList = []


// Function to show a section
function showSection(selected) {
    // Select all elements with the class "sections" (plural)
    let sections = document.querySelectorAll('.sections');
    //console.log(sections);
    // Hide all sections
    sections.forEach(section => section.classList.add('hidden'));

    // Show the selected section
    selected.classList.remove('hidden');
}





// global colors

const buttonColor = "#BD93F9";
const foregroundColor = "#F8F8F2"; 
const backgroundColor= "#282A36"; 
const uiBgColor = "#44475A"; 
const secondaryColor= "pink";
const navbarColor= "#6272A4";
const waterColor = "#4a69c6";

// google maps map

let map;
let currentRoute = null;
let directionsService;
let directionsRenderer;
let userMarker = null;
const zoomLevel = 14;


//user info from firebase
let userInfo;

function loadUserInfoCard(user){
  if (!user){
    console.log('no user found');
    userCardName.value = "";
    userCardMiddleName.value = ""; 
    userCardLastname.value = ""; 
    userCardImg.src = "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"; 
    return;
  }

  const userFullName = user.displayName.split(" ");
  const name = userFullName[0] || "";
  const middle = userFullName[1] || ""; 
  const last = userFullName[2] || ""; 

  userCardName.value = name;
  userCardMiddleName.value = middle;
  userCardLastname.value = last;
  if (user.photoURL !== null){
    userCardImg.src = user.photoURL;
    console.log(user.photoURL)
    console.log(userCardImg.src)
  }

};

const storedUID = localStorage.getItem('uid');

// Verifica si hay un UID guardado en localStorage
if (storedUID) {
  // Si existe, intenta obtener el usuario desde Firebase
  auth.onAuthStateChanged(user => {
    if (user) {
      // El usuario ya está autenticado por Firebase
      localStorage.setItem('uid', user.uid); // Guardar por si lo necesitas después
      userInfo = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      };
      loadUserInfoCard(userInfo);
      signInGoogleBtn.classList.add('hidden');
      signOutBtn.classList.remove('hidden');
    } else {
      console.log('Usuario no autenticado');
      localStorage.removeItem('uid'); // Limpia cualquier UID guardado
      signInGoogleBtn.classList.remove('hidden');
      signOutBtn.classList.add('hidden');
    }
  });
} else {
  console.log('No hay UID en localStorage');
}




window.initMap = function (lati, longi) {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: lati, lng: longi }, // Coordenadas de la UABC Valle de las Palmas
        zoom: zoomLevel,
        disableDefaultUI: true,
        styles: [
          {
              elementType: "geometry",
              stylers: [{ color: uiBgColor }]
          },
          {
              elementType: "labels.icon",
              stylers: [{ visibility: "off" }]
          },
          {
              elementType: "labels.text.fill",
              stylers: [{ color: foregroundColor }]
          },
          {
              elementType: "labels.text.stroke",
              stylers: [{ color: backgroundColor }]
          },
          {
              featureType: "administrative",
              elementType: "geometry",
              stylers: [{ visibility: "off" }]
          },
          {
              featureType: "poi",
              elementType: "geometry",
              stylers: [{ visibility: "off" }]
          },
          {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: navbarColor }]
          },
          {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: waterColor }]
          }
      ]
    });

    // Dibuja un marcador para la ubicación del usuario
    const userMarker = new google.maps.Marker({
        position: { lat: lati, lng: longi },
        map: map,
        title: "Tu ubicación",
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#4285F4", // Azul Google
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "#ffffff",
        }
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
      map: map,
      suppressMarkers: false,
      polylineOptions: {
        strokeColor: buttonColor,
        strokeWeight: 5,
      }
    });

};




function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);

  } else {
    alert("Browser not supported");
  }
}

function success(position) {
    const lati = position.coords.latitude; 
    const longi = position.coords.longitude;
    console.log("Latitude: ", lati);
    console.log("Longitude: ", longi);
    initMap(lati, longi);

}

function error() {
  alert("Sorry, no position available.");
}

async function solicitarPermiso() {
    const permiso = await Notification.requestPermission();
    if (permiso === 'granted') {
      console.log('Permiso para notificaciones concedido.');
    } else {
      console.log('Permiso denegado.');
    }
  };
solicitarPermiso();


// news section functions

// function to load news into the news dashboard


async function displayNews() {
  newsDashboard.innerHTML = ''; // Clear previous content

  try {
    const newsQuery = query(collection(db, 'news'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(newsQuery);

    querySnapshot.forEach(doc => {
      const noticia = doc.data();

      const divNoticia = document.createElement('div');
      divNoticia.className = 'news-div';

      divNoticia.innerHTML = `
        <div class="news-user-div">
          <img src="${noticia.pfpUrl || 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png'}" alt="Foto de perfil" class="news-pfp">
          
        </div>
         
        <div class="news-content-div">
          <h6>${noticia.author || 'Anónimo'}</h6>
          <h5>${noticia.title}</h5>
          <p class="news-p">${noticia.body}</p>
          ${noticia.imageUrl ? `<img src="${noticia.imageUrl}" alt="Imagen de la noticia" class="news-photo">` : ''}
          <div class="news-timestamp">${noticia.timestamp?.toDate().toLocaleString() || ''}</div>
        </div>
      `;

      newsDashboard.appendChild(divNoticia);
    });

  } catch (error) {
    console.error('Error loading news:', error);
    if (error.code === 'permission-denied') {
      newsDashboard.innerHTML = '<p>Inicia sesión para ver las noticias</p>';
    } else {
      newsDashboard.innerHTML = '<p>Error cargando noticias.</p>';
    }
   
  }
}
  

document.addEventListener("DOMContentLoaded", getLocation);

// firebase functions 

// Función que se llama cuando el usuario hace click en el botón de "Iniciar sesión"
function handleLogin() {
  signInWithGoogle()
    .then(async (user) => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const { uid, email, displayName, photoURL } = currentUser;


        const emailDomain = email.split('@')
        console.log(emailDomain)

        if (emailDomain[1] === 'uabc.edu.mx'){
          // Guardar solo el UID en localStorage
          localStorage.setItem('uid', uid);
          userInfo = { uid, email, displayName, photoURL };
          loadUserInfoCard(userInfo);
        
          signInGoogleBtn.classList.add('hidden');
          signOutBtn.classList.remove('hidden');
        }else{
          setTimeout(() => {
            console.log('This runs after 2 seconds');
          }, 2000);
          alert('Correo no valido, solo se permiten correos instutucionales de UABC')
        }
        
        userCardDiv.classList.toggle('hidden');
        loaderEle.classList.toggle('hidden');
        
      }
    })
    .catch((error) => {
      console.error('Error de autenticación:', error);
    });
}




// Método para cerrar sesión
const logout = () => {
  signOut(auth)
    .then(() => {
      console.log('Usuario desconectado');
    })
    .catch((error) => {
      console.error('Error al cerrar sesión:', error);
    });
};

// Event listener for nav button
accountSectionBtn.addEventListener('click', () => {
    showSection(accountSectionEle);
    loadUserInfoCard(userInfo);
});

newsSectionBtn.addEventListener('click', () => {
    showSection(newsSectionEle);
    displayNews();
});

searchSectionBtn.addEventListener('click', () => {
    showSection(searchSectionEle);
});


// Event listener for select route
let currentRoutePath = [];

selectRouteBtn.addEventListener("click", () => {
  const selectedValue = selectRouteEle.value;

  if (selectedValue === "1") {
    // Configuración de la ruta 1
    startTripBtn.disabled = false; // Activa el botón
    routeOriginEle.innerText = "5 y 10";
    routeDestinationEle.innerText = "UABC Valle";
    tarifPriceEle.innerText = "$20";
    directionsService.route(
      {
        origin: ruta5y10ValleCoords[0],
        destination: ruta5y10ValleCoords[1],
        waypoints: ruta5y10ValleWaypoints,
        travelMode: google.maps.TravelMode.DRIVING,
        optimizeWaypoints: false,
      },
      (response, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(response);
          currentRoutePath = response.routes[0].overview_path;
          // Calcular y mostrar el tiempo estimado de llegada (ETA)
          const totalDuration = response.routes[0].legs.reduce((sum, leg) => sum + leg.duration.value, 0);
          const etaMin = Math.ceil(totalDuration / 60);
          routeEtaEle.innerText = `${etaMin} minutos`;
        } else {
          alert("Error al generar la ruta: " + status);
        }
      }
    );
  } else if (selectedValue === "2") {
    // Configuración de la ruta 2
    startTripBtn.disabled = false; // Activa el botón
    routeOriginEle.innerText = "Refugio";
    routeDestinationEle.innerText = "UABC Valle";
    tarifPriceEle.innerText = "$20";
    directionsService.route(
      {
        origin: rutaRefugioValleCoords[0],
        destination: rutaRefugioValleCoords[1],
        travelMode: google.maps.TravelMode.DRIVING,
        optimizeWaypoints: false,
      },
      (response, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(response);
          currentRoutePath = response.routes[0].overview_path;
          // Calcular y mostrar el tiempo estimado de llegada (ETA)
          const totalDuration = response.routes[0].legs.reduce((sum, leg) => sum + leg.duration.value, 0);
          const etaMin = Math.ceil(totalDuration / 60);
          routeEtaEle.innerText = `${etaMin} minutos`;
        } else {
          alert("Error al generar la ruta: " + status);
        }
      }
    );
  }
});

// start trip btn event listener 


startTripBtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        const tolerance = 2000 / 111320; // 200 metros en grados

        const isNearRoute = google.maps.geometry.poly.isLocationOnEdge(userLocation, new google.maps.Polyline({ path: currentRoutePath }), tolerance);
        console.log()
        if (isNearRoute) {
          // El usuario está dentro del radio permitido, iniciar el viaje
          startTripBtn.disabled = true;
          startTripBtn.innerText = 'Viaje en curso...';
          routeEtaEle.style.color = "rgb(15, 203, 15)";

          // Iniciar seguimiento de la ubicación del usuario
          navigator.geolocation.watchPosition(
            position => {
              const userPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };

              if (userMarker) {
                userMarker.setPosition(userPosition);
              } else {
                userMarker = new google.maps.Marker({
                  position: userPosition,
                  map: map,
                  title: "Tu ubicación",
                  icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 7,
                    fillColor: "#00BFFF",
                    fillOpacity: 1,
                    strokeColor: "#ffffff",
                    strokeWeight: 2
                  }
                });
              }

              map.setCenter(userPosition);
              map.setZoom(zoomLevel);
            },
            error => {
              console.error("Error al obtener ubicación:", error);
            },
            {
              enableHighAccuracy: true,
              maximumAge: 0,
              timeout: 5000
            }
          );
        } else {
          // El usuario está fuera del radio permitido
          alert("Debes estar dentro de 200 metros de la ruta para iniciar el viaje.");
        }
      },
      error => {
        console.error("Error al obtener ubicación:", error);
        alert("No se pudo obtener tu ubicación.");
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
      }
    );
  } else {
    alert("Geolocalización no soportada en este navegador.");
  }
});


// sign in with google btn

signInGoogleBtn.addEventListener('click', () =>{
  handleLogin();
  userCardDiv.classList.toggle('hidden');
  loaderEle.classList.toggle('hidden');
  
});

signOutBtn.addEventListener('click', () => {
  signOutUser();
  localStorage.removeItem('user');
  userInfo = null;
  loadUserInfoCard(null);
  signInGoogleBtn.classList.toggle('hidden');
  signOutBtn.classList.toggle('hidden');
});

// news section events listeners

addNewsBtn.addEventListener('click', () =>{
  addNewsModal.showModal()
});

newsCloseModalBtn.addEventListener('click', () => {
  addNewsModal.close()
});

//console.log("DB:", db);
console.log('Tipo de db:', db.constructor.name);

//import { collection, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js"; // Asegúrate de tener esto

publishNewsBtn.addEventListener('click', async () => {
  const title = newsTitleInput.value.trim();
  const body = newsTextBodyInput.value.trim();
  const imageFile = document.getElementById('newsImageInput').files[0];
  publishNewsBtn.disabled = true;

  if (!title || !body) {
    alert("Por favor completa el título y el contenido de la noticia.");
    publishNewsBtn.disabled = false;
    return;
  }

  const currentUser = auth.currentUser;

  if (!currentUser) {
    alert("Debes iniciar sesión para publicar una noticia.");
    publishNewsBtn.disabled = false;
    return;
  }

  try {
    let imageUrl = null;

    if (imageFile) {
      const imageRef = ref(storage, `news-images/${Date.now()}_${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    const newsRef = collection(db, 'news');

    await addDoc(newsRef, {
      title,
      body,
      author: currentUser.displayName || "Anónimo",
      pfpUrl: currentUser.photoURL || null,  // ← Aquí se guarda la foto de perfil
      uid: currentUser.uid,
      timestamp: Timestamp.now(),
      likes: 0,
      imageUrl: imageUrl || null
    });

    alert('Noticia publicada correctamente.');
    newsTitleInput.value = '';
    newsTextBodyInput.value = '';
    document.getElementById('newsImageInput').value = '';
    addNewsModal.classList.add('hidden');
  } catch (error) {
    console.error("Error al guardar la noticia:", error);
    alert('Error al publicar la noticia. Intenta de nuevo.');
  }

  publishNewsBtn.disabled = false;
  displayNews(); // Cargar las noticias actualizadas
});