import {type BaseProps} from '@/lib';

import type {Types} from "@components/shared/typography/types.ts";

export interface TextLabelProps extends BaseProps{
	text: string;
	variant?: Types
}

