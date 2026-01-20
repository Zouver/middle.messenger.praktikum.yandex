import {type BaseProps} from '@/lib/component';
import {Button, Input, Text} from "@components/shared";


export interface ProfilePictureProps extends BaseProps{
	changeAvatarText?: Text;
	submitButton?: Button;
	fileInput?: Input;
	avatar?: string;
}

