// imports from other js files
import { ruta5y10ValleCoords, ruta5y10ValleWaypoints, rutaRefugioValleCoords } from "./routes.js";
import { signInWithGoogle, getUserFromRedirect, auth } from './firebase.js';
import { doc } from "firebase/firestore";


// DOM elements
// nav buttons
const searchSectionBtn = document.getElementById('search-section-btn');
const favoritesSectionBtn = document.getElementById('favorites-section-btn');
const accountSectionBtn = document.getElementById('account-section-btn');
// sections elements
const accountSectionEle = document.getElementById('account-section');
const favoritesSectionEle = document.getElementById('favorites-section');
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
// card user elements
const userCardImg = document.getElementById('user-card-img');
const userCardName = document.getElementById('user-card-name');
const userCardMiddleName = document.getElementById('user-card-middle-name');
const userCardLastname = document.getElementById('user-card-lastname'); 


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
  const userFullName = user.displayName.split(" ");
  const name = userFullName[0];
  const middle = userFullName[1]; 
  const last = userFullName[2]; 

  userCardName.value = name;
  userCardMiddleName.value = middle;
  userCardLastname.value = last;
  userCardImg.src = user.photoURL;

};

const storedUserString = sessionStorage.getItem('user');

if (storedUserString) {
  userInfo = JSON.parse(storedUserString);
  loadUserInfoCard(userInfo);
  // Ya puedes usar user.uid, user.email, etc.
} else {
  // No hay sesión activa
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

async function suscribirse() {
    const registro = await navigator.serviceWorker.ready;
    const suscripcion = await registro.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: 'BBswnwYK1ainOyoSKM-kQ6Dx7-rz35pItXaKp-N_OQoRAjjl040Jax0nYE4qJDBMcdYAhIHGlcBY3OTj27Za61A',
    });
  
    console.log('Suscripción:', JSON.stringify(suscripcion));
    // Aquí envías la suscripción al servidor para almacenarla
  }
  
suscribirse();
  

document.addEventListener("DOMContentLoaded", getLocation);

// firebase functions 

// Función que se llama cuando el usuario hace click en el botón de "Iniciar sesión"
function handleLogin() {
  signInWithGoogle()
    .then((user) => {
      console.log('Usuario autenticado:', user);
      // Obtener información del usuario actual
      const currentUser = auth.currentUser;

      if (currentUser) {
        // El usuario está autenticado
        console.log('Usuario autenticado:', currentUser);
        console.log('Email:', currentUser.email);
        console.log('UID:', currentUser.uid);
        console.log('Nombre:', currentUser.displayName);
        console.log('Foto de perfil:', currentUser.photoURL);

        // Guardar los datos del usuario en sessionStorage
        sessionStorage.setItem('user', JSON.stringify({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL
        }));
        userInfo = JSON.parse(sessionStorage.getItem('user'));
        loadUserInfoCard(userInfo);
        alert('info loaded');

      } else {
        // No hay ningún usuario autenticado
        console.log('No hay un usuario autenticado');
      }
      // Aquí puedes agregar la lógica para manejar el usuario autenticado
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

favoritesSectionBtn.addEventListener('click', () => {
    showSection(favoritesSectionEle);
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
        const tolerance = 20 / 111320; // 20 metros en grados

        const isNearRoute = google.maps.geometry.poly.isLocationOnEdge(userLocation, new google.maps.Polyline({ path: currentRoutePath }), tolerance);

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
          alert("Debes estar dentro de 20 metros de la ruta para iniciar el viaje.");
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

document.getElementById('sign-in-google-btn').addEventListener('click', () =>{
  handleLogin();
});

document.getElementById('show-user-btn').addEventListener('click', () => {
  //handleRedirectResult();
});
