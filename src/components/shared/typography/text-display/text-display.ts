import {Component} from "@/lib/component";
import {textDisplayTemplate} from "@components/shared/typography/text-display/text-display.template.ts";

import type {TextDisplayProps} from "@components/shared/typography/text-display/text-display.props.ts";


export class TextDisplay extends Component<TextDisplayProps> {
	constructor(props: TextDisplayProps) {
		const {variant} = props;

		const classNames = ["display"];
		if(variant) classNames.push(`text-color-${variant}`);

		super("h1", props, classNames);
	}

	render() {
		return this.compile(textDisplayTemplate, this.props);
	}
}

