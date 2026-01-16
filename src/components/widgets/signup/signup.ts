import {userApi, type UserCreateData} from "@/api/user.api.ts";
import {router} from "@/app/router.ts";
import {Component} from "@/lib/component";
import { getFormData } from "@/lib/utils/form.ts";
import {Text} from "@components/shared";
import {AuthForm} from "@components/widgets";
import {formValidate} from "@lib/validator/formValidate.ts";

import {buttonsDefault, headingDefault, inputDefault} from "./config";
import {signupTemplate} from "./signup.template.ts";

import type {SignupProps} from "./signup.props.ts";

export class Signup extends Component<SignupProps> {
	constructor(props: SignupProps = {}) {
		const heading = props.heading || headingDefault;
		const inputs = props.inputs || inputDefault;
		const buttons = props.buttons || buttonsDefault;


		const onSubmit = (event: SubmitEvent) => {
			event.preventDefault();
			const data = getFormData<UserCreateData>(event.target as HTMLFormElement);
			console.log(data);

			const isValid = formValidate(data, inputs);
			if(!isValid) return;

			userApi.create(data).then(() => {
				console.log("Signup successful");
				router.go('/');
			}).catch((xhr) => {
				console.warn("Signup failed: " + xhr?.response?.reason);
				const authFormKey = Object.keys(this.props).find(key => key === 'authForm');
				if(!authFormKey) return;
				const authForm = this.props[authFormKey] as AuthForm;
				console.log(authForm.props);
				authForm.setProps({...authForm.props, error: new Text({text: xhr?.response?.reason || "Произошла ошибка", variant: "critical"})});
			});
		};

		const authForm = props.authForm || new AuthForm({inputs: inputs, buttons: buttons, onSubmit});
		super(
			"div",
			{...props, heading, authForm},
			["auth-widget"]
		);
	}

	render() {
		return this.compile(signupTemplate, this.props);
	}
}

