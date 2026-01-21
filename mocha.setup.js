// Настраиваем jsdom для тестов
require('global-jsdom/register');

// Игнорируем CSS файлы в тестах
require('ignore-styles').default(['.css']);

// Регистрируем алиасы из tsconfig.test.json
const tsconfigPaths = require('tsconfig-paths');
const path = require('path');

const config = tsconfigPaths.loadConfig(path.resolve(__dirname, './tsconfig.test.json'));
if (config.resultType === 'failed') {
	throw new Error(`tsconfig-paths failed to load: ${config.message}`);
}

if (config.baseUrl && config.paths) {
	tsconfigPaths.register({
		baseUrl: path.resolve(__dirname, config.baseUrl),
		paths: config.paths,
	});
}
