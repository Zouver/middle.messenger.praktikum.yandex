import {userApi} from "@/api/user.api.ts";
import {router} from "@/app/router.ts";
import  { Input, KeyValueItem, Text } from "@/components/shared";
import {Component} from "@/lib/component";
import { getFormData } from "@/lib/utils";
import {changePasswordInputsDefault, submitButtonDefault} from "@components/widgets/profile-change-password/config";
import {
	ProfileChangePasswordTemplate
} from "@components/widgets/profile-change-password/profile-change-password.template.ts";

import type {
	ProfileChangePasswordProps
} from "@components/widgets/profile-change-password/profile-change-password.props.ts";


export interface PasswordChangeForm {
	oldPassword: string;
	newPassword: string;
	newPasswordSubmit: string;
}

export class ProfileChangePassword extends Component<ProfileChangePasswordProps>{
	constructor(props: ProfileChangePasswordProps = {}) {
		const inputs = props.inputs || changePasswordInputsDefault;
		const submitButton = props.submitButton || submitButtonDefault;

		const onSubmitDefault = (event: SubmitEvent) => {
			event.preventDefault();
			let isValid = true;
			const data = getFormData<PasswordChangeForm>(event.target as HTMLFormElement);
			console.log(data);

			Object.entries(data).forEach(([key, value]) => {
				const items = inputs.props.items as KeyValueItem[];
				const _inputs = items.map(input => input.props.value) as Input[];
				const input = _inputs.find(input => input.props.name === key) as Input;
				console.log(input);
				isValid = input.validate(value as string);
			});

			if(!isValid) return;

			const {oldPassword, newPassword} = data;
			userApi.update({oldPassword, newPassword}).then(() => {
				alert('Password updated successfully!');
				router.go("/profile");
			}).catch(xhr => {
				const error = xhr.response?.reason || "Произошла ошибка";
				this.setProps({...this.props, error: new Text({text: error, variant:"critical"})});
				console.error(error);
			});
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
