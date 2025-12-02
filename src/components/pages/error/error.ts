import {Component} from "@/lib";
import {Text} from "@components/shared";

import {getContentByStatusCode} from "./consts";
import {errorPageTemplate} from "./error.template.ts";

import type {ErrorPageProps} from "./error.props.ts";
import './error.css';

export class ErrorPage extends Component<ErrorPageProps> {
	constructor(props: ErrorPageProps) {

		const {errorCodeDefault, errorContentDefault} = getContentByStatusCode(props.code);

		const errorContent = props.errorContent || errorContentDefault;
		const errorCode = props.errorCode || errorCodeDefault;

		const backButton = props.backButton || new Text({
			text: "Назад к чатам",
			variant: "primary"
		});

		super(
			"main",
			{...props, errorCode, errorContent, backButton},
			["error-layout"]
		);
	}

	render() {
		return this.compile(errorPageTemplate, this.props);
	}
}

