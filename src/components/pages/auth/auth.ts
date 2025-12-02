
import {Component} from "@/lib/component";

import {authPageTemplate} from "./auth.template.ts";

import type {AuthPageProps} from "./auth.props.ts";

import './auth.css';

export class AuthPage extends Component<AuthPageProps> {
	constructor(props: AuthPageProps) {

		super(
			"main",
			props,
			["auth-layout"]
		);
	}

	render() {
		return this.compile(authPageTemplate, this.props);
	}
}

