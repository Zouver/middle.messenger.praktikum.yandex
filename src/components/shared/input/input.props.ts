import {type BaseProps} from '@/lib';
import {TextLabel} from "@components/shared";

export interface InputProps extends BaseProps{
	name: string;
	type: HTMLInputElement["type"];
	value?: string;
	placeholder?: string;
	label?: TextLabel;
}

