import {Component} from "@/lib/component";

import {chatPreviewTemplate} from "./chat-preview.template.ts";

import type {ChatPreviewProps} from "./chat-preview.props.ts";

import './chat-preview.css';

export class ChatPreview extends Component<ChatPreviewProps> {
	constructor(props: ChatPreviewProps) {
		super("div", props, ["chat-preview"]);
	}

	componentDidMount() {
		this.updateProps({events: {click: this.onClick.bind(this)}});
	}

	onClick(event: PointerEvent){
		event.preventDefault();
		this.props.onClick(this.props.chat);
	}

	render() {
		return this.compile(chatPreviewTemplate, this.props);
	}
}

