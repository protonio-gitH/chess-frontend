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
		baseUrl: 'http://localhost:5000',
	},
	redux: {},
};
export type Config = typeof config;
export { config };
