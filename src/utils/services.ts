import { Mapbox } from "./@types/mapbox_types";
import { Weather } from "./@types/openweather_types";
import { fetchJson } from "./helper";
import * as dotenv from "dotenv";

dotenv.config();

const openweather_url = 'https://api.openweathermap.org/data/2.5/onecall';

const mapbox_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

type Location = { place_name: string, longitude: number, latitude: number };

export const geolocation = (
	address: string,
	callback: (error: any, location?: Location) => void
) => {
	fetchJson({
		baseUrl: mapbox_url,
		path: address + '.json',
		queries: { access_token: process.env.MAPBOX_ACCESS_TOKEN },
	}, (error, mapbox: Mapbox) => {

		if (error) {
			callback('Unable to connect to location service!');
		} else if (mapbox.features.length == 0) {
			callback('Unable to find location, try another search!');
		} else {
			const location = {
				place_name: mapbox.features[0].place_name,
				longitude: mapbox.features[0].center[0],
				latitude: mapbox.features[0].center[1]
			};

			callback(undefined, location);
		}
	});
}

export const weather = (
	location: Location,
	callback: (error: any, weather?: Weather) => void
) => {
	fetchJson({
		baseUrl: openweather_url,
		queries: {
			lat: location.latitude,
			lon: location.longitude,
			units: 'metric',
			appid: process.env.OPENWEATHER_API_KEY
		},
	}, (error, weather: Weather) => {
		if (error) {
			callback('Unable to connect to weather service!');
		} else {
			callback(undefined, weather);
		}
	});
}