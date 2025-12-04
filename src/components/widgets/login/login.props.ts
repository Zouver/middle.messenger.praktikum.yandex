import {type BaseProps} from '@/lib/component';
import {Input, Button, TextHeading} from "@components/shared";
import {AuthForm} from "@components/widgets";


export interface LoginProps extends BaseProps{
	heading?: TextHeading;
	authForm?: AuthForm;
	inputs?: Input[];
	buttons?: Button[];
}

