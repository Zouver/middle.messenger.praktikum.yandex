import {Component} from "@/lib";

import {keyValueListTemplate} from "./key-value-list.template.ts";

import type { KeyValueListProps} from "./key-value-list.props.ts";
import './key-value-list.css';

export class KeyValueList extends Component<KeyValueListProps> {

	constructor(props: KeyValueListProps) {
		super(
			"div",
			props,
			["key-value-list"]
		);
	}

	render() {
		return this.compile(keyValueListTemplate, this.props);
	}
}

