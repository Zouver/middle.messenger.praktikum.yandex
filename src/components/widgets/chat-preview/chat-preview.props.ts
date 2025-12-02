import {type BaseProps} from '@/lib';
import {TextLabel, TextTitle, Text} from "@components/shared";

export interface ChatPreviewProps extends BaseProps{
	nickname: TextTitle;
	time: TextLabel;
	message: Text;
}

