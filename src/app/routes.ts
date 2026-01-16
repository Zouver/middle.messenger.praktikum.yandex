import {isAuth, isNotAuth} from "@/app/isAuth.ts";
import {
	AuthPage,
	ChatPage,
	ErrorPage,
	ProfilePage,
} from "@components/pages";
import {Login, Signup} from "@components/widgets";
import {Route, type RouterErrorHandlers} from "@lib/router";


export const routes =  [
	new Route({
		pathname: "/",
		view: ChatPage,
		title: 'Messenger',
		protectedCheck: isAuth
	}),
	new Route({
		pathname: "/profile",
		view: ProfilePage,
		title: 'Profile',
		props:{state: "default"},
		protectedCheck: isAuth
	}),
	new Route({
		pathname: "/login",
		view: AuthPage,
		title: 'Login',
		props:{widget: new Login()},
		protectedCheck: isNotAuth
	}),
	new Route({
		pathname: "/signup",
		view: AuthPage,
		title: 'Signup',
		props:{widget: new Signup()},
		protectedCheck: isNotAuth
	}),
	new Route({
		pathname: "/change-profile",
		view: ProfilePage,
		title: 'Change profile',
		props:{state: "profile-change"},
		protectedCheck: isAuth
	}),
	new Route({
		pathname: "/change-password",
		view: ProfilePage,
		title: 'Change password',
		props:{state: "password-change"},
		protectedCheck: isAuth
	}),
] as Route[];


export const errorRoutes: RouterErrorHandlers ={
	404: new Route({
		pathname: "/error-404",
		view: ErrorPage,
		title: 'Error 404',
		props: {code: 404}
	}),
	500: new Route({
		pathname: "/error-500",
		view: ErrorPage,
		title: 'Error 500',
		props: {code: 500}
	}),
};
