import {type BaseProps} from '@/lib/component';

export type ButtonVariant = "primary" | "transparent" | "critical"

export interface ButtonProps extends BaseProps{
	text: string;
	type?: HTMLButtonElement["type"];
	variant?: ButtonVariant;
}
