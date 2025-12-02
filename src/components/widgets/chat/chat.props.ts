import {type BaseProps} from '@/lib/component';
import {ButtonIcon, Input, TextTitle} from "@components/shared";
import {Message} from "@components/widgets";


export interface ChatProps extends BaseProps{
	title: TextTitle;
	messages: Message[];
	input?: Input
	attachButton?: ButtonIcon;
	sendButton?: ButtonIcon;
}

