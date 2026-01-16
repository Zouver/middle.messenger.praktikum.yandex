import {METHODS} from "@lib/http/consts.ts";

export type HTTPTransportData = Record<string, unknown> | XMLHttpRequestBodyInit

export interface HTTPTransportOptions{
	headers?: Record<string, string>;
	method: METHODS;
	data?: HTTPTransportData;
	timeout?: number;
	responseType?: XMLHttpRequestResponseType
}

export type HTTPTransportOptionsShort =  Omit<HTTPTransportOptions, 'method' | "data">;

export interface HTTPTransportInit{
	endpoint?: string
	baseURL?: string
	options?: HTTPTransportOptionsShort
}

export type HTTPMethod = (url: string, data?: HTTPTransportData, options?: HTTPTransportOptionsShort) => Promise<XMLHttpRequest>
