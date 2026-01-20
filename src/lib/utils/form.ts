export const getFormData = <P>(form: HTMLFormElement): P => {
	const formData = new FormData(form);
	return Object.fromEntries(formData) as P;
};
