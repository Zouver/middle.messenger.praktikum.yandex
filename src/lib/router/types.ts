export type RouteHandler = () => void;

export interface Route {
	path: string;
	handler: RouteHandler;
	title: string;
}

export interface RouterErrorHandlers {
	404: Route
	500: Route
}

