import {isAuth, isNotAuth} from "@/app/isAuth.ts";
import {Paths} from "@/app/paths.ts";
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
		pathname: Paths.Messenger,
		view: ChatPage,
		title: 'Messenger',
		protectedCheck: isAuth
	}),
	new Route({
		pathname: Paths.SignIn,
		view: AuthPage,
		title: 'Login',
		props:{widget: new Login()},
		protectedCheck: isNotAuth
	}),
	new Route({
		pathname: Paths.SignUp,
		view: AuthPage,
		title: 'Signup',
		props:{widget: new Signup()},
		protectedCheck: isNotAuth
	}),
	new Route({
		pathname: Paths.Settings,
		view: ProfilePage,
		title: 'Profile',
		props:{state: "default"},
		protectedCheck: isAuth
	}),
] as Route[];


export const errorRoutes: RouterErrorHandlers ={
	404: new Route({
		pathname: Paths.Error404,
		view: ErrorPage,
		title: 'Error 404',
		props: {code: 404}
	}),
	500: new Route({
		pathname: Paths.Error500,
		view: ErrorPage,
		title: 'Error 500',
		props: {code: 500}
	}),
};
