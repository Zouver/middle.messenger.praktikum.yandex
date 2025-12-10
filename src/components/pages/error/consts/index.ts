import {TextDisplay, TextHeading} from "@components/shared";


const ERROR_CODE_TEXT: Record<404 | 500, string> = {
	404: "Не туда попали",
	500: "Мы уже фиксим"
};

export const getContentByStatusCode = (statusCode: 404 | 500) => {

	const errorCodeDefault = new TextDisplay({
		text: statusCode.toString(),
		variant: "default"
	});

	const errorContentDefault = new TextHeading({
		text: ERROR_CODE_TEXT[statusCode],
		variant: "default"
	});

	return{
		errorCodeDefault,
		errorContentDefault
	};
};
