import {Component} from "@/lib";
import {buttonsDefault, headingDefault, inputDefault} from "@components/widgets/signup/config";
import {signupTemplate} from "@components/widgets/signup/signup.template.ts";

import type {SignupProps} from "@components/widgets/signup/signup.props.ts";


export class Signup extends Component<SignupProps> {
	constructor(props: SignupProps = {}) {
		const heading = props.heading || headingDefault;
		const inputs = props.inputs || inputDefault
		const buttons = props.buttons || buttonsDefault;

		super(
			"div",
			{...props, heading, inputs, buttons},
			["auth-widget"]
		);
	}

	render() {
		return this.compile(signupTemplate, this.props);
	}
}

