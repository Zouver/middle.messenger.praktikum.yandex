import {type BaseProps} from '@/lib';
import {Login, Signup} from "@components/widgets";

export interface AuthPageProps extends BaseProps{
	widget: Login | Signup;
}

