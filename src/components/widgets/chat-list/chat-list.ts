import {Component} from "@/lib/component";
import {Input, Text} from "@components/shared";
import {CreateChat} from "@components/widgets";

import {chatListTemplate} from "./chat-list.template.ts";

import type {ChatListProps} from "./chat-list.props.ts";
import type {Events} from "@lib/component/types.ts";

import './chat-list.css';

export class ChatList extends Component<ChatListProps> {
	constructor(props: ChatListProps) {
		super("section",props,[],{id: "chat-list"});
	}

	componentDidMount() {
		const createChat = new CreateChat({
			onCreateChat: this.props.onCreateChat.bind(this)
		});

		const text = new Text({
			text: "Профиль >",
			variant: "secondary",
		});

		const events: Events= {
			change: (event: Event) => {
				const input = event.target as HTMLInputElement;
				const value = input.value;
				this.props.onSearch(value);
			}
		};

		const search = new Input({
			type: "text",
			placeholder: "Поиск",
			name:  "search",
			events: events
		});

		this.updateProps({ search, text, createChat });
	}


	render() {
		return this.compile(
			chatListTemplate,
			this.props
		);
	}
}

