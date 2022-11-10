import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ILoginData, IUser } from '../../types';

interface InitialState {
	currentUser: IUser | null;
	isAuth: boolean;
}

const initialState: InitialState = {
	currentUser: null,
	isAuth: false,
};

export const loginUser = createAsyncThunk(
	'user/login',
	async (loginData: ILoginData) => {
		const { email, password } = loginData;

		const { data } = await axios.post(
			`${import.meta.env.VITE_URL}/api/auth/login`,
			{
				email,
				password,
			}
		);
		return data;
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: (state) => {
			state.currentUser = null;
			state.isAuth = false;
			localStorage.removeItem('token');
		},
	},
	extraReducers(builder) {
		builder
			.addCase(loginUser.fulfilled, (state, action) => {
				state.currentUser = action.payload.user;
				state.isAuth = true;
				localStorage.setItem('token', action.payload.token);
			})
			.addCase(loginUser.rejected, (state) => {
				state.currentUser = null;
				state.isAuth = false;
				localStorage.removeItem('token');
			});
	},
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;
