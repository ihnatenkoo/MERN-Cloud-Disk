import { configureStore } from '@reduxjs/toolkit';
import user from './user/user.slice';
import files from './files/files.slice';

export const store = configureStore({
	reducer: { user, files },
	devTools: import.meta.env.MODE !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
