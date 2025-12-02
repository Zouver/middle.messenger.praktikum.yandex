import {Button, KeyValueList} from "@components/shared";

import type {BaseProps} from "@/lib";

export interface ProfileInformationProps extends BaseProps {
	informations?: KeyValueList;
	submitButton?: Button;
	isChange?: boolean;
}
