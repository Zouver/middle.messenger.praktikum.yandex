import {Component} from "@/lib/component";

import {chatTemplate} from "./chat.template.ts";
import { SelectedChatPanel } from "./selected-chat-panel";

import type {ChatProps} from "./chat.props.ts";

import './chat.css';

export class Chat extends Component<ChatProps> {
	constructor(props: ChatProps) {

		const selectedChatPanel = props.selectedChatPanel || new SelectedChatPanel();
		super(
			"section",
			{...props, selectedChatPanel},
			[],
			{id: "selected-chat"}
		);
	}

	render() {
		return this.compile(chatTemplate, this.props);
	}
}

