import {type BaseProps} from '@/lib';
import {TextDisplay, TextHeading, Text} from "@components/shared";

export interface ErrorPageProps extends BaseProps{
	code: 404 | 500;
	errorCode?: TextDisplay;
	errorContent?: TextHeading;
	backButton?: Text;
}

