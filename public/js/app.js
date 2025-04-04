// imports from other js files
import { ruta5y10ValleCoords, ruta5y10ValleWaypoints, rutaRefugioValleCoords } from "./routes.js";

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


// google maps map

let map;
let currentRoute = null;
let directionsService;
let directionsRenderer;

const buttonColor = "#BD93F9";
const foregroundColor = "#F8F8F2"; 
const backgroundColor= "#282A36"; 
const uiBgColor = "#44475A"; 
const secondaryColor= "pink";
const navbarColor= "#6272A4";
const waterColor = "#4a69c6";


function initMap(lati, longi) {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: lati, lng: longi }, // Coordenadas de la UABC Valle de las Palmas
        zoom: 14,
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



// Event listener for nav button
accountSectionBtn.addEventListener('click', () => {
    showSection(accountSectionEle);
});

favoritesSectionBtn.addEventListener('click', () => {
    showSection(favoritesSectionEle);
});

searchSectionBtn.addEventListener('click', () => {
    showSection(searchSectionEle);
});

// Event listener for select route
selectRouteBtn.addEventListener("click", () => {
  const selectedValue = selectRouteEle.value;

  if (selectedValue === "1") {
    directionsService.route(
      {
        origin: ruta5y10ValleCoords[0],
        destination: ruta5y10ValleCoords[1],
        waypoints: ruta5y10ValleWaypoints,
        travelMode: google.maps.TravelMode.DRIVING,
        optimizeWaypoints: false
      },
      (response, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(response);
        } else {
          alert("Error al generar la ruta: " + status);
        }
      }
    );
  }
  else if(selectedValue === "2"){
    directionsService.route(
      {
        origin: rutaRefugioValleCoords[0],
        destination: rutaRefugioValleCoords[1],
        travelMode: google.maps.TravelMode.DRIVING,
        optimizeWaypoints: false
      },
      (response, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(response);
        } else {
          alert("Error al generar la ruta: " + status);
        }
      }
    );
  }
});

