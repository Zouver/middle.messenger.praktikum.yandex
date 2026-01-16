import {BaseApi} from "@/api/base.api.ts";

import type {Message} from "@/api/type.ts";

export type endpoint = `/${string}`
export type wsBaseUrl = `wss://${string}`;

export interface WebsocketResponse {
	content: string;
	type: string;
	[k: string]: string;
}

export type ChatReceivedMessage = Omit<Message, "chat_id" | "file"> | WebsocketResponse;
export type OnChatMessageCallback = (messages: ChatReceivedMessage[]) => void;

export enum ClientAction {
	GET_OLD = "get old",
	SEND_MESSAGE = "message",
	SEND_FILE = "file",
	SEND_STICKER = "sticker",
	USER_CONNECTED = "user connected",
	PING = "ping",
	PONG = "pong",
}


export class ChatMessageApi extends BaseApi{
	socket: WebSocket | null;
	baseURL: string;
	onChatMessage: OnChatMessageCallback;

	constructor(
		baseUrl: wsBaseUrl,
		endpoint: endpoint,
		chatID: number,
		userID: number,
		token: string,
		onChatMessage: OnChatMessageCallback
	) {
		super();
		this.baseURL = baseUrl + endpoint + `/${userID}` + `/${chatID}` + `/${token}`;
		console.log(this.baseURL);

		this.onChatMessage = onChatMessage;
		this.socket = new WebSocket(this.baseURL);
		this.socket.onopen = this.onConnectionOpen.bind(this);
		this.socket.onclose = this.onConnectionClose.bind(this);
		this.socket.onmessage = this.onMessage.bind(this);
	}

	private waitForOpen(): Promise<void> {
		return new Promise((resolve, reject) => {
			if (!this.socket) return reject("No socket");

			if (this.socket.readyState === WebSocket.OPEN) {
				resolve();
				return;
			}

			const onOpen = () => {
				resolve();
			};

			this.socket.addEventListener("open", onOpen);
		});
	}

	async create(content: string) {
		await this.waitForOpen();

		this.socket?.send(JSON.stringify({
			content: content,
			type: ClientAction.SEND_MESSAGE
		}));
	}

	async file(id: string) {
		await this.waitForOpen();

		this.socket?.send(JSON.stringify({
			content: id,
			type: ClientAction.SEND_FILE
		}));
	}

	async sticker(id: string) {
		await this.waitForOpen();

		this.socket?.send(JSON.stringify({
			content: id,
			type: ClientAction.SEND_STICKER
		}));
	}

	async request(offset: number) {
		await this.waitForOpen();

		this.socket?.send(JSON.stringify({
			content: offset.toString(),
			type: ClientAction.GET_OLD
		}));
	}

	async onMessage(event: MessageEvent){
		console.log(`Received event ${JSON.stringify(event.type)}`);
		const data: WebsocketResponse | ChatReceivedMessage[] = JSON.parse(event.data);

		if(Array.isArray(data)) {
			await this._onChatMessage(data as ChatReceivedMessage[]);
			return;
		}

		switch (data.type) {
			case ClientAction.SEND_MESSAGE:
				await this._onChatMessage([data]);
				break;
			case ClientAction.USER_CONNECTED:
				await this._onUserConnected(data.content);
				break;
			case ClientAction.PONG:
				await this._onPong();
				break;
		}
	}

	async onConnectionClose(event: CloseEvent){
		console.log(`Close ${JSON.stringify(event)}`);
		return;
	}

	async onConnectionOpen(){
		console.log(`Connection opened`);
		return;
	}

	async _onChatMessage(messages: ChatReceivedMessage[]){
		this.onChatMessage(messages);
	}

	async _onUserConnected(userId: string) {
		console.log(`User ${userId} connected`);
		return;
	}

	async _onPong(){
		return;
	}
}


// const socket = new WebSocket('wss://ya-praktikum.tech/ws/chats/<USER_ID>/<CHAT_ID>/<TOKEN_VALUE>');
