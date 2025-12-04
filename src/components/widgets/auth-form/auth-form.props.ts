import {Button, Input} from "@components/shared";

import type {BaseProps} from "@lib/component";

export interface AuthFormProps extends BaseProps{
	inputs: Input[];
	buttons: Button[];
	onSubmit?: (event: SubmitEvent) => void;
}
