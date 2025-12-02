import {type BaseProps} from '@/lib'

import type {ButtonVariant} from "@components/shared/button/button.props.ts";

export interface ButtonIconProps extends BaseProps{
	icon: string;
	variant?: ButtonVariant;
	type?: HTMLButtonElement["type"];
}

