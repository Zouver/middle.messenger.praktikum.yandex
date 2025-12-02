import {type BaseProps, Component} from "@/lib/component";

export interface KeyValueItemProps extends BaseProps{
	key: string;
	value: Component;
}
