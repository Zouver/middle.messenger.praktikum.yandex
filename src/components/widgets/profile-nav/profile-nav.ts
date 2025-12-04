import {Component} from "@/lib/component";
import {ButtonIcon} from "@components/shared";

import {profileNavTemplate} from "./profile-nav.template.ts";

import type {ProfileNavProps} from "./profile-nav.props.ts";

import './profile-nav.css';

export class ProfileNav extends Component<ProfileNavProps> {
	constructor(props: ProfileNavProps = {}) {
		const button = props.button || new ButtonIcon({
			variant: "primary",
			icon: "fa-solid fa-arrow-left"
		});

		super(
			"nav",
			{...props, button},
			["profile-navigation"]
		);
	}

	render() {
		return this.compile(profileNavTemplate, this.props);
	}
}

