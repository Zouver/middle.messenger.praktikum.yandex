import {Button, InputForm, TextHeading, TextLabel} from "@components/shared";

export interface IInput {
	value: string;
	type: HTMLInputElement["type"]
	name: string,
	label: string
}

const inputs: IInput[] = [
	{ value: "", type: "email", name: "email", label: "Почта" },
	{ value: "", type: "text", name: "login", label: "Логин" },
	{ value: "", type: "text", name: "first_name", label: "Имя" },
	{ value: "", type: "text", name: "second_name", label: "Фамилия" },
	{ value: "",  type: "tel", name: "phone", label: "Телефон" },
	{ value: "", type: "password", name: "password", label: "Пароль" },
	{ value: "", type: "password", name: "password_submit", label: "Пароль (еще раз)" }
];


export const inputDefault: InputForm[] = inputs.map(input => new InputForm({
	value: input.value,
	placeholder: input.label,
	type: input.type,
	name: input.name,
	label: new TextLabel({text: input.label})
}));

export const buttonsDefault = [
	new Button({text: "Зарегистрироваться", variant: "primary", type: "submit"}),
	new Button({text: "Войти", variant: "transparent"})
];

export const headingDefault = new TextHeading({
	text: "Регистрация",
	variant: "default"
});
