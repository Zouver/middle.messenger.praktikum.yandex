import {type BaseProps} from '@/lib/component';
import {TextHeading} from "@components/shared";
import {ProfileNav, ProfileActions, ProfilePicture, ProfileChangePassword, ProfileInformation} from "@components/widgets";


export type ProfileState = "default" | "profile-change" | "password-change"

export interface ProfilePageProps extends BaseProps{
	state: ProfileState;
	isDefaultState?: boolean;
	isChangePassword? : boolean;
	profileNav?: ProfileNav;
	heading?: TextHeading;
	profileInformations?: ProfileInformation;
	profileActions?: ProfileActions;
	profilePicture?: ProfilePicture
	profilePasswordChange?: ProfileChangePassword
}

