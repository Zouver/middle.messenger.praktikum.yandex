import {Button, KeyValueList} from "@components/shared";

import type {BaseProps} from "@/lib/component";

export interface ProfileChangePasswordProps extends BaseProps{
	inputs?: KeyValueList;
	submitButton?: Button;
	onSubmit?: (event: SubmitEvent) => void
}
