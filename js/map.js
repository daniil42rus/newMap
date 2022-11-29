// установка карты

let map = L.map('map').setView([55.349201, 86.084297], 16);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	// attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

///marker ///

let polygonMap = [];
let howManyMarkersInput = document.getElementById('howManyMarkers');
// howManyMarkersInput.textContent = 0

function addMarker(e) {
	console.log(polygonMap);
	lat = e.latlng.lat;
	lng = e.latlng.lng;
	console.log(lat);
	console.log(lng);
	L.marker([lat, lng]).addTo(map);
	map.off('click', addMarker);

	let xp = [];
	let yp = [];

	polygonMap.forEach((element) => {
		xp.push(element[0]);
		yp.push(element[1]);
	});

	console.log(xp);
	console.log(yp);

	let x = lat;
	let y = lng;

	function inPoly(x, y) {
		let npol = xp.length;
		let j = npol - 1;
		let c = 0;
		for (let i = 0; i < npol; i++) {
			if (
				((yp[i] <= y && y < yp[j]) || (yp[j] <= y && y < yp[i])) &&
				x > ((xp[j] - xp[i]) * (y - yp[i])) / (yp[j] - yp[i]) + xp[i]
			) {
				c = !c;
			}
			j = i;
		}
		return c;
	}
	if (inPoly(x, y)) {
		howManyMarkersInput.textContent++;
	}

	console.log(inPoly(x, y));
	addMarkerBtn.classList.remove('btn_active');
}

let addMarkerBtn = document.getElementById('addMarker');
addMarkerBtn.addEventListener('click', () => {
	console.log('123');
	addMarkerBtn.classList.add('btn_active');
	console.log('addMarkerBtn');
	map.on('click', addMarker);
});

/// polygon ///

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
	addPolygonBtn.classList.add('btn_active');

	console.log('addPolygonBtn');
	map.on('click', addPolygon);
});

let createPolygonBtn = document.getElementById('createPolygon');
createPolygonBtn.addEventListener('click', () => {
	addPolygonBtn.classList.remove('btn_active');

	createPolygonBtn.classList.add('btn_active');
	console.log('createPolygonBtn');
	map.off('click', addPolygon);

	latlngs.length
		? L.polygon(latlngs, { color: 'blue' }).addTo(map)
		: alert('Нету новых точек');

	polygonMap = latlngs.slice();
	latlngs = [];
	createPolygonBtn.classList.remove('btn_active');
});
