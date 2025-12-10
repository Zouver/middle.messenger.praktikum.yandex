
import {Component} from "@/lib/component";

import * as defaultProps from "./consts";
import {profileActionsTemplate} from "./profile-actions.template.ts";

import type {ProfileActionsProps} from "./profile-actions.props.ts";


export class ProfileActions extends Component<ProfileActionsProps>{

	constructor(props: ProfileActionsProps = {}) {
		const changeProfileLink =  props.changeProfileLink || defaultProps.changeProfileLinkDefault;
		const changePasswordLink =  props.changePasswordLink || defaultProps.changePasswordLinkDefault;
		const logoutLink = props.logoutLink || defaultProps.logoutLinkDefault;

		super("div", {...props, changePasswordLink, changeProfileLink, logoutLink}, ['profile-actions']);
	}

	render() {
		return this.compile(profileActionsTemplate, this.props);
	}
}
