import {type BaseProps, Component} from "@/lib";

export interface KeyValueItemProps extends BaseProps{
	key: string;
	value: Component;
}
