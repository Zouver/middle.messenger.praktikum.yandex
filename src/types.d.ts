import type {User} from "@/api/type.ts";

declare global {
	interface Window {
		user?: User;
	}
}
