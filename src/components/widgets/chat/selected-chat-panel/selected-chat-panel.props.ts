import type { ButtonIcon, Input } from "@/components/shared";
import type { BaseProps } from "@/lib/component";

export interface SelectedChatPanelProps extends BaseProps {
    attachButton?: ButtonIcon;
    input?: Input;
    sendButton?: ButtonIcon;
		onSendMessage: (value: string) => void;
}
