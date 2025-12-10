import {Component} from "@lib/component";
import {getFormData} from "@lib/utils";

import {authFormTemplate} from "./auth-form.template.ts";

import type {AuthFormProps} from "./auth-form.props.ts";

import './auth-form.css';

export class AuthForm extends Component<AuthFormProps> {
	constructor(props: AuthFormProps) {

		const onSubmitDefault = (event: SubmitEvent) => {
			event.preventDefault();
			const data = getFormData(event.target as HTMLFormElement);
			console.log(data);
		};


		const events = props.events || {
			"submit": props.onSubmit || onSubmitDefault
		};

		super(
			"form",
			{...props, events},
			["auth-form"]
		);
	}

	render() {
		return this.compile(authFormTemplate, this.props);
	}
}

