import {METHODS} from "@lib/http/consts.ts";

import type {HTTPTransportOptions} from "@lib/http/types.ts";

export const queryStringify = (data:  Record<string, string | number | boolean>) => {
	if (typeof data !== 'object') {
		throw new Error('Data must be object');
	}

	const keys = Object.keys(data);
	return keys.reduce((result, key, index) => {
		return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
	}, '?');
};


export const buildQueryURL = (
	url: string,
	data: Record<string, string | number | boolean>) => {

	const params = queryStringify(data);
	return `${url}?${params}`;
};


export const isHTTPDict = (value: unknown): value is Record<string, string | number | boolean> => {
	if (value !== null && typeof value === 'object') {
		return Object.values(value).every((v) => ["string","boolean","number"].includes(typeof v));
	}
	return false;
};

type getContentTypeUtil = (method: METHODS, headers: HTTPTransportOptions["headers"]) => string | null;

export const getContentType: getContentTypeUtil= (method, headers) => {
	if(!headers) {
		return null;
	}

	if(method === METHODS.GET){
		return null;
	}

	const header = Object.keys(headers).find(
		(key) => key.toLowerCase() === "content-type"
	);

	if(!header) {
		return null;
	}

	return headers[header].split("/")[1];
};
