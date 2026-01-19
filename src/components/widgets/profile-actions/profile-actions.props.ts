import {Button, Text} from '@components/shared';

import type {BaseProps} from "@/lib/component";
import type {ProfileState} from "@components/pages/profile/profile.props.ts";
export interface ProfileActionsProps extends BaseProps{
	setState: (state: ProfileState) => void;
	changeProfileButton?: Button;
	changePasswordButton?: Button;
	logoutLink?: Text;
}
