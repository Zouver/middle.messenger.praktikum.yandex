import {Component} from "@/lib";
import {textLabelTemplate} from "@components/shared/typography/text-label/text-label.template.ts";

import type {TextLabelProps} from "@components/shared/typography/text-label/text-label.props.ts";

export class TextLabel extends Component<TextLabelProps> {
	constructor(props: TextLabelProps) {
		const {variant} = props;

		const classNames = ["label"];
		if(variant) classNames.push(`text-color-${variant}`);

		super("span", props, classNames);
	}

	render() {
		return this.compile(textLabelTemplate, this.props);
	}
}

