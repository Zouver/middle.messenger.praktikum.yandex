import {TextLabel, TextTitle, Text} from "@components/shared";
import { ChatList, ChatPreview} from "@components/widgets";

export interface IChat {
	nickname: string;
	message: string;
	time: string;
	isYourMessage?: boolean;
}

export const chats: IChat[] = [
	{
		nickname: "Вадим",
		message: "Друзья, у меня для вас особенный выпуск новостей!...",
		time: "пт",
		isYourMessage: false
	},
	{
		nickname: "Андрей",
		message: "Изображение",
		time: "10:49",
	},
	{
		nickname: "Киноклуб",
		message: "Вы: стикер",
		time: "12:00",
	},
	{
		nickname: "Илья",
		message: "Друзья, у меня для вас особенный выпуск новостей!...",
		time: "15:12",
	},
	{
		nickname: "Вадим",
		message: "Вы: Круто!",
		time: "пт",
	},
	{
		nickname: "тет-а-теты",
		message: "И Human Interface Guidelines и Material Design рекомендуют...",
		time: "ср",
	},
	{
		nickname: "1, 2, 3",
		message: "Миллионы россиян ежедневно проводят десятки часов своe...",
		time: "пн",
	},
	{
		nickname: "Design Destroyer",
		message: "В 2008 году художник Jon Rafman начал собират...",
		time: "пн",
	},
	{
		nickname: "Day.",
		message: "Так увлёкся работой по курсу, что совсем забыл его анонсир...",
		time: "1 мая 2020",
	},
	{
		nickname: "Стас Рогозин",
		message: "Можно или сегодня или завтра...",
		time: "12 апр 2020",
	},
];

export const chatListDefault = new ChatList({chats: chats.map((chat) => new ChatPreview({
	nickname: new TextTitle({text: chat.nickname}),
	time: new TextLabel({text: chat.time}),
	message: new Text({text: chat.message})
}))});

