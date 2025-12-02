import {type BaseProps} from '@/lib'

import type {Types} from "@components/shared/typography/types.ts";


export interface TextProps extends BaseProps{
	text: string;
	variant?: Types
}
