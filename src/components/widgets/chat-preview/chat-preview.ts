import {Component} from "@/lib";

import {chatPreviewTemplate} from "./chat-preview.template.ts";

import type {ChatPreviewProps} from "./chat-preview.props.ts";
import './chat-preview.css';

export class ChatPreview extends Component<ChatPreviewProps> {
	constructor(props: ChatPreviewProps) {

		super(
			"div",
			props,
			["chat-preview"]
		);
	}

	render() {
		return this.compile(chatPreviewTemplate, this.props);
	}
}

