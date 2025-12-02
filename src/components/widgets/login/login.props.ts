import {type BaseProps} from '@/lib';
import {TextHeading, Input, Button} from "@components/shared";

export interface LoginProps extends BaseProps{
	heading?: TextHeading;
	inputs?: Input[];
	buttons?: Button[];
}

