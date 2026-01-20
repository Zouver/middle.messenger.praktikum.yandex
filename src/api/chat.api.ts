import {BaseApi} from "@/api/base.api.ts";
import {API_URL, CHAT_ENDPOINT} from "@/api/consts.ts";
import {HTTPTransport} from "@lib/http/httptransport.ts";

import type {ChatType, Message, PaginationFilters, User} from "@/api/type.ts";

const chatInstance = new HTTPTransport({
	baseURL: API_URL,
	endpoint: CHAT_ENDPOINT
});

// Filters
export interface ChatRequestFilters extends PaginationFilters{
	title?: string
}

export interface GetChatUsersFilters extends PaginationFilters{
	name?: string
	email?: string
}

// Responses
export interface DeleteChatResponse{
	userId: Omit<User, "id">
	result: Pick<ChatType, "id" | "title" | "avatar" | "created_by">
}

export interface ArchiveChatResponse{
	userId: Omit<User, "id">
	result: ChatType
}

export interface ChatUserResponse extends Omit<User, "email" | "phone">{
	role: string
}

export interface GetUnreadResponse {
	unread_count: number
}

export interface GetTokenResponse {
	token: string
}

export const isNumber = (value: unknown): value is number => typeof value === "number";

// ChatAPI
export class ChatApi extends BaseApi{
	async create(title: string): Promise<Pick<ChatType, "id">> {
		const xhr = await chatInstance.post(``, {title});
		return xhr.response;
	}

	async request(filters: ChatRequestFilters): Promise<ChatType[]>;
	async request(chatId: number): Promise<ChatType>;
	async request(arg: number | ChatRequestFilters) {
		if(isNumber(arg)){
			const xhr = await chatInstance.get(`/${arg}/common`);
			return xhr.response;
		}

		const {offset, limit, title} = arg;
		const xhr = await chatInstance.get(`/`, {offset, limit, title});
		return xhr.response;
	}

	async delete(chatId: number): Promise<DeleteChatResponse>{
		const xhr = await chatInstance.delete(`/`, {chatId});
		return xhr.response;
	}


	async getFiles(chatId: number): Promise<Message[]> {
		const xhr = await chatInstance.post(`/${chatId}/files`);
		return xhr.response;
	}

	async getArchiveList(filters: ChatRequestFilters): Promise<ChatType[]> {
		const {offset, limit, title} = filters;
		const xhr = await chatInstance.get(`/archive`, {offset, limit, title});
		return xhr.response;
	}

	async archive(chatId: number): Promise<ArchiveChatResponse> {
		const xhr = await chatInstance.post(`/archive`, {chatId});
		return xhr.response;
	}

	async unarchive(chatId: number): Promise<ArchiveChatResponse> {
		const xhr = await chatInstance.post(`/unarchive`, {chatId});
		return xhr.response;
	}

	async getUsers(chatId: number, filters: GetChatUsersFilters): Promise<ChatUserResponse[]> {
		const {offset, limit, name, email} = filters;
		const xhr = await chatInstance.get(`/${chatId}/users`, {offset, limit, name, email});
		return xhr.response;
	}

	async getUnreadCount(chatId: number): Promise<GetUnreadResponse> {
		const xhr = await chatInstance.get(`/new/${chatId}`);
		return xhr.response;
	}

	async uploadAvatar(chatId: number, avatar: Blob): Promise<ChatType> {
		const formData = new FormData();
		formData.append('chatId', chatId.toString());
		formData.append('avatar', avatar);
		const xhr = await chatInstance.put(`/avatar`, formData);
		return xhr.response;
	}

	async addUsers(chatId: number, users: number[]): Promise<void>{
		await chatInstance.put(`/users`, {chatId, users});
	}

	async removeUsers(chatId: number, users: number[]){
		await chatInstance.delete(`/users`, {chatId, users});
	}

	async getToken(chatId: number): Promise<GetTokenResponse>{
		const xhr = await chatInstance.post(`/token/${chatId}`);
		return xhr.response;
	}
}


export const chatAPI = new ChatApi();
