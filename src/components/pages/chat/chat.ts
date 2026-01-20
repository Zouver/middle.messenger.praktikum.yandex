import {chatAPI} from "@/api/chat.api.ts";
import {Component} from "@/lib/component";
import {Text, TextLabel, TextTitle} from "@components/shared";
import {Chat, ChatList, ChatPreview} from "@components/widgets";

import {chatPageTemplate} from "./chat.template.ts";

import type {ChatPageProps} from "./chat.props.ts";
import type {ChatType} from "@/api/type.ts";

import './chat.css';


export class ChatPage extends Component<ChatPageProps> {
	constructor(props: ChatPageProps = {}) {
		super("div", props, ["messenger-layout"]);
	}

	componentDidMount() {
		chatAPI.request({offset: 0, limit: 25}).then(chats => {
			this.updateProps({chatList: new ChatList({
					chats: this.getChatsPreview(chats),
					onSearch: this.onSearch.bind(this),
					onCreateChat: this.onCreateChat.bind(this),
				})});
		});
	}

	onCreateChat = (chatResponse: Pick<ChatType, "id">) => {
		alert(`Chat ${chatResponse.id} successfully created`);

		chatAPI.request(chatResponse.id).then(chat => {
			const chatPreview = this.getChatsPreview([chat]);
			const chats = [...this.props.chatList!.props.chats, ...chatPreview];
			this.props.chatList?.updateProps({chats});
			this.onSelectChat(chat);
		}).catch((xhr: XMLHttpRequest) => {
			alert(xhr.response?.reason);
			location.reload();
		});
	};

	getChatsPreview(chats: ChatType[]): ChatPreview[] {
		return chats.map((chat) => new ChatPreview({
			chat: chat,
			message: new Text({text: chat.last_message?.content || "Нет сообщений"}),
			nickname: new TextTitle({text: chat.title}),
			time: new TextLabel({text: chat.last_message?.time || ""}),
			onClick: this.onSelectChat.bind(this),
		}));
	}
	onSelectChat(chat: ChatType) {
		const chatWidget = new Chat({chat});
		this.updateProps({chat: chatWidget});
	}

	onSearch(value: string) {
		chatAPI.request({title: value, offset: 0, limit: 25}).then(chats => {
			this.props.chatList?.updateProps({chats: this.getChatsPreview(chats)});
		});
	}

	render() {
		return this.compile(chatPageTemplate, this.props);
	}
}

