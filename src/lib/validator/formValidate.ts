import type {InputForm} from "@components/shared";

export const formValidate = (data: Record<string,string>, inputs: InputForm[]) => {
	return Object.entries(data).every(([key, value]) => {
		const input =inputs.find(input => input.props.name === key) as InputForm;
		return input.validate(value as string);
	});
};
