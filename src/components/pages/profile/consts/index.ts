import {TextHeading, Text} from "@components/shared";
import {ProfilePicture} from "@components/widgets";

export const headingDefault = new TextHeading({
	text: "Иван",
	variant: "default"
});

export const profilePictureDefault = new ProfilePicture({
	changeAvatarText: new Text({
		text: "Поменять аватар",
		variant: "on-dark"
	}),
})
