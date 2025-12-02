import {type BaseProps} from '@/lib';
import {Text, TextLabel} from "@components/shared";

export type Initiator = "self" | "companion"
export type Status = "fa-check" | "fa-check-double" | "fa-clock";
export type MessageType = "picture" | "text" ;

export interface MessageProps extends BaseProps{
	initiator: Initiator;
	type: MessageType;
	message?: Text;
	picture?: string;
	time: TextLabel;
	statusIcon?: Status;
}

