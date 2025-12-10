import "./styles/tokens.css";
import "./styles/styles.css";
import {render} from "@/lib/render";
import {Router} from "@/lib/router";
import {errorRoutes, routes} from "@/routes.ts";
import {Navigation} from "@components/widgets";

const pages = routes.map(route => {
	return {
		title: route.title,
		url: route.path
	};
});

const router = new Router(routes, errorRoutes);
router.ready();
render("#navigation", new Navigation({pages: pages}));
