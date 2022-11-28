let polygon = JSON.parse(sessionStorage.getItem('polygon'));
let howManyMarkersInput = document.getElementById('howManyMarkers');


function addMarker(e) {
    console.log(polygon);
	lat = e.latlng.lat;
	lng = e.latlng.lng;
	console.log(lat);
	console.log(lng);
	L.marker([lat, lng]).addTo(map);
	map.off('click', addMarker);

	let xp = [];
	let yp = [];

	polygon.forEach((element) => {
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
		howManyMarkersInput.value++;
	}

	console.log(inPoly(x, y));
}

let addMarkerBtn = document.getElementById('addMarker');
addMarkerBtn.addEventListener('click', async () => {
	console.log('addMarkerBtn');
	await map.on('click', addMarker);
});
