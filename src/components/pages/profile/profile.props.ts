import {type BaseProps} from '@/lib';
import {TextHeading} from "@components/shared";
import {ProfileNav, ProfileActions, ProfilePicture, ProfileChangePassword, ProfileInformation} from "@components/widgets";

export interface ProfilePageProps extends BaseProps{
	state: "default" | "profile-change" | "password-change";
	isDefaultState?: boolean;
	isChangePassword? : boolean;
	profileNav?: ProfileNav;
	heading?: TextHeading;
	profileInformations?: ProfileInformation;
	profileActions?: ProfileActions;
	profilePicture?: ProfilePicture
	profilePasswordChange?: ProfileChangePassword
}

