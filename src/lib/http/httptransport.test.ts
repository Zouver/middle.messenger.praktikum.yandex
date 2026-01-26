import { expect } from 'chai';
import sinon from 'sinon';

import { METHODS } from './consts';
import { HTTPTransport } from './httptransport';

type HeaderMap = Record<string, string>;

class FakeXMLHttpRequest {
	static nextStatus = 200;
	static lastInstance: FakeXMLHttpRequest | null = null;

	public method: string | null = null;
	public url: string | null = null;
	public async = true;
	public requestHeaders: HeaderMap = {};
	public sentBody: any = null;

	public status = 0;
	public response: any = null;
	public responseType: XMLHttpRequestResponseType = '';
	public timeout = 0;
	public withCredentials = false;

	public onabort: ((...args: any[]) => any) | null = null;
	public onerror: ((...args: any[]) => any) | null = null;
	public ontimeout: ((...args: any[]) => any) | null = null;
	public onload: ((...args: any[]) => any) | null = null;

	constructor() {
		FakeXMLHttpRequest.lastInstance = this;
	}

	open(method: string, url: string, async = true) {
		this.method = method;
		this.url = url;
		this.async = async;
	}

	setRequestHeader(k: string, v: string) {
		this.requestHeaders[k] = v;
	}

	send(body: any) {
		this.sentBody = body;

		// emulate async completion
		queueMicrotask(() => {
			this.status = FakeXMLHttpRequest.nextStatus;
			this.response = this.responseType === 'json' ? { ok: true } : 'ok';
			this.onload?.();
		});
	}
}

describe('HTTPTransport', () => {
	beforeEach(() => {
		// @ts-expect-error override XHR in tests
		globalThis.XMLHttpRequest = FakeXMLHttpRequest;
		FakeXMLHttpRequest.nextStatus = 200;
		FakeXMLHttpRequest.lastInstance = null;
	});

	afterEach(() => {
		sinon.restore();
	});

	it('бросает ошибку для относительного url без baseURL', async () => {
		const http = new HTTPTransport({ options: {} });
		let err: unknown = null;
		try {
			await http.get('/x');
		} catch (e) {
			err = e;
		}
		expect(err).to.be.instanceOf(Error);
	});

	it('собирает полный URL из baseURL + endpoint + url', async () => {
		const http = new HTTPTransport({ baseURL: 'https://example.com', endpoint: '/api', options: {} });
		await http.get('/users');

		const xhr = FakeXMLHttpRequest.lastInstance!;
		expect(xhr.url).to.equal('https://example.com/api/users');
	});

	it('GET с query-объектом добавляет параметры в URL', async () => {
		const http = new HTTPTransport({ baseURL: 'https://example.com', endpoint: '/api', options: {} });
		await http.get('/users', { a: 1, b: true });

		const xhr = FakeXMLHttpRequest.lastInstance!;
		expect(xhr.url).to.equal('https://example.com/api/users??a=1&b=true');
		expect(xhr.sentBody).to.equal(null);
	});

	it('POST по умолчанию сериализует объект в JSON и ставит Content-Type', async () => {
		const http = new HTTPTransport({ baseURL: 'https://example.com', endpoint: '/api', options: {} });
		await http.post('/login', { a: 1 });

		const xhr = FakeXMLHttpRequest.lastInstance!;
		expect(xhr.method).to.equal(METHODS.POST);
		expect(xhr.requestHeaders['Content-Type']).to.equal('application/json');
		expect(xhr.sentBody).to.equal(JSON.stringify({ a: 1 }));
	});

	it('FormData отправляется как есть и не форсит JSON Content-Type', async () => {
		const http = new HTTPTransport({ baseURL: 'https://example.com', endpoint: '/api', options: {} });
		const fd = new FormData();
		fd.append('a', '1');

		await http.post('/upload', fd);

		const xhr = FakeXMLHttpRequest.lastInstance!;
		expect(xhr.sentBody).to.equal(fd);
		expect(xhr.requestHeaders['Content-Type']).to.equal(undefined);
	});

	it('неуспешный статус (не 2xx) отклоняет промис', async () => {
		const http = new HTTPTransport({ baseURL: 'https://example.com', endpoint: '/api', options: {} });
		FakeXMLHttpRequest.nextStatus = 400;

		let rejected = false;
		try {
			await http.get('/x');
		} catch {
			rejected = true;
		}

		expect(rejected).to.equal(true);
	});

	it('алиасы методов вызывают _request с правильным HTTP-методом', async () => {
		const http = new HTTPTransport({ baseURL: 'https://example.com', endpoint: '/api', options: {} });
		const spy = sinon.spy(http as any, '_request');

		await http.put('/x', { a: 1 });
		await http.patch('/y', { a: 1 });
		await http.delete('/z');

		expect(spy.getCall(0).args[1].method).to.equal(METHODS.PUT);
		expect(spy.getCall(1).args[1].method).to.equal(METHODS.PATCH);
		expect(spy.getCall(2).args[1].method).to.equal(METHODS.DELETE);
	});
});


