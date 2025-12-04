import { email, minLength, required } from "@/lib/validator/validators";
import {Input, KeyValueList, Text, KeyValueItem} from "@components/shared";

export const informationsDefault: KeyValueItem[] = [
	new KeyValueItem({
		key: "Почта",
		value: new Text({text: "pochta@yandex.ru"}),
	}),
	new KeyValueItem({
		key: "Логин",
		value: new Text({text: "ivanivanov"}),
	}),
	new KeyValueItem({
		key: "Имя",
		value: new Text({text: "Иван"}),
	}),
	new KeyValueItem({
		key: "Фамилия",
		value: new Text({text: "Иванов"}),
	}),
	new KeyValueItem({
		key: "Имя в чате",
		value: new Text({text: "Иван"}),
	}),
	new KeyValueItem({
		key: "Телефон",
		value: new Text({text: "+7 (909) 967 30 30"}),
	}),
];

export const informationsChangeDefault: KeyValueItem[] = [
	new KeyValueItem({
		key: "Почта",
		value: new Input({name: "email", value: "pochta@yandex.ru", type: "text", placeholder: "Почта", validators: [required(), email()]}),
	}),
	new KeyValueItem({
		key: "Логин",
		value: new Input({name: "login", value: "ivanivanov", type: "text", placeholder: "Логин", validators: [required(), minLength(4)]}),
	}),
	new KeyValueItem({
		key: "Имя",
		value: new Input({name: "first_name", value: "Иван", type: "text", placeholder: "Имя", validators: [required(), minLength(2)]},)
	}),
	new KeyValueItem({
		key: "Фамилия",
		value: new Input({name: "second_name", value: "Иванов", type: "text", placeholder: "Фамилия", validators: [required(), minLength(2)]})
	}),
	new KeyValueItem({
		key: "Имя в чате",
		value: new Input({name: "display_name", value: "Иван", type: "text", placeholder: "Имя в чате", validators: [required(), minLength(2)]})
	}),
	new KeyValueItem({
		key: "Телефон",
		value: new Input({name: "phone", value: "+7 (909) 967 30 30", type: "text", placeholder: "Телефон", validators: [required()]})
	}),
];

export const getInformationsDefaultByState = (isChange: boolean) => {
	const items = isChange ? informationsChangeDefault : informationsDefault;
	return new KeyValueList({items});
};
