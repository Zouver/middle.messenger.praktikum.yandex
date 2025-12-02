import {Component} from "@/lib";
import {inputTemplate} from "@components/shared/input/input.template.ts";

import type {InputProps} from "@components/shared/input/input.props.ts";
import './input.css';

export class Input extends Component<InputProps> {
	constructor(props: InputProps, _classNames: string[] =[]) {
		super(
			"div",
			props,
			["input", ..._classNames]
		);
	}

	render() {
		return this.compile(inputTemplate, this.props);
	}
}

