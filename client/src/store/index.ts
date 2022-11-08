import { configureStore } from '@reduxjs/toolkit';
import user from './user/user.slice';

export const store = configureStore({
	reducer: { user },
	devTools: import.meta.env['NODE_ENV'] !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
