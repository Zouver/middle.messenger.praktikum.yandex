import { expect } from 'chai';
import sinon from 'sinon';

import { Component } from '@lib/component';

import { render } from './render';

import type {BaseProps} from "@lib/component";

class SimpleComponent extends Component<{ text: string } & BaseProps> {
	constructor(props: { text: string }) {
		super('div', props);
	}

	override render(): DocumentFragment {
		return this.compile('<div class="x">{{text}}</div>', this.props);
	}
}

describe('render()', () => {
	afterEach(() => {
		sinon.restore();
	});

	it('бросает ошибку, если root по селектору не найден', () => {
		document.body.innerHTML = '';
		const c = new SimpleComponent({ text: 'a' });

		expect(() => render('#missing', c)).to.throw();
	});

	it('очищает root, монтирует компонент и вызывает dispatchComponentDidMount()', () => {
		document.body.innerHTML = '<div id="app"><span>old</span></div>';
		const c = new SimpleComponent({ text: 'a' });
		const cdmSpy = sinon.spy(c, 'dispatchComponentDidMount');

		render('#app', c);

		expect(document.querySelector('#app span')).to.equal(null);
		expect(document.querySelector('#app .x')?.textContent).to.equal('a');
		expect(cdmSpy.calledOnce).to.equal(true);
	});
});


