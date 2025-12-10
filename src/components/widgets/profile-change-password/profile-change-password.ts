import {Component} from "@/lib/component";
import { getFormData } from "@/lib/utils";
import {changePasswordInputsDefault, submitButtonDefault} from "@components/widgets/profile-change-password/config";
import {
	ProfileChangePasswordTemplate
} from "@components/widgets/profile-change-password/profile-change-password.template.ts";

import type { Input, KeyValueItem } from "@/components/shared";
import type {
	ProfileChangePasswordProps
} from "@components/widgets/profile-change-password/profile-change-password.props.ts";



export class ProfileChangePassword extends Component<ProfileChangePasswordProps>{
	constructor(props: ProfileChangePasswordProps = {}) {
		const inputs = props.inputs || changePasswordInputsDefault;
		const submitButton = props.submitButton || submitButtonDefault;

		const onSubmitDefault = (event: SubmitEvent) => {
			event.preventDefault();
			let isValid = true;
			const data = getFormData(event.target as HTMLFormElement);
			console.log(data);

			Object.entries(data).forEach(([key, value]) => {
				const items = inputs.children.items as KeyValueItem[];
				const _inputs = items.map(input => input.children.value) as Input[];
				const input = _inputs.find(input => input.props.name === key) as Input;
				console.log(input);
				isValid = input.validate(value as string);
			});

			if(!isValid) return;
		};



		const events = props.events || {
			"submit": props.onSubmit || onSubmitDefault
		};

		super("form", {...props, inputs, submitButton, events}, ["profile-content"]);
	}

	render(): DocumentFragment {
		return this.compile(ProfileChangePasswordTemplate, this.props);
	}
}
