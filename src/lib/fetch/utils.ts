export const queryStringify = (data:  Record<string, string>) => {
	if (typeof data !== 'object') {
		throw new Error('Data must be object');
	}

	const keys = Object.keys(data);
	return keys.reduce((result, key, index) => {
		return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
	}, '?');
};


export const buildQueryURL = (
	url: string,
	data: Record<string, string>) => {

	const params = queryStringify(data);
	return `${url}?${params}`;
};


export const isStringDict = (value: unknown): value is Record<string, string> => {
	if (value !== null && typeof value === 'object') {
		return Object.values(value).every((v) => typeof v === 'string');
	}
	return false;
};
