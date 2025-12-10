
import {Component} from "@/lib/component";

import {chatPageTemplate} from "./chat.template.ts";
import {chatDefault, chatListDefault} from "./consts";

import type {ChatPageProps} from "./chat.props.ts";

import './chat.css';

export class ChatPage extends Component<ChatPageProps> {
	constructor(props: ChatPageProps = {}) {
		const chatList = props.chatList || chatListDefault;
		const chat = props.chat || chatDefault;

		super(
			"div",
			{...props, chatList, chat},
			["messenger-layout"]
		);
	}

	render() {
		return this.compile(chatPageTemplate, this.props);
	}
}

