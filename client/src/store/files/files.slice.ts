import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IFile } from '../../types';

interface InitialState {
	files: Array<IFile>;
	currentDir: string | null;
	dirStack: Array<string | null>;
}

const initialState: InitialState = {
	files: [],
	currentDir: null,
	dirStack: [],
};

export const getFiles = createAsyncThunk(
	'files/getFiles',
	async (parentId?: string | null) => {
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
	async (folderInfo: { name: string; parent: string | null }) => {
		const { name, parent } = folderInfo;
		const { data } = await axios.post(
			`${import.meta.env.VITE_URL}/api/files`,
			{
				name,
				type: 'dir',
				parent,
			},
			{
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			}
		);
		return data;
	}
);

export const uploadFile = createAsyncThunk(
	'files/uploadFile',
	async (fileInfo: { file: string | Blob; dirId: string | null }) => {
		const formData = new FormData();
		formData.append('file', fileInfo.file);

		if (fileInfo.dirId) {
			formData.append('parent', fileInfo.dirId);
		}

		const { data } = await axios.post(
			`${import.meta.env.VITE_URL}/api/files/upload`,
			formData,
			{
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			}
		);

		return data;
	}
);

export const deleteFile = createAsyncThunk(
	'files/deleteFile',
	async (file: IFile) => {
		const response = await axios.delete(
			`${import.meta.env.VITE_URL}/api/files?id=${file._id}`,
			{
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			}
		);

		return file._id;
	}
);

export const filesSlice = createSlice({
	name: 'files',
	initialState,
	reducers: {
		changeCurrentDir: (state, action: PayloadAction<string>) => {
			state.currentDir = action.payload;
		},
		pushDirStack: (state, action: PayloadAction<string | null>) => {
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
		builder.addCase(
			uploadFile.fulfilled,
			(state, action: PayloadAction<IFile>) => {
				state.files.push(action.payload);
			}
		);
		builder.addCase(
			deleteFile.fulfilled,
			(state, action: PayloadAction<string>) => {
				console.log(action.payload);
				state.files = state.files.filter((file) => file._id !== action.payload);
			}
		);
	},
});

export default filesSlice.reducer;
export const { changeCurrentDir, pushDirStack, popDirStack } =
	filesSlice.actions;
