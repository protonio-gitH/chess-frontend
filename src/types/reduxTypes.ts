import { Config } from '../config';
import { store } from '../index';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ConfigRedux = Config['redux'];
