import {chatAPI} from "@/api/chat.api.ts";
import {ButtonIcon, Text} from "@components/shared";
import {createChatTemplate} from "@components/widgets/create-chat/create-chat.template.ts";
import {Component} from "@lib/component";

import type {CreateChatProps} from "@components/widgets/create-chat/create-chat.props.ts";
import type {Events} from "@lib/component/types.ts";

import './create-chat.css';

export class CreateChat extends Component<CreateChatProps>{

	constructor(props: CreateChatProps) {
		super("div", props, ["create-chat-widget"]);
	}

	onClick = (event: PointerEvent) => {
		event.preventDefault();
		const title = prompt("Type chat title");

		if(!title || title === "") {
			alert("Error: title is required");
			return;
		}

		chatAPI.create(title)
			.then((chat) => this.props.onCreateChat(chat))
			.catch(console.error);
	};

	componentDidMount() {
		const text = new Text({
			text: "Создать чат"
		});

		const createChat = new ButtonIcon({
			icon: "fa-solid fa-plus",
			variant: "transparent",
		});

		const events: Events = {
			click: this.onClick.bind(this),
		};

		this.updateProps({text, createChat, events});
	}

	render(){
		return this.compile(createChatTemplate, this.props);
	}
}
