import {userApi} from "@/api/user.api.ts";
import {router} from "@/app/router.ts";
import {Component} from "@/lib/component";
import { getFormData } from "@/lib/utils/form.ts";
import { minLength, required } from "@/lib/validator/validators.ts";
import {Button, InputForm, TextHeading, TextLabel, Text} from "@components/shared";
import {formValidate} from "@lib/validator/formValidate.ts";

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
			new Button({text: "Нет аккаунта?", variant: "transparent", events: {
				click: (e) => {
					e.preventDefault();
					router.go("/signup");
				}
			}})
		];

		const onSubmit = (event: SubmitEvent) => {
			event.preventDefault();
			const data = getFormData<{login: string, password: string}>(event.target as HTMLFormElement);
			console.log(data);

			const isValid = formValidate(data, inputs);
			if(!isValid) return;

			userApi.login(data.login, data.password).then(() => {
				userApi.request().then(console.log);
				console.log("Success login");
				router.go('/');
			}).catch((xhr) => {
				console.warn("Login failed: " + xhr?.response?.reason);
				const authFormKey = Object.keys(this.props).find(key => key === 'authForm');
				if(!authFormKey) return;
				const authForm = this.props[authFormKey] as AuthForm;
				console.log(authForm.props);
				authForm.setProps({...authForm.props, error: new Text({text: xhr?.response?.reason || "Произошла ошибка", variant: "critical"})});
			});
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

