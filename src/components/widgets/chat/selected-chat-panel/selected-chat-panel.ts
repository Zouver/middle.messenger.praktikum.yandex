
import {Component} from "@/lib/component";
import { getFormData } from "@/lib/utils/form.ts";
import { minLength, required } from "@/lib/validator/validators.ts";
import {Input, ButtonIcon} from "@components/shared";

import {selectedChatPanelTemplate} from "./selected-chat-panel.template.ts";

import type {SelectedChatPanelProps} from "./selected-chat-panel.props.ts";

import './selected-chat-panel.css';

export class SelectedChatPanel extends Component<SelectedChatPanelProps> {

    constructor(props: SelectedChatPanelProps = {}) {

        const attachButton = props.attachButton || new ButtonIcon({
            variant: "transparent",
            icon: "fa-solid fa-paperclip"
        });

        const input = props.input || new Input({
            type: "text",
            name: "message",
            placeholder: "Сообщение",
            validators: [
                required(),
                minLength(1)
            ]
        });

        const sendButton = props.sendButton || new ButtonIcon({
            type: "submit",
            variant: "primary",
            icon: "fa-solid fa-arrow-right"
        });

        const onSubmitDefault = (event: SubmitEvent) =>{
            event.preventDefault();
            const data = getFormData(event.target as HTMLFormElement);
            console.log(data);
            const isValid = input.validate(data.message as string);
            if (!isValid) return;
        };
        

        const events = props.events || {
            "submit": props.onSubmit || onSubmitDefault
        };

        super(
            "form",
            {...props, input, sendButton, attachButton, events},
            [],
            {id: "selected-chat-panel"}
        );
    }

    render() {
        return this.compile(selectedChatPanelTemplate, this.props);
    }
}

