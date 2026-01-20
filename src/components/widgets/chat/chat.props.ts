import {type BaseProps} from '@/lib/component';
import {Button, TextTitle} from "@components/shared";
import {Message} from "@components/widgets";

import type { SelectedChatPanel } from './selected-chat-panel/selected-chat-panel';
import type {ChatType} from "@/api/type.ts";


export interface ChatProps extends BaseProps{
	chat: ChatType;
	token?: string;
	title?: TextTitle;
	messages?: Message[];
	chatPanel?: SelectedChatPanel
	deleteUserButton?: Button;
	addUserButton?: Button;
}

