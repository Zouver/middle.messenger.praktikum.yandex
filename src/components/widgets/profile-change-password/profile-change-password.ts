import {Component} from "@/lib/component";
import {changePasswordInputsDefault, submitButtonDefault} from "@components/widgets/profile-change-password/config";
import {
	ProfileChangePasswordTemplate
} from "@components/widgets/profile-change-password/profile-change-password.template.ts";

import type {
	ProfileChangePasswordProps
} from "@components/widgets/profile-change-password/profile-change-password.props.ts";



export class ProfileChangePassword extends Component<ProfileChangePasswordProps>{

	constructor(props: ProfileChangePasswordProps = {}) {
		const inputs = props.inputs || changePasswordInputsDefault;
		const submitButton = props.submitButton || submitButtonDefault;
		super("form", {...props, inputs, submitButton}, ["profile-content"]);
	}

	render(): DocumentFragment {
		return this.compile(ProfileChangePasswordTemplate, this.props);
	}
}
