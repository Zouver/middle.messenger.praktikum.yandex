import {Component} from "@/lib";

import {KeyValueItemTemplate} from "./key-value-item.template.ts";

import type {KeyValueItemProps} from "./key-value-item.props.ts";
import "./key-value-item.css";

export class KeyValueItem extends Component<KeyValueItemProps> {

	constructor(props: KeyValueItemProps) {
		super("div", props, ["key-value-item"]);
	}


	render(){
		return this.compile(KeyValueItemTemplate, this.props);
	}
}
