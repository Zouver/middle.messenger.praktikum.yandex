import {type BaseProps} from '@/lib/component';
import {Button, Input, TextHeading} from "@components/shared";
import {AuthForm} from "@components/widgets";

export interface SignupProps extends BaseProps{
	heading?: TextHeading;
	authForm?: AuthForm;
	inputs?: Input[];
	buttons?: Button[];
}

