import * as request from 'request';
import * as qs from "querystring";

export function fetchJson(uri: { baseUrl: string, path?: string, queries?: {} }, callback?: (error: Error, json?: any) => void) {
	let url = encodeURI(uri.baseUrl + (uri.path || ''));

	if (typeof uri.queries != 'undefined') {
		let querystring = qs.stringify(uri.queries);
		if (querystring.length > 0) {
			url += '?' + qs.stringify(uri.queries);
		}
	}

	request({
		url: url,
		json: true
	}, (error, response) => {
		if (error) {
			callback(error);
		} else {
			callback(error, response.body);
		}
	});
}