import {Component} from "@/lib";

import {messageTemplate} from "./message.template.ts";

import type {MessageProps} from "./message.props.ts";
import './message.css'

export class Message extends Component<MessageProps> {
	constructor(props: MessageProps) {
		const classNames = ["message", `initiator-${props.initiator}`, `type-${props.type}`];

		super(
			"div",
			props,
			classNames
		);
	}

	render() {
		return this.compile(messageTemplate, this.props);
	}
}

