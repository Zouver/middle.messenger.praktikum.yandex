
import {userApi} from "@/api/user.api.ts";
import {Input, KeyValueItem, KeyValueList, Text} from "@/components/shared";
import {Component} from "@/lib/component";
import { getFormData } from "@/lib/utils/form.ts";

import {submitButtonDefault} from "./consts";
import {informations} from "./consts/informations.ts";
import {profileInformationTemplate} from "./profile-information.template.ts";

import type {ProfileInformationProps} from "./profile-information.props.ts";
import type {User} from "@/api/type.ts";


export type ProfileChangeForm = Omit<User, "id" | "avatar">

export class ProfileInformation extends Component<ProfileInformationProps>{

	constructor(props: ProfileInformationProps = {isChange: false}) {
		const {isChange} = props;
		const tagName = isChange ? "form" : "div";

		const submitButton = isChange ? props.submitButton || submitButtonDefault : undefined;
		const informations = props.informations;
		super(tagName, {...props, submitButton, informations}, ['profile-content']);
	}

	private _loadUserInformations(){
		userApi.request().then(user => {
			const items: KeyValueItem[] = Object.entries(informations).map(([key, options]) => {
				const _value = String(user[key as keyof User]);

				return new KeyValueItem({
					key: options.title,
					value: this._meta?.tagName == "form" ?
						new Input({
							name: key,
							value: _value,
							type: options.type,
							placeholder: options.title,
							validators: options.validators
						}):
						new Text({text: _value})
				});
			});

			this.updateProps({
				informations: new KeyValueList({items})
			});
		});
	}

	private _setEvent(){
			const onSubmitDefault = (event: SubmitEvent) => {
				event.preventDefault();
				let isValid = true;
				const data = getFormData<ProfileChangeForm>(event.target as HTMLFormElement);

				Object.entries(data).forEach(([key, value]) => {
					const items = this.props.informations!.props.items as KeyValueItem[];
					const _inputs = items.map(input => input.props.value) as Input[];
					const input = _inputs.find(input => input.props.name === key) as Input;
					isValid = input.validate(value as string);
				});

				if(!isValid) return;

				userApi.update({user: data}).then(() => {
					alert("Successfully updated profile information");
				}).catch(xhr => {
					const error = xhr.response?.reason || "Произошла ошибка";

					this.updateProps({
						error: new Text({
							text: error,
							variant:"critical"
						})
					});
				});
			};

			const events = {"submit": onSubmitDefault};
			this.updateProps({events});
	}

	componentDidMount() {
		this._loadUserInformations();
		if(this._meta?.tagName == "form") this._setEvent();
	}

	render() {
		return this.compile(profileInformationTemplate, this.props);
	}
}
