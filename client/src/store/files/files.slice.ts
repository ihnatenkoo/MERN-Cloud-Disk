import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IFile } from '../../types';

interface InitialState {
	files: Array<IFile>;
	currentDir: string;
	dirStack: Array<string>;
}

const initialState: InitialState = {
	files: [],
	currentDir: '',
	dirStack: [],
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
				parent: dirId,
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
	reducers: {
		changeCurrentDir: (state, action: PayloadAction<string>) => {
			state.currentDir = action.payload;
		},
		pushDirStack: (state, action: PayloadAction<string>) => {
			state.dirStack.push(action.payload);
		},
		popDirStack: (state) => {
			state.currentDir = state.dirStack.pop()!;
		},
	},
	extraReducers(builder) {
		builder.addCase(
			getFiles.fulfilled,
			(state, action: PayloadAction<Array<IFile>>) => {
				state.files = action.payload;
			}
		);
		builder.addCase(getFiles.rejected, (state) => {
			state.files = [];
		});
		builder.addCase(
			createFolder.fulfilled,
			(state, action: PayloadAction<IFile>) => {
				state.files.push(action.payload);
			}
		);
	},
});

export default filesSlice.reducer;
export const { changeCurrentDir, pushDirStack, popDirStack } =
	filesSlice.actions;
