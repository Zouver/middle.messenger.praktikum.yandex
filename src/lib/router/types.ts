import {ErrorPage, type ErrorPageProps} from "@components/pages";
import {Route} from "@lib/router/route.ts";

export type RouteHandler = () => void;

export interface RouterErrorHandlers {
	404: Route<ErrorPageProps, ErrorPage>
	500: Route<ErrorPageProps,ErrorPage>
}

export type ProtectedRouteCheck = () => Promise<boolean>
