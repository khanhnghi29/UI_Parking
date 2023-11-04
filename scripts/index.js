const locations = [
	[20.9885354, 105.7925122],
	[20.9862029, 105.7911484],
	[20.9773215, 105.7947036]
];



var map = L.map('map').setView([20.9809035, 105.784863], 14);
mapLink = "<a href='http://openstreetmap.org'>OpenStreetMap</a>";
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: 'Leaflet &copy; ' + mapLink + ', contribution', maxZoom: 18 }).addTo(map);

//your current location
var yourLocation = L.icon({
	iconUrl: 'img/blue.png',
	iconSize: [40, 40]
})
var marker = L.marker([20.9809035, 105.784863], { icon: yourLocation }).addTo(map);

//parking locations
var parkingIcon = L.icon({
	iconUrl: 'img/rmicon.png',
	iconSize: [60, 60]
})

locations.forEach(function loadItem(items) {
	console.log(items);
	L.marker(items, { icon: parkingIcon }).addTo(map);
});


map.on('click', function (e) {
	var newMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
	L.Routing.control({
		waypoints: [
			L.latLng(20.9809035, 105.784863),
			L.latLng(e.latlng.lat, e.latlng.lng)
		]
	}).on('routesfound', function (e) {
		var routes = e.routes;
		console.log(routes);
	}).addTo(map);
});