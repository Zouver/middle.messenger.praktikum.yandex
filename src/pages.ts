export interface IPage {
	url: string;
	title: string;
}

export const pages: IPage[] = [
	{
		url: "/index.html",
		title: 'Messenger',
	},
	{
		url: "/profile.html",
		title: 'Profile',
	},
	{
		url: "/login.html",
		title: 'Login',
	},
	{
		url: "/signup.html",
		title: 'Signup',
	},
	{
		url: "/error-404.html",
		title: 'Error 404',
	},
	{
		url: "/error-500.html",
		title: 'Error 505',
	},
	{
		url: "/change-profile.html",
		title: 'Change profile',
	},
	{
		url: "/change-password.html",
		title: 'Change password',
	}
];
