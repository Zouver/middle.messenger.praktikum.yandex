import {Component} from "@/lib/component";
import {
	ProfileNav,
	ProfileInformation,
	ProfileActions,
	ProfileChangePassword,
} from "@components/widgets";

import * as defaultProps from "./consts";
import {profilePageTemplate} from "./profile.template.ts";

import type {ProfilePageProps} from "@components/pages/profile";
import type {ProfileState} from "@components/pages/profile/profile.props.ts";

import './profile.css';
import {userApi} from "@/api/user.api.ts";
import { TextHeading} from "@components/shared";

export class ProfilePage extends Component<ProfilePageProps> {
	constructor(props: ProfilePageProps) {
		const profileNav = new ProfileNav();
		const profileInformations = new ProfileInformation({isChange: props.state === "profile-change"});
		const profilePicture = defaultProps.profilePictureDefault;
		const profilePasswordChange = new ProfileChangePassword();

		const isChangePassword = props.state === "password-change";
		const isDefaultState = props.state === "default";

		super(
			"main",
			{
				...props,
				profileNav,
				profilePicture,
				profileInformations,
				profilePasswordChange,
				isChangePassword,
				isDefaultState
			},
			["profile-layout"]
		);
	}

	setProfileState(state: ProfileState){
		const isChangePassword = state === "password-change";
		const isDefaultState = state === "default";
		const isProfileChange = state === "profile-change";


		const profileInformations = new ProfileInformation({isChange: isProfileChange});

		this.updateProps({
			state,
			isDefaultState,
			isChangePassword,
			profileInformations
		});
	}

	componentDidMount() {
		const profileActions = new ProfileActions({
			setState: this.setProfileState.bind(this),
		});

		userApi.request().then(user => {
			const heading = new TextHeading({
				text: `${user.first_name} ${user.second_name}`,
				variant: "default"
			});

			this.props.profilePicture?.updateProps({
				avatar: user.avatar,
			});

			this.updateProps({heading,profileActions});
		});
	}

	render() {
		return this.compile(profilePageTemplate, this.props);
	}
}

