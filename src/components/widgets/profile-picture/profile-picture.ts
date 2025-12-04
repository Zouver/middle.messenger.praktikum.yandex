
import {Component} from "@/lib/component";

import {profilePictureTemplate} from "./profile-picture.template.ts";

import type {ProfilePictureProps} from "./profile-picture.props.ts";

import './profile-picture.css';

export class ProfilePicture extends Component<ProfilePictureProps> {
	constructor(props: ProfilePictureProps) {

		super(
			"form",
			{...props, events: {"click": () => document.getElementById('avatar')?.click()}},
			["profile-picture"]
		);
	}

	render() {
		return this.compile(profilePictureTemplate, this.props);
	}
}

