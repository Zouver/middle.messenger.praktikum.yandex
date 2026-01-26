import { expect } from 'chai';
import sinon from 'sinon';

import {type BaseProps, Component} from '@lib/component';

import { Route } from './route';


type TestProps = { text?: string } & BaseProps;

class TestComponent extends Component<TestProps > {
	constructor(props: TestProps) {
		super('div', props);
	}

	override render(): DocumentFragment {
		return this.compile('<div class="t">{{text}}</div>', this.props);
	}
}

describe('Route', () => {
	beforeEach(() => {
		document.body.innerHTML = '<div id="app"></div>';
		document.title = '';
	});

	afterEach(() => {
		sinon.restore();
	});

	it('match() возвращает true только при точном совпадении pathname', () => {
		const route = new Route({ pathname: '/a', view: TestComponent, props: { text: 'x' }, title: 'A' });
		expect(route.match('/a')).to.equal(true);
		expect(route.match('/b')).to.equal(false);
	});

	it('render() при первом вызове создаёт компонент и монтирует его в root', () => {
		const route = new Route({ pathname: '/a', view: TestComponent, props: { text: 'hello' }, title: 'A' });
		route.render('#app');

		const el = document.querySelector('#app .t');
		expect(el).to.not.equal(null);
		expect(el?.textContent).to.equal('hello');
	});

	it('render() при повторном вызове показывает существующий компонент и выставляет title', () => {
		const route = new Route({ pathname: '/a', view: TestComponent, props: { text: 'hello' }, title: 'A' });
		route.render('#app');

		const showSpy = sinon.spy((route as unknown as { _component: Component })._component!, 'show');
		route.render('#app');

		expect(showSpy.calledOnce).to.equal(true);
		expect(document.title).to.equal('A');
	});

	it('leave() удаляет DOM-элемент компонента', () => {
		const route = new Route({ pathname: '/a', view: TestComponent, props: { text: 'hello' }, title: 'A' });
		route.render('#app');
		expect(document.querySelector('#app .t')).to.not.equal(null);

		route.leave();
		expect(document.querySelector('#app .t')).to.equal(null);
	});
});


