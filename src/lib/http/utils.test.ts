import { expect } from 'chai';

import { METHODS } from './consts';
import { buildQueryURL, getContentType, isHTTPDict, queryStringify } from './utils';

describe('http utils', () => {
	it('queryStringify() сериализует объект в query-string', () => {
		expect(queryStringify({ a: 1, b: true, c: 'x' })).to.equal('?a=1&b=true&c=x');
	});

	it('queryStringify() бросает ошибку для не-объекта', () => {
		expect(() => queryStringify(null as any)).to.throw('Data must be object');
		expect(() => queryStringify('x' as any)).to.throw('Data must be object');
	});

	it('buildQueryURL() добавляет параметры к url', () => {
		expect(buildQueryURL('/api', { a: 1 })).to.equal('/api??a=1');
	});

	it('isHTTPDict() true только для словаря с примитивами string|number|boolean', () => {
		expect(isHTTPDict({ a: 1, b: true, c: 'x' })).to.equal(true);
		expect(isHTTPDict({ a: { x: 1 } })).to.equal(false);
		expect(isHTTPDict([1, 2, 3] as any)).to.equal(false);
		expect(isHTTPDict(null)).to.equal(false);
	});

	it('getContentType() возвращает null для GET или отсутствия headers', () => {
		expect(getContentType(METHODS.GET, { 'Content-Type': 'application/json' })).to.equal(null);
		expect(getContentType(METHODS.POST, undefined)).to.equal(null);
	});

	it('getContentType() вытаскивает тип из Content-Type (без учёта регистра)', () => {
		expect(getContentType(METHODS.POST, { 'Content-Type': 'application/json' })).to.equal('json');
		expect(getContentType(METHODS.POST, { 'content-type': 'multipart/form-data' })).to.equal('form-data');
	});
});


