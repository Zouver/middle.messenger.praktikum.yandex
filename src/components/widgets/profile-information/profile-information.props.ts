import {Button, KeyValueList} from "@components/shared";

import type {BaseProps} from "@/lib/component";

export interface ProfileInformationProps extends BaseProps {
	informations?: KeyValueList;
	submitButton?: Button;
	isChange?: boolean;
}
