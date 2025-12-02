export type Events = Partial<{[K in keyof HTMLElementEventMap]: EventListener}>

export interface BaseProps {
	events?: Events;
}

export interface Meta {
	tagName: string;
	props: BaseProps
	attributes?: Record<string, string>;
	classNames?: string[];
}

