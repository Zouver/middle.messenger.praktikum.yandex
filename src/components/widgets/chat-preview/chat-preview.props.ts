import {type BaseProps} from '@/lib/component';
import {TextLabel, TextTitle, Text} from "@components/shared";

import type {ChatType} from "@/api/type.ts";


export interface ChatPreviewProps extends BaseProps{
	nickname: TextTitle;
	time: TextLabel;
	message: Text;
	chat: ChatType;
	onClick: (chat: ChatType) => void;
}

