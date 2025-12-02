import {METHODS} from "@lib/fetch/consts.ts";

export type HTTPTransportData = Record<string, string> | XMLHttpRequestBodyInit
export interface HTTPTransportOptions{
	headers?: Record<string, string>,
	method?: METHODS,
	data?: HTTPTransportData
}

export type HTTPTransportOptionsShort = {
	timeout?: number
} & Omit<HTTPTransportOptions, 'method'>;

export type HTTPMethod = (url: string, options?: HTTPTransportOptionsShort) => Promise<unknown>
