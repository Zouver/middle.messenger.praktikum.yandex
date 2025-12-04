import {type BaseProps} from '@/lib/component';
import {Input, Text} from "@components/shared";
import {ChatPreview} from "@components/widgets";


export interface ChatListProps extends BaseProps{
	text?: Text;
	search?: Input;
	chats: ChatPreview[];
}

