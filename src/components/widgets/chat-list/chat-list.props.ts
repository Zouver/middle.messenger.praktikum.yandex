import {type BaseProps} from '@/lib/component';
import {Input, Text} from "@components/shared";
import {ChatPreview, CreateChat} from "@components/widgets";

import type {ChatType} from "@/api/type.ts";

export interface ChatListProps extends BaseProps{
	text?: Text;
	search?: Input;
	chats: ChatPreview[];
	createChat?: CreateChat;
	onCreateChat: (chat: Pick<ChatType, "id">) => void;
	onSearch: (value: string) => void;
}

