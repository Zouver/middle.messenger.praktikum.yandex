import {Component} from "@/lib";
import {Button, TextLabel, TextHeading, InputForm} from "@components/shared";

import {loginTemplate} from "./login.template.ts";

import type {LoginProps} from "./login.props.ts";
import './login.css';

export class Login extends Component<LoginProps> {
	constructor(props: LoginProps = {}) {
		const heading = props.heading || new TextHeading({
			text: "Вход",
			variant: "default"
		});

		const inputs = props.inputs || [
			new InputForm({value: "", placeholder: "Логин", type: "text", name: "login", label: new TextLabel({text:"Логин"})}),
			new InputForm({value: "", placeholder: "Пароль", type: "password", name: "password", label: new TextLabel({text:"Пароль"})})
		];

		const buttons = props.buttons || [
			new Button({text: "Авторизоваться", variant: "primary", type: "submit"}),
			new Button({text: "Нет аккаунта?", variant: "transparent"})
		];

		super(
			"div",
			{...props, heading, inputs, buttons},
			["auth-widget"]
		);
	}

	render() {
		return this.compile(loginTemplate, this.props);
	}
}

