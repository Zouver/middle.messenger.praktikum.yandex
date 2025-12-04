import {Component} from "@/lib/component";
import { getFormData } from "@/lib/utils/form.ts";
import {AuthForm} from "@components/widgets";

import {buttonsDefault, headingDefault, inputDefault} from "./config";
import {signupTemplate} from "./signup.template.ts";

import type {SignupProps} from "./signup.props.ts";
import type { InputForm } from "@/components/shared/index.ts";



export class Signup extends Component<SignupProps> {
	constructor(props: SignupProps = {}) {
		const heading = props.heading || headingDefault;
		const inputs = props.inputs || inputDefault;
		const buttons = props.buttons || buttonsDefault;


		const onSubmit = (event: SubmitEvent) => {
			event.preventDefault();
			let isValid = true;
			const data = getFormData(event.target as HTMLFormElement);
			console.log(data);

			Object.entries(data).forEach(([key, value]) => {
				const input = inputs.find(input => input.props.name === key) as InputForm;
				isValid = input.validate(value as string);
			});

			if(!isValid) return;
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

