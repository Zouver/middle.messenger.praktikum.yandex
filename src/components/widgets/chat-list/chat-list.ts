import {Component} from "@/lib/component";
import {Input, Text} from "@components/shared";

import {chatListTemplate} from "./chat-list.template.ts";

import type {ChatListProps} from "./chat-list.props.ts";

import './chat-list.css';

export class ChatList extends Component<ChatListProps> {
	constructor(props: ChatListProps) {
		const text = props.text || new Text({
			text: "Профиль >",
			variant: "secondary"
		});

		const search = props.search || new Input({
			type: "text",
			placeholder: "Поиск",
			name:  "search",
		});

		super(
			"section",
			{...props, text, search},
			[],
			{id: "chat-list"}
		);
	}

	render() {
		return this.compile(
			chatListTemplate,
			this.props
		);
	}
}

