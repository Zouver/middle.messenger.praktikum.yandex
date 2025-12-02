import { compile } from "handlebars";
import {v4 as makeUUID} from 'uuid';

import {EventBus} from "@/lib";
import {BaseComponent} from "@lib/component/base-component.ts";

import type {BaseProps} from "@lib/component/types.ts";
import type {EventBusCallback} from "@lib/event-bus/types.ts";



export class Component<TProps extends BaseProps = BaseProps> extends BaseComponent<TProps> {
	constructor(
		tagName = "div",
		props: TProps = {} as TProps,
		classNames: string[] = [],
		attributes: Record<string, string> = {},
	) {
		super();

		const {props: _props, children} = this._getChildren(props);
		this.children = children;
		this.props = this._makePropsProxy({..._props, __id: this._id });
		this.events = this.props.events || {};


		this._id = makeUUID();
		this._classNames = classNames;
		this._meta = {tagName, props: _props, attributes, classNames};
		this._eventBus = new EventBus();
		this._registerEvents(this._eventBus);

		this._eventBus.emit(Component.EVENTS.INIT);
	}

	private _getChildren(_props: TProps) {
		const children: Record<string, Component | Component[]> = {};
		const props = {} as TProps;

		Object.entries(_props).forEach(([key, value]) => {
			if (value instanceof Component) {
				children[key] = value;
			} else if (Array.isArray(value) && value.length > 0 && value[0] instanceof Component) {
				children[key] = value as Component[];
			} else {
				props[key as keyof TProps] = value as TProps[keyof TProps];
			}
		});

		return { children, props } as const;
	}

	private _manageEvents(){
		const {events = {}} = this.props;
		Object.entries(this.events).forEach(([key, value]) => {
			const eventName = key as keyof HTMLElementEventMap;
			const listener = value as EventListener;
			this._element?.removeEventListener(eventName, listener);
		});

		Object.entries(events).forEach(([key, value]) => {
			const eventName = key as keyof HTMLElementEventMap;
			const listener = value as EventListener;
			this._element?.addEventListener(eventName, listener);
		});
	}

	private _setClasses(){
		const classNames = this._classNames;

		if(classNames && this._element){
			this._element.className = classNames.join(" ");
		}
	}

	private _setAttributes(){
		const {attributes = {}} = this._meta!;

		if(attributes && this._element){
			Object.entries(attributes).forEach(([key, value]) => {
				this._element?.setAttribute(key, value);
			});
		}
	}

	private _registerEvents(eventBus: EventBus): void {
		eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this) as EventBusCallback);
		eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	private _createResources(): void {
		if (!this._meta) {
			throw new Error("Meta not initialized.");
		}

		const { tagName } = this._meta;
		this._element = this._createDocumentElement(tagName as keyof HTMLElementTagNameMap);
	}

	private _createDocumentElement<K extends keyof HTMLElementTagNameMap>(tagName: K): HTMLElementTagNameMap[K] {
		const element = document.createElement(tagName);
		element.setAttribute('data-id', this._id);
		return element;
	}

	private _componentDidMount(): void {
		this.componentDidMount();
	}

	private _componentDidUpdate(oldProps: TProps, newProps: TProps): void {
		const needRerender = this.componentDidUpdate(oldProps, newProps);
		if (!needRerender) return;
		this._render();
	}

	private _render(): void {
		if (!this._element) {
			throw new Error("Element not initialized.");
		}
		this._manageEvents();
		this._setAttributes();
		const component = this.render();
		this._element.innerHTML = '';
		this._element.appendChild(component);
	}

	public compile(template: string, props: TProps): DocumentFragment {
		const propsAndStubs = { ...props };

		Object.entries(this.children).forEach(([key, child]) => {
			if (Array.isArray(child)) {
				propsAndStubs[key as keyof TProps] = child.map(c => `<div data-id="${c._id}"></div>`) as unknown as TProps[keyof TProps];
			} else {
				propsAndStubs[key as keyof TProps] = `<div data-id="${child._id}"></div>` as TProps[keyof TProps];
			}
		});

		const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
		const fragmentTemplate = compile(template);
		fragment.innerHTML = fragmentTemplate(propsAndStubs);

		Object.entries(this.children).forEach(([key, child]) => {
			if (Array.isArray(child)) {
				child.forEach(c => {
					const stub = fragment.content.querySelector(`[data-id="${c._id}"]`);
					if (!stub) {
						console.error(`Template syntax error: stub not found for child component with id ${c._id} in array "${key}"`);
						return;
					}
					stub.replaceWith(c.getContent());
				});
			} else {
				const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
				if (!stub) {
					console.error(`Template syntax error: stub not found for child component with id ${child._id}`);
					return;
				}
				stub.replaceWith(child.getContent());
			}
		});

		return fragment.content;
	}

	public init(): void {
		this._createResources();
		this._setClasses();
		this._eventBus.emit(Component.EVENTS.FLOW_RENDER);
	}

	public dispatchComponentDidMount(): void {
		this._eventBus.emit(Component.EVENTS.FLOW_CDM);
	}

	public setProps(nextProps: Partial<TProps>): void {
		if (!nextProps) return;
		Object.assign(this.props, nextProps);
	}

	get element(): HTMLElement {
		if (!this._element) {
			throw new Error("Element not initialized.");
		}
		return this._element;
	}

	public getContent(): HTMLElement {
		return this.element;
	}

	private _makePropsProxy(props: TProps): TProps {
		const self = this;

		return new Proxy(props, {
			get(target, prop) {
				const value = target[prop as keyof TProps];
				return typeof value === "function" ? value.bind(target) : value;
			},
			set(target, prop, value) {
				const oldProps = { ...target };
				if (target[prop as keyof TProps] !== value) {
					target[prop as keyof TProps] = value;
					self._eventBus.emit(
						Component.EVENTS.FLOW_CDU,
						oldProps,
						{ ...target }
					);
				}
				return true;
			},
			deleteProperty() {
				throw new Error("Нет доступа к удалению props");
			}
		});
	}

	public show(): void {
		this.getContent().style.display = "block";
	}

	public hide(): void {
		this.getContent().style.display = "none";
	}
}
