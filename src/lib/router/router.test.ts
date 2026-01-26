import { expect } from 'chai';
import sinon from 'sinon';

import { Router } from './router';

type FakeRoute = {
	match: (pathname: string) => boolean;
	render: (rootQuery: string) => void;
	leave: () => void;
	getProtectedState: () => Promise<boolean>;
};

const makeRoute = (pathname: string, opts?: Partial<FakeRoute>): FakeRoute => {
	return {
		match: (p: string) => p === pathname,
		render: sinon.spy(),
		leave: sinon.spy(),
		getProtectedState: () => Promise.resolve(true),
		...opts,
	};
};

describe('Router', () => {
	beforeEach(() => {
		document.body.innerHTML = '<div id="app"></div>';
		window.history.replaceState({}, '', '/');
	});

	afterEach(() => {
		sinon.restore();
	});

	it('getRoute() возвращает подходящий маршрут', () => {
		const r1 = makeRoute('/a');
		const r404 = makeRoute('/404');
		const r500 = makeRoute('/500');
		const router = new Router([r1 as any], { 404: r404 as any, 500: r500 as any } as any, '#app');

		expect(router.getRoute('/a')).to.equal(r1 as any);
		expect(router.getRoute('/missing')).to.equal(undefined);
	});

	it('go() делает pushState только если pathname отличается, и рендерит маршрут', async () => {
		const r1 = makeRoute('/a');
		const r404 = makeRoute('/404');
		const r500 = makeRoute('/500');
		const router = new Router([r1 as any], { 404: r404 as any, 500: r500 as any } as any, '#app');

		const pushSpy = sinon.spy(window.history, 'pushState');

		router.go('/a');
		await Promise.resolve();
		expect(pushSpy.calledOnce).to.equal(true);
		expect((r1.render as any).calledOnce).to.equal(true);

		pushSpy.resetHistory();
		router.go('/a');
		await Promise.resolve();
		expect(pushSpy.called).to.equal(false);
		expect((r1.render as any).callCount).to.equal(2);
	});

	it('при отсутствии маршрута рендерится 404', async () => {
		const r1 = makeRoute('/a');
		const r404 = makeRoute('/404');
		const r500 = makeRoute('/500');
		const router = new Router([r1 as any], { 404: r404 as any, 500: r500 as any } as any, '#app');

		router.go('/missing');
		await Promise.resolve();
		expect((r404.render as any).calledOnce).to.equal(true);
	});

	it('protected route: при reject должен сделать go(fallback)', async () => {
		const r1 = makeRoute('/a', { getProtectedState: () => Promise.reject('/login') });
		const r404 = makeRoute('/404');
		const r500 = makeRoute('/500');
		const router = new Router([r1 as any], { 404: r404 as any, 500: r500 as any } as any, '#app');

		const goSpy = sinon.spy(router as any, 'go');
		router.go('/a');

		await Promise.resolve();
		await Promise.resolve();

		expect(goSpy.calledWith('/login')).to.equal(true);
	});

	it('если в обработке маршрута падает исключение — рендерится 500', async () => {
		const r1 = makeRoute('/a', { getProtectedState: () => { throw new Error('boom'); } });
		const r404 = makeRoute('/404');
		const r500 = makeRoute('/500');
		const router = new Router([r1 as any], { 404: r404 as any, 500: r500 as any } as any, '#app');

		router.go('/a');
		await Promise.resolve();
		expect((r500.render as any).calledOnce).to.equal(true);
	});

	it('init() вешает popstate и сразу обрабатывает текущий location.pathname', async () => {
		const r1 = makeRoute('/');
		const r404 = makeRoute('/404');
		const r500 = makeRoute('/500');
		const router = new Router([r1 as any], { 404: r404 as any, 500: r500 as any } as any, '#app');

		const addSpy = sinon.spy(window, 'addEventListener');
		router.init();
		await Promise.resolve();

		expect(addSpy.calledWith('popstate')).to.equal(true);
		expect((r1.render as any).calledOnce).to.equal(true);
	});
});


