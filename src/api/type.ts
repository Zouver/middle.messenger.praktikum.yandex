export interface User {
	avatar?: string;
	display_name?: string;
	email: string;
	first_name: string;
	id: number;
	login: string;
	phone: string;
	second_name: string;
}

export interface LastMessage {
	user: Omit<User, 'id' | 'display_name'>;
	time: string;
	content: string;
}

export interface Message {
	id: number;
	user_id: number;
	chat_id: number;
	time: string; // ISO date-time string
	type: 'message' | 'file';
	content: string;
	file?: Resource;
}

export interface Resource {
	id: number;
	user_id: number;
	path: string;
	filename: string;
	content_type: string;
	content_size: number;
	upload_date: string; // ISO date-time string
}

export interface ChatType {
	id: number;
	title: string;
	avatar: string | null;
	unread_count: number;
	created_by: number;
	last_message?: LastMessage;
}

export interface PaginationFilters{
	offset: number;
	limit: number;
}
