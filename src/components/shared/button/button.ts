import {Component} from "@/lib";
import {buttonTemplate} from "@components/shared/button/button.template.ts";

import type {ButtonProps} from "@components/shared/button/button.props.ts";
import './button.css';

export class Button extends Component<ButtonProps> {
	constructor(props: ButtonProps) {

		const classNames = ["button"];
		if(props.variant) classNames.push(`button-${props.variant}`);


		super(
			"button",
			{...props},
			classNames,
			{type: props.type || "button"},
		);

	}

	render() {
		return this.compile(buttonTemplate, this.props);
	}
}
