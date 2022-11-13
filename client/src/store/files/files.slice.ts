import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IFile } from '../../types';

interface InitialState {
	files: Array<IFile> | null;
	currentDir: string;
}

const initialState: InitialState = {
	files: null,
	currentDir: '',
};

export const getFiles = createAsyncThunk(
	'files/getAll',
	async (parentId?: string) => {
		const { data } = await axios.get(
			`${import.meta.env.VITE_URL}/api/files${
				parentId ? '?parent=' + parentId : ''
			}`,
			{
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			}
		);

		return data;
	}
);

export const filesSlice = createSlice({
	name: 'files',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(getFiles.fulfilled, (state, action) => {
			state.files = action.payload;
		});
		builder.addCase(getFiles.rejected, (state) => {
			state.files = null;
		});
	},
});

export default filesSlice.reducer;
