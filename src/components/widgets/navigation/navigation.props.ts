import {type BaseProps} from '@/lib/component';

export interface Page {
	url: string;
	title: string;
}

export interface NavigationProps extends BaseProps{
	pages: Page[];
}

