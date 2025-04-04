// DOM elements
// nav buttons
const searchSectionBtn = document.getElementById('search-section-btn');
const favoritesSectionBtn = document.getElementById('favorites-section-btn');
const accountSectionBtn = document.getElementById('account-section-btn');
// sections elements
const accountSectionEle = document.getElementById('account-section');
const favoritesSectionEle = document.getElementById('favorites-section');
const searchSectionEle = document.getElementById('search-section');

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

function initMap(lati, longi) {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: lati, lng: longi }, // Coordenadas de la UABC Valle de las Palmas
        zoom: 14,
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

