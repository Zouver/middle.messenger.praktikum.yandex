import {type BaseProps} from '@/lib';
import {Button, Input, TextHeading} from "@components/shared";

export interface SignupProps extends BaseProps{
	heading?: TextHeading;
	inputs?: Input[];
	buttons?: Button[];
}

