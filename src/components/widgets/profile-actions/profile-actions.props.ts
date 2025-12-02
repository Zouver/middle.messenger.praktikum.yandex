import {Text} from '@components/shared'

import type {BaseProps} from "@/lib";
export interface ProfileActionsProps extends BaseProps{
	changeProfileLink?: Text;
	changePasswordLink?: Text;
	logoutLink?: Text;
}
