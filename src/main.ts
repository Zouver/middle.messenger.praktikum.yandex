import "./styles/tokens.css";
import "./styles/styles.css";
import {Router} from "@/lib";
import {errorRoutes, routes} from "@/routes.ts";

const router = new Router(routes, errorRoutes);
router.ready();
