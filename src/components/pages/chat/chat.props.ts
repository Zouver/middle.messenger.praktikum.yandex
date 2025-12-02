import {type BaseProps} from '@/lib/component';
import {Chat, ChatList} from "@components/widgets";


export interface ChatPageProps extends BaseProps{
	chatList?: ChatList;
	chat?: Chat;
}

