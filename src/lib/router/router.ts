import {Route} from "@lib/router/route.ts";

import type {RouterErrorHandlers} from "@lib/router/types.ts";


export class Router {
	private routes: Route[] = [];
	private history = window.history;
	private rootQuery: string | null = null;
	private readonly _errorRoutes: RouterErrorHandlers;
	private _currentRoute: Route | null = null;

	constructor(routes: Route[], errorRoutes: RouterErrorHandlers, rootQuery: string) {
		this.routes = [...routes, ...Object.values(errorRoutes)];
		this.history = window.history;
		this._currentRoute = null;
		this._errorRoutes = errorRoutes;
		this.rootQuery = rootQuery;
	}

	public init(){
		window.addEventListener("popstate", () => this._onRoute(location.pathname));
		this._onRoute(location.pathname);
	}

	public getRoute(pathname: string) {
		return this.routes.find(route => route.match(pathname));
	}

	public go(pathname: string) {
		if (location.pathname !== pathname) {
			this.history.pushState({}, "", pathname);
		}
		this._onRoute(pathname);
	}

	public back() {
		this.history.back();
	}

	public forward() {
		this.history.forward();
	}

	private _onRoute(pathname: string) {
		const route: Route = (this.getRoute(pathname) || this._errorRoutes[404]) as Route;
		this._currentRoute?.leave();

		try {
			route.getProtectedState().then(() => {
				route.render(this.rootQuery!);
				this._currentRoute = route;
			}).catch((fallback: string) => {
				this.go(fallback);
			});
		} catch (e) {
			this._errorRoutes[500].render(this.rootQuery!);
			this._currentRoute = this._errorRoutes[500] as unknown as Route;
		}
	}
}
