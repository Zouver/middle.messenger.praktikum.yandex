import {API_URL, AUTH_ENDPOINT, USER_ENDPOINT} from "@/api/consts.ts";
import {HTTPTransport} from "@lib/http/httptransport.ts";

import type {User} from "@/api/type.ts";

export type UserCreateData = {
	first_name: string;
	second_name: string;
	login: string;
	email: string;
	password: string;
	phone: string;
}

export type UserUpdateData = {
	oldPassword?: string;
	newPassword?: string;
	avatar?: FormData
	user?: Omit<User, "id" | "avatar">
}

const authInstance = new HTTPTransport({
	baseURL: API_URL,
	endpoint: AUTH_ENDPOINT
});

const userInstance = new HTTPTransport({
	baseURL: API_URL,
	endpoint: USER_ENDPOINT
});


export class UserApi {
	async create(data: UserCreateData): Promise<Omit<User, "id">> {
		const xhr = await authInstance.post('/signup', data);
		return xhr.response;
	}


	async request(): Promise<User>;
	async request(login: string): Promise<User[]>;
	async request(login?: string): Promise<User| User[]>{
		if(login){
			const xhr = await userInstance.post('/search', {login});
			return xhr.response as User[];
		}

		const xhr= await authInstance.get(`/user`);
		return xhr.response as User;
	}

	async update({
		oldPassword,
		newPassword,
		avatar,
		user
	}: UserUpdateData): Promise<User | string> {

		if(user){
			const xhr = await userInstance.put('/profile', user);
			return xhr.response as User;
		}

		if(avatar){
			const xhr = await userInstance.put('/profile/avatar', avatar);
			return xhr.response as User;
		}

		if(oldPassword && newPassword){
			const xhr = await userInstance.put('/password', {oldPassword,newPassword});
			return xhr.response as string;
		}

		throw new Error("Not options found");
	}

	async login(login: string, password: string) {
		await authInstance.post('/signin', {
			login,
			password
		});
	}

	async logout() {
		await authInstance.post('/logout');
	}
}

export const userApi = new UserApi();
