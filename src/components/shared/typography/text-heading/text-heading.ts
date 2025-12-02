import {Component} from "@/lib";
import {textHeadingTemplate} from "@components/shared/typography/text-heading/text-heading.template.ts";

import type {TextHeadingProps} from "@components/shared/typography/text-heading/text-heading.props.ts";

export class TextHeading extends Component<TextHeadingProps> {
	constructor(props: TextHeadingProps) {
		const {variant} = props;

		const classNames = ["heading"];
		if(variant) classNames.push(`text-color-${variant}`);

		super("h2", props, classNames);
	}

	render() {
		return this.compile(textHeadingTemplate, this.props);
	}
}

