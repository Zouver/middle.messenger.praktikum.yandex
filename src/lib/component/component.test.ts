import { expect } from 'chai';
import * as sinon from 'sinon';

import {Component} from "@lib/component/component.ts";

import type {BaseProps} from "@lib/component/types.ts";

class TextComponent extends Component<{ text: string } & BaseProps> {
	constructor(props: { text: string }) {
		super('div', props);
	}

	override render(): DocumentFragment {
		return this.compile('<div class="text">{{text}}</div>', this.props);
	}
}

class ParentWithChild extends Component<{ child: Component } & BaseProps> {
	constructor(props: { child: Component }) {
		super('div', props);
	}

	override render(): DocumentFragment {
		return this.compile('<div class="parent">{{{child}}}</div>', this.props);
	}
}

class ParentWithChildren extends Component<{ children: Component[] }& BaseProps> {
	constructor(props: { children: Component[] }) {
		super('div', props);
	}

	override render(): DocumentFragment {
		return this.compile('<div class="parent">{{{children}}}</div>', this.props);
	}
}

describe('Component / templating', () => {
	beforeEach(() => {
		document.body.innerHTML = '<div id="app"></div>';
	});

	afterEach(() => {
		sinon.restore();
	});

	it('compile() подставляет значения из props в Handlebars-шаблон', () => {
		const c = new TextComponent({ text: 'hello' });
		const fragment = c.compile('<span class="v">{{text}}</span>', c.props);
		const host = document.createElement('div');
		host.appendChild(fragment);
		expect(host.querySelector('.v')?.textContent).to.equal('hello');
	});

	it('compile() заменяет заглушку на DOM дочернего компонента и вызывает CDM у ребёнка', () => {
		const child = new TextComponent({ text: 'child' });
		const cdmSpy = sinon.spy(child, 'dispatchComponentDidMount');

		const parent = new ParentWithChild({ child });
		const fragment = parent.render();

		const host = document.createElement('div');
		host.appendChild(fragment);

		expect(host.querySelector('.parent .text')?.textContent).to.equal('child');
		expect(cdmSpy.calledOnce).to.equal(true);
	});

	it('compile() корректно заменяет заглушки для массива дочерних компонентов', () => {
		const c1 = new TextComponent({ text: 'a' });
		const c2 = new TextComponent({ text: 'b' });
		const parent = new ParentWithChildren({ children: [c1, c2] });

		const fragment = parent.render();
		const host = document.createElement('div');
		host.appendChild(fragment);

		const texts = Array.from(host.querySelectorAll('.text')).map((n) => n.textContent);
		expect(texts).to.deep.equal(['a', 'b']);
	});

	it('setProps() триггерит обновление и перерендер', () => {
		const c = new TextComponent({ text: 'a' });
		const renderSpy = sinon.spy(c as any, '_render');

		c.setProps({ text: 'b' });
		expect(renderSpy.called).to.equal(true);
	});

	it('show()/hide() переключают display и isMount', () => {
		const c = new TextComponent({ text: 'a' });
		c.init();

		c.hide();
		expect(c.isMount).to.equal(false);
		expect(c.getContent().style.display).to.equal('none');

		c.show();
		expect(c.isMount).to.equal(true);
		expect(c.getContent().style.display).to.equal('block');
	});
});


