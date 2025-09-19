const config = {
	//   store: {
	//     // Логировать установку состояния?
	//     log: !isProduction,
	//     // Настройки модулей состояния
	//     modules: {
	//       session: {
	//         // Названия токена в АПИ
	//         tokenHeader: 'X-Token',
	//       },
	//     },
	//   },
	api: {
		baseUrl: 'https://localhost:3000',
	},
};
export type Config = typeof config;
export { config };
