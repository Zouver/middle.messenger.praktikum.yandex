import {Input} from "@components/shared";

import type {InputProps} from "@components/shared/input";
import './input-form.css';

export class InputForm extends Input{
	constructor(props: InputProps) {
		super(props, ["input-form"]);
	}
}
