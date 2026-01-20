import {chatAPI} from "@/api/chat.api.ts";
import {WS_URL} from "@/api/consts.ts";
import {ChatMessageApi, type ChatReceivedMessage} from "@/api/message.api.ts";
import {userApi} from "@/api/user.api.ts";
import {Component} from "@/lib/component";
import {Button, Text, TextLabel, TextTitle} from "@components/shared";
import {Message} from "@components/widgets";

import {chatTemplate} from "./chat.template.ts";
import { SelectedChatPanel } from "./selected-chat-panel";

import type {ChatProps} from "./chat.props.ts";
import type {User} from "@/api/type.ts";

import './chat.css';

export class Chat extends Component<ChatProps> {
	chatMessageApi: ChatMessageApi | null = null;

	constructor(props: ChatProps) {
		const title = new TextTitle({text: props.chat.title});
		super("section",{...props, title},[],{id: "selected-chat"});
	}

	_messageBuilder(receivedMessage: ChatReceivedMessage){
		const user = window.user!;


		return new Message({
			displayName: new Text({text: `Пользователь ${receivedMessage.user_id.toString()}`}),
			initiator: receivedMessage.user_id === user?.id ? "self" : "companion",
			type: receivedMessage.type==="message" ? "text" : "picture",
			message: new Text({text: receivedMessage.content}),
			time: new TextLabel({text: receivedMessage.time})
		});
	}

	scrollDown(){
		const content = this.element.querySelector("#selected-chat-content");
		if(content) content.scrollTop = content.scrollHeight;
	}

	onChatMessage(receivedMessages: ChatReceivedMessage  | ChatReceivedMessage[]): void {
		const existingMessages: Message[] = this.props.messages || [];
		let messages: Message[];

		if(Array.isArray(receivedMessages)) {
			const _messages = receivedMessages.map((message) => this._messageBuilder(message)).reverse();
			messages = [...existingMessages, ..._messages];
		}else{
			const message = this._messageBuilder(receivedMessages);
			messages = [...existingMessages, message];
		}

		this.updateProps({messages});
		this.props.chatPanel?.props.input?.updateProps({value: ""});
		this.scrollDown();
	}

	onSendMessage(value: string): void{
		this.chatMessageApi?.create(value);
	}

	chatConnect(){
		const chat = this.props.chat;
		const user = window.user;

		chatAPI.getToken(chat.id).then(({token}) => {
			this.chatMessageApi = new ChatMessageApi(
				WS_URL,
				'/chats',
				chat.id,
				user!.id,
				token,
				this.onChatMessage.bind(this),
			);
			this.updateProps({token: token});
			this.chatMessageApi?.request(0);
		});
	}


	_getChatUser(){
		return new Promise<User>((resolve, reject) => {
			const username = prompt("Enter username");

			if(!username || username === "") {
				reject("Error: Username is required");
				return;
			}

			userApi.request(username).then((users) => {
				if (users.length <= 0) {
					reject("Error: Username is not found");
					return;
				}

				resolve(users[0]);
			});
		});
	}

	onUserDelete(){
		this._getChatUser().then((user) => {
			chatAPI.removeUsers(this.props.chat.id, [user.id])
				.then(() => alert(`User ${user.login} successfully removed from chat!`))
				.catch(error => alert(`Error: ${error}`));
		}).catch(error => alert(`Error: ${error}`));
	}

	onUserAdd(){
		this._getChatUser().then((user) => {
			chatAPI.addUsers(this.props.chat.id, [user.id])
				.then(() => alert(`User ${user.login} successfully added the chat!`))
				.catch(error => alert(`Error: ${error}`));
		}).catch(error => alert(`Error: ${error}`));
	}

	componentDidMount() {
		this.updateProps({
			chatPanel: new SelectedChatPanel({onSendMessage: this.onSendMessage.bind(this)}),
			deleteUserButton: new Button({
				text: "Удалить пользователя",
				variant: "critical",
				events: {click: this.onUserDelete.bind(this)}
			}),
			addUserButton: new Button({
				text: "Добавить пользователя",
				variant: "primary",
				events: {click: this.onUserAdd.bind(this)}
			}),
		});
		this.chatConnect();
	}

	render() {
		return this.compile(chatTemplate, this.props);
	}
}

