import {userApi} from "@/api/user.api.ts";
import {router} from "@/app/router.ts";
import {Text} from "@components/shared";

export const changeProfileLinkDefault = new Text({
	text: "Изменить данные",
	variant: "primary"
});

export const changePasswordLinkDefault = new Text({
	text: "Изменить пароль",
	variant: "primary"
});

export const logoutLinkDefault = new Text({
	text: "Выйти",
	variant: "critical",
	events: {
		click: (event) => {
			event.preventDefault();
			userApi.logout();
			router.go('/login');
		}
	}
});
