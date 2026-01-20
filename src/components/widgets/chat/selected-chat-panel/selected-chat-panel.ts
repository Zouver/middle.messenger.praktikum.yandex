
import {Component} from "@/lib/component";
import { getFormData } from "@/lib/utils/form.ts";
import { minLength, required } from "@/lib/validator/validators.ts";
import {Input, ButtonIcon} from "@components/shared";

import {selectedChatPanelTemplate} from "./selected-chat-panel.template.ts";

import type {SelectedChatPanelProps} from "./selected-chat-panel.props.ts";

import './selected-chat-panel.css';

export class SelectedChatPanel extends Component<SelectedChatPanelProps> {
	constructor(props: SelectedChatPanelProps) {
				console.log("init selectedChatPanel");
        const attachButton = new ButtonIcon({
            variant: "transparent",
            icon: "fa-solid fa-paperclip"
        });

        const input = new Input({
            type: "text",
            name: "message",
            placeholder: "Сообщение",
            validators: [required(), minLength(1)]
        });

        const sendButton = new ButtonIcon({
            type: "submit",
            variant: "primary",
            icon: "fa-solid fa-arrow-right"
        });

			super("form", {...props, sendButton, attachButton, input}, [],{id: "selected-chat-panel"});
    }

		onSubmit = (event: SubmitEvent) =>{
			event.preventDefault();
			const data = getFormData<{message: string}>(event.target as HTMLFormElement);
			const isValid = this.props.input?.validate(data.message as string);
			if (!isValid) return;
			this.props.onSendMessage(data.message);
		};

		componentDidMount() {
			console.log(this.element);
			this.updateProps({events: {submit: this.onSubmit.bind(this)}});
		}

	render() {
        return this.compile(selectedChatPanelTemplate, this.props);
    }
}

