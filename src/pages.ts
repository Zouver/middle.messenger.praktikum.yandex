import {chats} from "./consts";
import {messages} from "./consts/messages.ts";
import {profileInformations} from "./consts/profile-information.ts";

export const pageData: Record<string, object> = {
	'/index.html': {
		title: 'Messenger',
		chats: chats,
		messages: messages
	},
	'/profile.html': {
		title: 'Profile',
		profileInformations: profileInformations,
	},
	'/login.html': {
		title: 'Login',
	},
	'/signup.html': {
		title: 'Signup',
	},
	'/error-404.html': {
		title: 'Error',
		errorCode: "404",
		errorContent: "Не туда попали"
	},
	'/error-500.html': {
		title: 'Error',
		errorCode: "500",
		errorContent: "Мы уже фиксим"
	}
};
