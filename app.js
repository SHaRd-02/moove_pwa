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

function initMap(lat, lng) {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: lat, lng: lng }, // Coordenadas de la UABC Valle de las Palmas
        zoom: 12,
    });

    fetch("http://127.0.0.1:5000/routes")
        .then(response => response.json())
        .then(routes => {
            routes.forEach(route => {
                let path = JSON.parse(route.waypoints);
                let routePath = new google.maps.Polyline({
                    path: path,
                    geodesic: true,
                    strokeColor: "#FF0000",
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                });
                routePath.setMap(map);
            });
        })
        .catch(error => console.error("Error cargando rutas:", error));
}


function getLocation (){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success, error);
    }else{
        alert("Geolocation not supported");
    };
};

function success (position){
    initMap(position.coords.latitude, position.coords.longitude);
};

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

