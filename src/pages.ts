import {chats} from "./consts";
import {messages} from "./consts/messages.ts";
import {profileInformations} from "./consts/profile-information.ts";

export interface IPage {
	url: string;
	title: string;
	[key: string]: any;
}

export const pages: IPage[] = [
	{
		url: "/index.html",
		title: 'Messenger',
		chats: chats,
		messages: messages,
	},
	{
		url: "/profile.html",
		title: 'Profile',
		profileInformations: profileInformations,
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
		errorCode: "404",
		errorContent: "Не туда попали"
	},
	{
		url: "error-500.html",
		title: 'Error 505',
		errorCode: "500",
		errorContent: "Мы уже фиксим"
	}
];



export const getPageData = () => {
	const pageData: {
		[key: string]: IPage;
	} = {};

	for (const page of pages) {
		pageData[page.url] = {...page, pages: pages};
	}

	return pageData;
}


