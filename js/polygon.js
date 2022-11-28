let latlngs = [];

function addPolygon(e) {
	let dot = L.icon({
		iconUrl: './style/images/dot.png',
		iconSize: [10, 10],
	});
	let lat = e.latlng.lat;
	let lng = e.latlng.lng;
	console.log(lat);
	console.log(lng);

	latlngs.push([lat, lng]);
	console.log(latlngs);
	L.marker([lat, lng], { icon: dot }).addTo(map);
}

let addPolygonBtn = document.getElementById('addPolygon');
addPolygonBtn.addEventListener('click', () => {
	console.log('addPolygonBtn');
	localStorage.clear();
	sessionStorage.clear();
	map.on('click', addPolygon);
});

let createPolygonBtn = document.getElementById('createPolygon');
createPolygonBtn.addEventListener('click', () => {
	console.log('createPolygonBtn');
	map.off('click', addPolygon);
	latlngs.length
		? L.polygon(latlngs, { color: 'blue' }).addTo(map)
		: alert('Нету новых точек');

        sessionStorage.setItem('polygon', JSON.stringify(latlngs));

	latlngs = [];
});
