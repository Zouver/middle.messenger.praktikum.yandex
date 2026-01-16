import { email, minLength, required } from "@/lib/validator/validators";

import type {User} from "@/api/type.ts";
import type {ValidatorFn} from "@lib/validator";

export interface FormOption {
	type: string;
	title: string;
	validators: ValidatorFn[]
}

export type Informations = Record<keyof Omit<User, "id"| "avatar">, FormOption>

export const informations: Informations = {
	email: {
		type: "email",
		title: "Почта",
		validators: [required(), email()]
	},
	login: {
		type: "text",
		title: "Логин",
		validators: [required(), minLength(4)]
	},
	first_name: {
		type: "text",
		title: "Имя",
		validators: [required(), minLength(2)]
	},
	second_name: {
		type: "text",
		title: "Фамилия",
		validators: [required(), minLength(2)]
	},
	display_name: {
		type: "text",
		title: "Имя в чате",
		validators: [required(), minLength(2)]
	},
	phone: {
		type: "tel",
		title: "Телефон",
		validators: [required()]
	}
};

