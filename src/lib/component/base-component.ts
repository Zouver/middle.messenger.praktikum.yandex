import {Component} from '@/lib/component';
import {EventBus} from '@/lib/event-bus';

import type {Events, Meta} from "@lib/component/types.ts";

export abstract class BaseComponent<TProps> {
	static EVENTS = {
		INIT: "init",
		FLOW_CDM: "flow:component-did-mount",
		FLOW_CDU: "flow:component-did-update",
		FLOW_RENDER: "flow:render"
	} as const;

	public props!: TProps;
	public events!: Events;
	public children!: Record<string, Component | Component[]>;

	protected _id!: string;
	protected _eventBus!: EventBus;
	protected _classNames!: string[];

	public abstract dispatchComponentDidMount(): void;
	public abstract setProps(nextProps: Partial<TProps>): void;
	public abstract show(): void;
	public abstract hide(): void;

	protected _element: HTMLElement | null = null;
	protected _meta: Meta | null = null;

	componentDidUpdate(_oldProps: TProps, _newProps: TProps): boolean {return true;}
	componentDidMount(): void {}
	render(): DocumentFragment {return document.createDocumentFragment();}
}
