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
        zoom: 12,
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

