
import {RESOURCES_URL} from "@/api/consts.ts";
import {userApi} from "@/api/user.api.ts";
import {Component} from "@/lib/component";
import { Input} from "@components/shared";

import {profilePictureTemplate} from "./profile-picture.template.ts";

import type {ProfilePictureProps} from "./profile-picture.props.ts";
import type {User} from "@/api/type.ts";
import './profile-picture.css';


export class ProfilePicture extends Component<ProfilePictureProps> {
	constructor(props: ProfilePictureProps) {
		super("form",props, ["profile-picture"]);
	}

	componentDidMount() {
		console.log("did mount");
		this.updateProps({
			avatar: this.props.avatar,
			fileInput: new Input({
				type: "file",
				name: "avatar",
				accept: "image/*",
				events: {change: this.onChange.bind(this)}
			}),
			events: {click: this.onClick.bind(this)}
		});
	}

	onChange(event: Event){
		const target = event.target as HTMLInputElement;
		const files = target.files;
		if(!files?.length) return;

		userApi.update({avatar: files[0]})
			.then((response) => {
				const user = response as User;
				this.updateProps({avatar: user.avatar});
				alert("Avatar updated successfully.");
			})
			.catch(error => alert(`Avatar update error: ${error}`));
	}

	componentDidUpdate(_oldProps: ProfilePictureProps, _newProps: ProfilePictureProps): boolean {
		console.log(_oldProps.avatar, _newProps.avatar);
		if(_oldProps.avatar !== _newProps.avatar){
			console.log(_newProps.avatar);
			this.updateAvatar(_newProps.avatar);
		}

		return true;
	}

	updateAvatar(avatar: string | undefined) {
		if(!avatar) return;
		const avatarElement = this.element as HTMLDivElement | undefined;
		if (!avatarElement) return;
		avatarElement.style.background = `url("${RESOURCES_URL}${avatar}") no-repeat center`;
	}

	onClick(){
		const fileInput = this.props.fileInput?.getInputElement();
		fileInput?.click();
	}

	render() {
		return this.compile(profilePictureTemplate, this.props);
	}
}

