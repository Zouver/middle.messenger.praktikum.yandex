import {type BaseProps} from '@/lib'

import type {Types} from "@components/shared/typography/types.ts";

export interface TextDisplayProps extends BaseProps{
	text: string;
	variant?: Types
}

