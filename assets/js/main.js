/* MAPA GOOGLE */
function initMap(){
   	var map = new google.maps.Map(document.getElementById("map"),{
		zoom: 5,
		center: {lat: -9.1191427, lng: -77.0349046},
		mapTypeControl: false,
		zoomControl: true,
		streetViewControl: true,
	});


function buscar(){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
		}
	}

	window.addEventListener("load", buscar);

	var latitud, longitud;

	var funcionExito = function(posicion){
		latitud = posicion.coords.latitude;
		longitud = posicion.coords.longitude;

		var ubicacion = new google.maps.Marker({
			position: {lat:latitud, lng:longitud},
			animation: google.maps.Animation.DROP,
			map: map,

		});

		map.setZoom(17);
		map.setCenter({lat:latitud, lng:longitud});
	}

	var funcionError = function(error){
		alert("Tenemos un problema para encontrar tu ubicación.");
	}

	/* AUTOCOMPLETADO */
	var inputO = (document.getElementById('origen'));
	var autocomplete = new google.maps.places.Autocomplete(inputO);
        autocomplete.bindTo('bounds', map);

    var inputD = (document.getElementById('destino'));
	var autocomplete = new google.maps.places.Autocomplete(inputD);
        autocomplete.bindTo('bounds', map);

	var directionsService = new google.maps.DirectionsService;//Se comunica con el servicio de indicaciones de la Google Maps API
    var directionsDisplay = new google.maps.DirectionsRenderer;

	document.getElementById('origen').addEventListener('change', onChangeHandler);
	document.getElementById('destino').addEventListener('change', onChangeHandler);


	function trazarRuta(directionsService, directionsDisplay) {
        directionsService.route({
        	origin: document.getElementById('origen').value,
	        destination: document.getElementById('destino').value,
	        travelMode: 'DRIVING'
	        }, 
	    function(response, status) {
	     	if (status === 'OK') {
	        	directionsDisplay.setDirections(response);
	      	} else {
	            window.alert('No se encontró la ruta ' + status);
	        }
	    });
	}	

	/* CÁLCULO COSTO DE RUTA */
	function calcularCostoRuta() {
			var start = document.getElementById("origen").value;
			var end = document.getElementById("destino").value;
			var distanceInput = document.getElementById("output");
			
			var request = {
				origin:start, 
				destination:end,
				travelMode: google.maps.DirectionsTravelMode.DRIVING
			};
			
			directionsService.route(request, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);					
					var costoRuta = (response.routes[0].legs[0].distance.value / 1000) * 500;
					var contenedor = document.createElement("div");
					contenedor.setAttribute("class","costos");
					var contenedorValor = document.createTextNode("$  " + costoRuta);
					contenedor.appendChild(contenedorValor);
					distanceInput.appendChild(contenedor);
				}
			});
	}

	directionsDisplay.setMap(map);
	var onChangeHandler = function(){
		trazarRuta(directionsService, directionsDisplay);
		calcularCostoRuta();
	};  
		
	document.getElementById("ruta").addEventListener("click",onChangeHandler); 

}

/* MENÚ NAVBAR */
var menu = document.getElementById("menu");
menu.addEventListener("click",function(){
	var nav = document.getElementById("nav");
	nav.classList.toggle("menu-navbar");


})