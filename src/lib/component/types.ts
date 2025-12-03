export type Events = Partial<{[K in keyof HTMLElementEventMap]: (event: HTMLElementEventMap[K]) => void;}>

export interface BaseProps {
	events?: Events;
}

export interface Meta {
	tagName: string;
	props: BaseProps
	attributes?: Record<string, string>;
	classNames?: string[];
}

