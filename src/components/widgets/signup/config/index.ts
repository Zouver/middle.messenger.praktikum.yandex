import { required, email, passwordStrong } from "@/lib/validator/validators";
import {Button, InputForm, TextHeading, TextLabel} from "@components/shared";

import type { ValidatorFn } from "@/lib/validator/types";

export interface IInput {
	value: string;
	type: HTMLInputElement["type"]
	name: string,
	label: string
	validators?: ValidatorFn[];
}

const inputs: IInput[] = [
	{ value: "", type: "email", name: "email", label: "Почта", validators: [required(), email()] },
	{ value: "", type: "text", name: "login", label: "Логин", validators: [required()] },
	{ value: "", type: "text", name: "first_name", label: "Имя", validators: [required()] },
	{ value: "", type: "text", name: "second_name", label: "Фамилия", validators: [required()] },
	{ value: "",  type: "tel", name: "phone", label: "Телефон", validators: [required()] },
	{ value: "", type: "password", name: "password", label: "Пароль", validators: [required(), passwordStrong()] },
	{ value: "", type: "password", name: "password_submit", label: "Пароль (еще раз)", validators: [required(), passwordStrong()] }
];


export const inputDefault: InputForm[] = inputs.map(input => new InputForm({
	value: input.value,
	placeholder: input.label,
	type: input.type,
	name: input.name,
	label: new TextLabel({text: input.label}),
	validators: input.validators || []
}));

export const buttonsDefault = [
	new Button({text: "Зарегистрироваться", variant: "primary", type: "submit"}),
	new Button({text: "Войти", variant: "transparent"})
];

export const headingDefault = new TextHeading({
	text: "Регистрация",
	variant: "default"
});
