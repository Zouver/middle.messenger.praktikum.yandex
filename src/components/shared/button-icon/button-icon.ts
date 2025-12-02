import {Component} from "@/lib/component";
import {buttonIconTemplate} from "@components/shared/button-icon/button-icon.template.ts";

import type {ButtonIconProps} from "@components/shared/button-icon/button-icon.props.ts";

import "./button-icon.css";

export class ButtonIcon extends Component<ButtonIconProps> {
	constructor(props: ButtonIconProps) {
		const {variant, type} = props;

		const classNames = ["button-icon"];
		if(variant) classNames.push(`button-${variant}`);

		const attributes: Record<string, string> = {};
		if(type) attributes.type = type;

		super(
			"button",
			props,
			classNames,
			attributes
		);
	}

	render() {
		return this.compile(buttonIconTemplate, this.props);
	}
}

