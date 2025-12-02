import {render} from "@/lib";
import {AuthPage, ChatPage, ErrorPage, ProfilePage} from "@components/pages";
import {Login, Signup} from "@components/widgets";

import type {Route, RouterErrorHandlers} from "@lib/router";

export const routes: Route[] = [
	{
		path: "/",
		title: 'Messenger',
		handler:  () => render("#app", new ChatPage())
	},
	{
		path: "/profile",
		title: 'Profile',
		handler: () => render("#app", new ProfilePage({state: "default"}))
	},
	{
		path: "/login",
		title: 'Login',
		handler: () => render("#app", new AuthPage({widget: new Login()}))
	},
	{
		path: "/signup",
		title: 'Signup',
		handler: () => render("#app", new AuthPage({widget: new Signup()}))
	},
	{
		path: "/change-profile",
		title: 'Change profile',
		handler:  () => render("#app", new ProfilePage({state: "profile-change"}))
	},
	{
		path: "/change-password",
		title: 'Change password',
		handler:  () => render("#app", new ProfilePage({state: "password-change"}))
	}
];


export const errorRoutes: RouterErrorHandlers ={
	404: {
		path: "/error-404",
		title: 'Error 404',
		handler: () => render("#app", new ErrorPage({code: 404}))
	},
	500: {
		path: "/error-500",
		title: 'Error 500',
		handler: () => render("#app", new ErrorPage({code: 500}))
	},
};
