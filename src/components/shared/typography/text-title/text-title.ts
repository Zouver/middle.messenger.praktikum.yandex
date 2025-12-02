import {Component} from "@/lib";
import {textTitleTemplate} from "@components/shared/typography/text-title/text-title.template.ts";

import type {TextTitleProps} from "@components/shared/typography/text-title/text-title.props.ts";

export class TextTitle extends Component<TextTitleProps> {
	constructor(props: TextTitleProps) {
		const {variant} = props;

		const classNames = ["title"];
		if(variant) classNames.push(`text-color-${variant}`);

		super("h6", props, classNames);
	}

	render() {
		return this.compile(textTitleTemplate, this.props);
	}
}

