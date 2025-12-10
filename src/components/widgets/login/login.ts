import {Component} from "@/lib/component";
import { getFormData } from "@/lib/utils/form.ts";
import { minLength, required } from "@/lib/validator/validators.ts";
import {Button, InputForm, TextHeading, TextLabel} from "@components/shared";

import {AuthForm} from "../auth-form";

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
			new InputForm({
				value: "",
				placeholder: "Логин",
				type: "text",
				name: "login",
				label: new TextLabel({text:"Логин"}),
				validators: [required(), minLength(5)]
			}),
			new InputForm({
				value: "",
				placeholder: "Пароль",
				type: "password",
				name: "password",
				label: new TextLabel({text:"Пароль"}),
				validators: [required(), minLength(8)]
			})
		];

		const buttons = props.buttons || [
			new Button({text: "Авторизоваться", variant: "primary", type: "submit"}),
			new Button({text: "Нет аккаунта?", variant: "transparent"})
		];

		const onSubmit = (event: SubmitEvent) => {
			event.preventDefault();
			let isValid = true;
			const data = getFormData(event.target as HTMLFormElement);
			console.log(data);

			Object.entries(data).forEach(([key, value]) => {
				const input =inputs.find(input => input.props.name === key) as InputForm;
				isValid = input.validate(value as string);
			});

			if(!isValid) return;
		};

		const authForm = props.authForm || new AuthForm({inputs, buttons, onSubmit});


		super(
			"div",
			{...props, heading, authForm},
			["auth-widget"]
		);
	}

	render() {
		return this.compile(loginTemplate, this.props);
	}
}

