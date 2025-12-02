import {Component} from "@/lib";
import {ProfileNav, ProfileInformation, ProfileActions, ProfileChangePassword} from "@components/widgets";

import * as defaultProps from "./consts";
import {profilePageTemplate} from "./profile.template.ts";

import type {ProfilePageProps} from "@components/pages/profile";

import './profile.css';

export class ProfilePage extends Component<ProfilePageProps> {
	constructor(props: ProfilePageProps) {
		const profileNav = props.profileNav || new ProfileNav();
		const profileActions = props.profileActions || new ProfileActions();
		const profileInformations = props.profileInformations || new ProfileInformation({isChange: props.state === "profile-change"});
		const heading = props.heading || defaultProps.headingDefault
		const profilePicture = props.profilePicture || defaultProps.profilePictureDefault;
		const profilePasswordChange = props.profilePasswordChange || new ProfileChangePassword();
		const isChangePassword = props.state === "password-change";
		const isDefaultState = props.state === "default";

		super(
			"main",
			{
				...props,
				profileNav,
				heading,
				profilePicture,
				profileInformations,
				profileActions,
				profilePasswordChange,
				isChangePassword,
				isDefaultState
			},
			["profile-layout"]
		);
	}

	render() {
		return this.compile(profilePageTemplate, this.props);
	}
}

