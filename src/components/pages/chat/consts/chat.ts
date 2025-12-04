import {Text, TextLabel, TextTitle} from "@components/shared";
import {Chat, Message} from "@components/widgets";

import type {Initiator, MessageType, Status} from "@components/widgets/message/message.props.ts";

export type IMessage<I extends Initiator = Initiator, M extends MessageType = MessageType> = {
	message?: M extends "text" ? string : undefined;
	initiator: I;
	time: string;
	statusIcon?: I extends "self" ? Status : undefined;
	picture?: M extends "picture" ? string : undefined;
	type: M;
};

const message1: IMessage<"companion", "text"> = {
	message: "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — " +
		"НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. " +
		"Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих " +
		"камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с " +
		"пленкой.\n Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они " +
		"так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на " +
		"аукционе за 45000 евро.",
	initiator: "companion",
	time: "11:56",
	type: "text",
};

const message12: IMessage<"self", "text"> = {
	message: "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — " +
		"НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. " +
		"Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих " +
		"камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с " +
		"пленкой.\n Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они " +
		"так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на " +
		"аукционе за 45000 евро.",
	initiator: "self",
	time: "11:56",
	type: "text",
	statusIcon: "fa-clock"
};


const message2: IMessage<"companion", "picture" > = {
	initiator: "companion",
	type: "picture",
	picture: "/camera.png",
	time: "11:56",
};

const message3: IMessage<"self", "text" > = {
	initiator: "self",
	type: "text",
	message: "Круто!",
	time: "12:00",
	statusIcon: "fa-check-double"
};

export const chatList: IMessage[] = [
	message1,
	message2,
	message12,
	message3
];


export const chatDefault = new Chat({
	title: new TextTitle({text: ""}),
	messages: chatList.map((message) => new Message({
		initiator: message.initiator,
		type: message.type,
		message: message.message ? new Text({text: message.message}) : undefined,
		picture: message.picture,
		time: new TextLabel({text: message.time}),
		statusIcon: message.statusIcon,
	}))
});
