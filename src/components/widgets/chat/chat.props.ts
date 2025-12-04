import {type BaseProps} from '@/lib/component';
import {TextTitle} from "@components/shared";
import {Message} from "@components/widgets";

import type { SelectedChatPanel } from './selected-chat-panel/selected-chat-panel';


export interface ChatProps extends BaseProps{
	title: TextTitle;
	messages: Message[];
	selectedChatPanel?: SelectedChatPanel
}

