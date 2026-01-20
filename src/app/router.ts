import {errorRoutes, routes} from "@/app/routes.ts";
import {Router} from "@lib/router";

export const router = new Router(routes, errorRoutes, "#app");
