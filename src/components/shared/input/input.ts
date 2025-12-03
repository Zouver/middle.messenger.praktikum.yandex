import {Component, type BaseProps} from "@/lib/component";
import { validateField } from "@/lib/validator/validator";
import {inputTemplate} from "@components/shared/input/input.template.ts";

import type {InputProps} from "@components/shared/input/input.props.ts";

import './input.css';

export class Input extends Component<InputProps> {

	validate(value: string) {
		let isValid = true;
		let error: string | undefined = undefined;
		const result = validateField(value, this.props.validators! || []);

		if(typeof result === "string") {
			error= result;
			isValid = false;
		}

		this.setProps({error});
		return isValid;
	}

	constructor(props: InputProps, _classNames: string[] =[]) {
		const onBlur = (event: FocusEvent) => {
			event.preventDefault();
			this.validate((event.target as HTMLInputElement).value);
		};

		const events = {
			"blur": onBlur,
		};

		const input = new Component<BaseProps>("input", {events}, [], {
			id: props.name,
			name: props.name,
			type: props.type,
			value: props.value || "",
			placeholder: props.placeholder || ""
		});

		super(
			"div",
			{...props, input},
			["input", ..._classNames]
		);
	}

	render() {
		return this.compile(inputTemplate, this.props);
	}
}

