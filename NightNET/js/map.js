// Access token 
mapboxgl.accessToken = 'pk.eyJ1IjoidnJlbmVyIiwiYSI6ImNsaWk3M2toZDB3c3Izcm1xbDh3d3I3OXQifQ.id2Zwfa23DlVjPCM1e7xuQ';

// Create map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11' ,
  center: [-122.431297, 37.773972], 
  zoom: 12 
});

// Add geolocate control 
map.addControl(new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true 
}));

// Add marker on click
map.on('load', function() {
  map.on('click', function(e) {
    var marker = new mapboxgl.Marker({ 
      draggable: true 
    })
    .setLngLat(e.lngLat)
    .addTo(map); 
    
    marker.on('dragend', function(e) {
      var lngLat = marker.getLngLat();
      console.log(lngLat);
    });
  });
});

function toggle() {
    let links = document.getElementById ("links") ;
    let blob = document.getElementById("blob");
    blob.classList.toggle("open");
    if (links.style.display == "block"){
       links.style.display = "none";
    } else {
       links.style.display = "block";
    }
  }

  function closePopup() {
    // Função para fechar o popup
  }
  
  function toggleGhostMode() {
    // Função para lidar com a alternação do modo fantasma
    var checkbox = document.getElementById("check");
    if (checkbox.checked) {
      // Modo fantasma ativado
      // Faça algo aqui
    } else {
      // Modo fantasma desativado
      // Faça algo aqui
    }
  }
  
  document.getElementById("check").addEventListener("change", toggleGhostMode);
  
  function toggleDropdown() {
    // Função para alternar a exibição do dropdown
    var dropdownContent = document.querySelector(".dropdown-content");
    dropdownContent.classList.toggle("show");
  }
  
  document.querySelector(".btn").addEventListener("click", toggleDropdown);
  