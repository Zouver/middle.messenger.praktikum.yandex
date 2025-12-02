import {errorRoutes} from "@/routes.ts";

import type {Route, RouterErrorHandlers} from "@lib/router/types.ts";



export class Router {
	private routes: Route[] = [];
	private errorRoutes: Partial<Record<404 | 500, string>> = {};

	constructor(routes: Route[], errorHandler: RouterErrorHandlers) {
		window.addEventListener("popstate", () => this.handleRoute());
		document.addEventListener("click", this.handleLinkClick.bind(this));

		routes.forEach((route: Route) => {
			this.routes.push(route);
		});

		Object.entries(errorHandler).forEach(([key, route] ) => {
			const _key = key as unknown as 404 | 500;
			const _route = route as Route;
			this.routes.push(_route);
			this.errorRoutes[_key] = _route.path;
		});

	}

	ready(){
		this.navigate(location.pathname);
	}

	navigate(path: string) {
		const route = this.routes.find(r => r.path === path);
		const _path = route ? path : errorRoutes["404"].path;
		history.pushState({}, "", _path);
		this.handleRoute();
	}

	private handleRoute() {
		const current = location.pathname;
		const route = this.routes.find(r => r.path === current);
		document.title = route?.title || document.title;

		if (route) {
			route.handler();
		} else {
			console.warn("Route not found:", current);
		}
	}

	private handleLinkClick(e: MouseEvent) {
		const target = e.target as HTMLElement;

		if (target.tagName === "A") {
			const href = (target as HTMLAnchorElement).getAttribute("href");

			if (href && href.startsWith("/")) {
				e.preventDefault();
				this.navigate(href);
			}
		}
	}
}
