import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IFile } from '../../types';

interface InitialState {
	files: Array<IFile>;
	currentDir: string;
}

const initialState: InitialState = {
	files: [],
	currentDir: '',
};

export const getFiles = createAsyncThunk(
	'files/getFiles',
	async (parentId?: string) => {
		const { data } = await axios.get(
			`${import.meta.env.VITE_URL}/api/files/${
				parentId ? '?parent=' + parentId : ''
			}`,
			{
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			}
		);

		return data;
	}
);

export const createFolder = createAsyncThunk(
	'files/createFolder',
	async (folderInfo: { name: string; dirId?: string }) => {
		const { name, dirId } = folderInfo;
		const { data } = await axios.post(
			`${import.meta.env.VITE_URL}/api/files`,
			{
				name,
				type: 'dir',
				dirId,
			},
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
			state.files = [];
		});
		builder.addCase(createFolder.fulfilled, (state, action) => {
			state.files.push(action.payload);
		});
	},
});

export default filesSlice.reducer;
