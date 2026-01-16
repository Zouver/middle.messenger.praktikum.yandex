import {ButtonIcon, Text} from "@components/shared";

import type {ChatType} from "@/api/type.ts";
import type {BaseProps} from "@lib/component";

export interface CreateChatProps extends BaseProps{
	text?: Text;
	createChat?: ButtonIcon;
	onCreateChat: (chat: Pick<ChatType, "id">) => void;
}
