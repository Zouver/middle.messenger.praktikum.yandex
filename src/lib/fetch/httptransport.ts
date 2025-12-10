import {METHODS} from "@lib/fetch/consts.ts";
import {buildQueryURL, isStringDict} from "@lib/fetch/utils.ts";

import type {HTTPMethod, HTTPTransportOptions} from "@lib/fetch/types.ts";

export class HTTPTransport {
	get: HTTPMethod = (
		url ,
		options = {}
	) => {
		return this.request(url, {...options, method: METHODS.GET}, options.timeout);
	};

	post: HTTPMethod = (url, options = {}) => {
		return this.request(url, {...options, method: METHODS.POST}, options.timeout);
	};

	put: HTTPMethod = (url, options = {}) => {
		return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
	};

	patch: HTTPMethod = (url, options = {}) => {
		return this.request(url, {...options, method: METHODS.PATCH}, options.timeout);
	};


	delete: HTTPMethod = (url ,options = {}) => {
		return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
	};


	request = (
		url: string,
		options: HTTPTransportOptions = {},
		timeout = 5000
	) => {
		const {
			headers = {},
			method,
			data,
		} = options;

		return new Promise(function(resolve, reject) {
			if (!method) {
				reject('No method');
				return;
			}

			let _data: unknown = data;
			let _url: string = url;

			const xhr = new XMLHttpRequest();
			const isGet = method === METHODS.GET;

			if (isStringDict(data)){
				_url = isGet && !!data ? buildQueryURL(url, data): url;
				_data = JSON.stringify(data);
			}

			xhr.open(method, _url);

			Object.keys(headers).forEach(key => {
				xhr.setRequestHeader(key, headers[key]);
			});

			xhr.onload = function() {
				resolve(xhr);
			};

			xhr.onabort = reject;
			xhr.onerror = reject;

			xhr.timeout = timeout;
			xhr.ontimeout = reject;

			if (isGet || !data) {
				xhr.send();
			} else {
				xhr.send(_data as XMLHttpRequestBodyInit);
			}
		});
	};
}
