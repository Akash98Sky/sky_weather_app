console.log('Client side javascript file loaded!');

/**
 * @param {string} address 
 * @param {(error: any, weather?: any) => void} callback 
 */
function fetchWeather(address, callback) {
	fetch('/weather?address=' + address).then((res) => {
		res.json().then((data) => {
			if (data.error) {
				return callback(data.error);
			}
			callback(undefined, data);
		});
	});
}

const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const fullAddressElement = document.getElementById('full_address');
const forecastElement = document.getElementById('forecast');
const mapElement = document.getElementById('map');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();
	document.getElementById('error').innerHTML = "";

	const address = searchElement.value;

	fetchWeather(address, (error, weather) => {
		if (error) {
			document.getElementById('error').innerHTML = error;
			return console.log('ERROR: ' + error);
		}

		fullAddressElement.innerHTML = weather.location.place_name;
		forecastElement.innerHTML = weather.forecast;
		mapElement.innerHTML = '<iframe title="map" class="absolute inset-0" style="filter: grayscale(1) contrast(1.2) opacity(0.16);" marginheight="0" marginwidth="0" scrolling="no" src="https://maps.google.com/maps?width=100%&height=600&hl=en&q='+ encodeURIComponent(weather.location.place_name) +'&ie=UTF8&t=&z=14&iwloc=B&output=embed" width="100%" height="100%" frameborder="0"></iframe>';
		console.log(weather);
	});
});