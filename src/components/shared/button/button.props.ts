import {type BaseProps} from '@/lib/component';

export type ButtonVariant = "primary" | "transparent"

export interface ButtonProps extends BaseProps{
	text: string;
	type?: HTMLButtonElement["type"];
	variant?: ButtonVariant;
}
