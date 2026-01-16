import {METHODS} from "@lib/http/consts.ts";
import {buildQueryURL, getContentType, isHTTPDict} from "@lib/http/utils.ts";

import type {HTTPMethod, HTTPTransportInit, HTTPTransportOptions, HTTPTransportOptionsShort} from "@lib/http/types.ts";

export class HTTPTransport {
	public baseURL?: string;
	public endpoint?: string;
	public options: HTTPTransportOptionsShort;
	public xhr: XMLHttpRequest | null = null;

	constructor({
		baseURL,
    endpoint,
    options,
	}: HTTPTransportInit) {
		this.baseURL = baseURL;
		this.endpoint = endpoint;
		this.options = options || {};
	}

	private _aliasMethodRequest: (method: METHODS) => HTTPMethod = (method: METHODS) => {
		return (url , data, options = {}) => this._request(url, {...options, method, data});
	};

	private _getUrl(url: string){
		const isValidUrl = url.startsWith("http");

		if(isValidUrl){
			return url;
		}

		if(this.baseURL){
			return `${this.baseURL}${this.endpoint ?? ''}${url}`;
		}

		throw new Error(`${url} is not a valid URL. Use Base URL instead`);
	}

	public _request(url: string, {
		data,
		method=METHODS.GET,
		headers,
		timeout=5000,
		responseType="json"
	}: HTTPTransportOptions) {

		const contentType = getContentType(method, headers) || "json";
		const isGet = method === METHODS.GET;
		const isJson = contentType === "json";

		let _url = this._getUrl(url);
		let _data: XMLHttpRequestBodyInit| null = null;

		return new Promise<XMLHttpRequest>((resolve, reject) => {
			if (!method) {
				reject('No method');
				return;
			}

			const xhr = new XMLHttpRequest();

			if (isHTTPDict(data) && isGet){
				_url = buildQueryURL(_url, data);
			}


			_data = (isJson && data) ?
				JSON.stringify(data) :
				data as XMLHttpRequestBodyInit | null;

			xhr.open(method, _url);

			const _headers = {
				...(isJson ? { "Content-Type": "application/json" } : {}),
				...(headers || {})
			};

			Object.entries(_headers).forEach(([k, v]) =>
				xhr.setRequestHeader(k, v)
			);

			const _onRequestLoad = () => {
				this.xhr = xhr;
				const isSuccess = xhr.status >= 200 && xhr.status < 300;

				if(isSuccess){
					resolve(xhr);
				}else {
					reject(xhr);
				}
			};

			xhr.onabort = reject;
			xhr.onerror = reject;
			xhr.timeout = timeout;
			xhr.ontimeout = reject;
			xhr.onload = _onRequestLoad;
			xhr.withCredentials = true;

			xhr.responseType = responseType;
			xhr.send(_data);
		});
	};

	public get: HTTPMethod = this._aliasMethodRequest(METHODS.GET);

	public post: HTTPMethod = this._aliasMethodRequest(METHODS.POST);

	public put: HTTPMethod = this._aliasMethodRequest(METHODS.PUT);

	public patch: HTTPMethod = this._aliasMethodRequest(METHODS.PATCH);

	public delete: HTTPMethod = this._aliasMethodRequest(METHODS.DELETE);

}
