import {type BaseProps} from '@/lib/component';
import {TextLabel} from "@components/shared";


export interface InputProps extends BaseProps{
	name: string;
	type: HTMLInputElement["type"];
	value?: string;
	placeholder?: string;
	label?: TextLabel;
}

