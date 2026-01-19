import {RESOURCES_URL} from "@/api/consts.ts";
import {Component} from "@/lib/component";

import {chatPreviewTemplate} from "./chat-preview.template.ts";

import type {ChatPreviewProps} from "./chat-preview.props.ts";

import './chat-preview.css';

export class ChatPreview extends Component<ChatPreviewProps> {
	constructor(props: ChatPreviewProps) {
		super("div", props, ["chat-preview"]);
	}

	updateAvatar(avatar: string | null) {
		if(!avatar) return;
		const avatarElement = this.element.querySelector(".chat-preview-avatar") as HTMLDivElement | undefined;
		if (!avatarElement) return;
		avatarElement.style.background = `url("${RESOURCES_URL}${avatar}") no-repeat center`;
	}

	componentDidMount() {
		const avatar = this.props.chat.avatar;
		this.updateAvatar(avatar);
		this.updateProps({events: {click: this.onClick.bind(this)}});
	}

	onClick(event: PointerEvent){
		event.preventDefault();
		this.props.onClick(this.props.chat);
	}

	render() {
		return this.compile(chatPreviewTemplate, this.props);
	}
}

