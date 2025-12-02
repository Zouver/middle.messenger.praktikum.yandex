import {Component} from "@/lib";
import {Input, ButtonIcon} from "@components/shared";

import {chatTemplate} from "./chat.template.ts";

import type {ChatProps} from "./chat.props.ts";
import './chat.css';

export class Chat extends Component<ChatProps> {
	constructor(props: ChatProps) {

		const attachButton = props.attachButton || new ButtonIcon({
			variant: "transparent",
			icon: "fa-solid fa-paperclip"
		});

		const input = props.input || new Input({
			type: "text",
			name: "message",
			placeholder: "Сообщение"
		});

		const sendButton = props.sendButton || new ButtonIcon({
			type: "submit",
			variant: "primary",
			icon: "fa-solid fa-arrow-right"
		});

		super(
			"section",
			{...props, input, sendButton, attachButton},
			[],
			{id: "selected-chat"}
		);
	}

	render() {
		return this.compile(chatTemplate, this.props);
	}
}

