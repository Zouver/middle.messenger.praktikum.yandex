import {type BaseProps} from '@/lib/component';

import type {Types} from "@components/shared/typography/types.ts";



export interface TextTitleProps extends BaseProps{
	text: string;
	variant?: Types
}

