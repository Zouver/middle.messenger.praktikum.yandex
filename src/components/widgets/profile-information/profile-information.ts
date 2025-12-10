
import {Component} from "@/lib/component";
import { getFormData } from "@/lib/utils/form.ts";

import {submitButtonDefault} from "./consts";
import {getInformationsDefaultByState} from "./consts/informations.ts";
import {profileInformationTemplate} from "./profile-information.template.ts";

import type {ProfileInformationProps} from "./profile-information.props.ts";
import type { Input, KeyValueItem } from "@/components/shared/index.ts";



export class ProfileInformation extends Component<ProfileInformationProps>{

	constructor(props: ProfileInformationProps = {isChange: false}) {
		const {isChange} = props;
		const tagName = isChange ? "form" : "div";

		const submitButton = isChange ? props.submitButton || submitButtonDefault : undefined;
		const informations = props.informations || getInformationsDefaultByState(isChange || false);

		const onSubmitDefault = (event: SubmitEvent) => {
			event.preventDefault();
			let isValid = true;
			const data = getFormData(event.target as HTMLFormElement);
			console.log(data);

			Object.entries(data).forEach(([key, value]) => {
				const items = informations.children.items as KeyValueItem[];
				const _inputs = items.map(input => input.children.value) as Input[];
				const input = _inputs.find(input => input.props.name === key) as Input;
				console.log(input);
				isValid = input.validate(value as string);
			});

			if(!isValid) return;
		};

		const events = tagName == "form" ? {"submit": props.onSubmit || onSubmitDefault} : undefined;
		super(tagName, {...props, submitButton, informations,events}, ['profile-content']);
	}

	render() {
		return this.compile(profileInformationTemplate, this.props);
	}
}
