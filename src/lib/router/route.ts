import {type BaseProps, Component} from "@lib/component";
import {render} from "@lib/render.ts";

import type {ProtectedRouteCheck} from "@lib/router/types.ts";

type ComponentConstructor<Props, Component> = new (props: Props) => Component;

export interface RouteOptions<Props, Component>{
	pathname: string;
	view: ComponentConstructor<Props, Component>;
	props?: Props;
	title: string;
	protectedCheck?: ProtectedRouteCheck
}

export class Route<P extends BaseProps = BaseProps, C extends Component = Component> {
	protected readonly _pathname: string;
	private readonly _componentClass: ComponentConstructor<P, C>;
	private _component: Component | null;
	private _props: P;
	private _title: string;
	public getProtectedState: ProtectedRouteCheck;

	constructor({pathname, view, props, title, protectedCheck}: RouteOptions<P, C>) {
		this._pathname = pathname;
		this._componentClass = view;
		this._component = null;
		this._props = (props ?? {}) as P;
		this._title = title;
		this.getProtectedState = protectedCheck ?? this._defaultProtectedState;
	}

	private _defaultProtectedState() {
		return Promise.resolve(true);
	}

	private _setTitle(title?: string) {
		if(!title) {
			return;
		}

		document.title = title;
	}

	public leave() {
		if (this._component) {
			this._component.getContent().remove();
			this._component = null;
		}
	}

	public match(pathname: string) {
		return pathname === this._pathname;
	}

	public render(query: string) {
		if (!this._component) {
			this._component = new this._componentClass(this._props);
			render(query, this._component);
			return;
		}

		this._setTitle(this._title);
		this._component.show();
	}
}
