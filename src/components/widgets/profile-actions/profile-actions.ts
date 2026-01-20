import {Component} from "@/lib/component";
import {Button} from "@components/shared";

import * as defaultProps from "./consts";
import {profileActionsTemplate} from "./profile-actions.template.ts";

import type {ProfileActionsProps} from "./profile-actions.props.ts";

export class ProfileActions extends Component<ProfileActionsProps>{

	constructor(props: ProfileActionsProps) {
		const changeProfileButton =  new Button({
			text: "Изменить данные",
			variant: "primary",
			events: {click: () => props.setState("profile-change")}
		});

		const changePasswordButton =  new Button({
			text: "Изменить пароль",
			variant: "primary",
			events: {click: () => props.setState("password-change")}
		});

		const logoutLink = props.logoutLink || defaultProps.logoutLinkDefault;

		super("div", {...props, changePasswordButton, changeProfileButton, logoutLink}, ['profile-actions']);
	}

	render() {
		return this.compile(profileActionsTemplate, this.props);
	}
}
