import {Component, type BaseProps} from '@/lib/component';
import {TextLabel} from "@components/shared";

import type { ValidatorFn } from '@/lib/validator/types';


export interface InputProps extends BaseProps{
	name: string;
	type: HTMLInputElement["type"];
	value?: string;
	placeholder?: string;
	label?: TextLabel;
	error?: string;
	input?: Component;
	validators?: ValidatorFn[]
}

