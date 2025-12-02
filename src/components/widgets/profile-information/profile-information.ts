
import {Component} from "@/lib/component";

import {submitButtonDefault} from "./consts";
import {getInformationsDefaultByState} from "./consts/informations.ts";
import {profileInformationTemplate} from "./profile-information.template.ts";

import type {ProfileInformationProps} from "./profile-information.props.ts";



export class ProfileInformation extends Component<ProfileInformationProps>{

	constructor(props: ProfileInformationProps = {isChange: false}) {
		const {isChange} = props;
		const tagName = isChange ? "form" : "div";

		const submitButton = isChange ? props.submitButton || submitButtonDefault : undefined;
		const informations = props.informations || getInformationsDefaultByState(isChange || false);
		super(tagName, {...props, submitButton, informations}, ['profile-content']);
	}

	render() {
		return this.compile(profileInformationTemplate, this.props);
	}
}
