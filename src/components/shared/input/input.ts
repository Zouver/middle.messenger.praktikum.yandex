
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


	onBlur(event: FocusEvent){
		event.preventDefault();
		this.validate((event.target as HTMLInputElement).value);
	};

	onChange(event: Event){
		const target = event.target as HTMLInputElement;
		this.updateProps({value: target.value});
	};

	getInputElement(): HTMLInputElement | null {
		return this.element.querySelector('input');
	}

	constructor(props: InputProps, _classNames: string[] =[]) {
		super("div",props,["input", ..._classNames]);
	}

	render() {
		const events = {
			blur: this.onBlur.bind(this),
			change: this.onChange.bind(this),
		};

		const input = new Component<BaseProps>("input", {events}, [], {
			id: this.props.name,
			name: this.props.name,
			type: this.props.type,
			value: this.props.value || "",
			placeholder: this.props.placeholder || "",
			accept: this.props.accept || ""
		});

		return this.compile(inputTemplate, {...this.props, input});
	}
}

