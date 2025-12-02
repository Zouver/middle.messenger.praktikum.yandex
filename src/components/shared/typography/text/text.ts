import {Component} from "@/lib/component";
import {textTemplate} from "@components/shared/typography/text/text.template.ts";

import type {TextProps} from "@components/shared/typography/text/text.props.ts";


export class Text extends Component<TextProps> {
	constructor(props: TextProps) {
		const {variant} = props;

		const classNames = ["text"];
		if(variant) classNames.push(`text-color-${variant}`);

		super("p", props, classNames);
	}

	render() {
		return this.compile(textTemplate, this.props);
	}
}
