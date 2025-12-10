import {type BaseProps} from '@/lib/component';
import {Login, Signup} from "@components/widgets";


export interface AuthPageProps extends BaseProps{
	widget: Login | Signup;
}

