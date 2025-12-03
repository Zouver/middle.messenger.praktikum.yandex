import { passwordStrong, required } from "@/lib/validator/validators";
import {Button, Input, KeyValueItem, KeyValueList} from "@components/shared";

export const changePasswordInputs: KeyValueItem[] = [
	new KeyValueItem({
		key: "Старый пароль",
		value: new Input({name: "oldPassword", value: "pochta@yandex.ru", type: "password"})
	}),
	new KeyValueItem({
		key: "Новый пароль",
		value: new Input({name: "newPassword", value: "ivanivanov", type: "password", validators: [required(), passwordStrong()]})
	}),
	new KeyValueItem({
		key: "Повторите новый пароль",
		value: new Input({name: "newPasswordSubmit", value: "ivanivanov", type: "password", validators: [required(), passwordStrong()]})
	}),
];


export const changePasswordInputsDefault = new KeyValueList({items: changePasswordInputs});


export const submitButtonDefault  = new Button({
	variant: "primary",
	text: "Сохранить",
	type: "submit"
});
