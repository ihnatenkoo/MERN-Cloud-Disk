import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import $api from '../../http';
import { IFile } from '../../types';

interface InitialState {
	files: Array<IFile>;
	currentDir: string | null;
	dirStack: Array<string | null>;
	sort: string;
}
interface IGetFilesArgs {
	parentId?: string | null;
	sortBy?: string;
}

const initialState: InitialState = {
	files: [],
	currentDir: null,
	dirStack: [],
	sort: 'type',
};

export const getFiles = createAsyncThunk(
	'files/getFiles',
	async ({ parentId, sortBy }: IGetFilesArgs) => {
		let url = `${import.meta.env.VITE_URL}/api/files`;

		if (parentId) {
			url = `${import.meta.env.VITE_URL}/api/files?parent=${parentId}`;
		}
		if (sortBy) {
			url = `${import.meta.env.VITE_URL}/api/files?sort=${sortBy}`;
		}
		if (parentId && sortBy) {
			url = `${
				import.meta.env.VITE_URL
			}/api/files?parent=${parentId}&sort=${sortBy}`;
		}

		const { data } = await $api.get(url);

		return data;
	}
);

export const createFolder = createAsyncThunk(
	'files/createFolder',
	async (folderInfo: { name: string; parent: string | null }) => {
		const { name, parent } = folderInfo;
		const { data } = await $api.post(`${import.meta.env.VITE_URL}/api/files`, {
			name,
			type: 'dir',
			parent,
		});
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

		const { data } = await $api.post(
			`${import.meta.env.VITE_URL}/api/files/upload`,
			formData
		);

		return data;
	}
);

export const deleteFile = createAsyncThunk(
	'files/deleteFile',
	async (file: IFile) => {
		const response = await $api.delete(
			`${import.meta.env.VITE_URL}/api/files?id=${file._id}`
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
		changeSortBy: (state, action: PayloadAction<string>) => {
			state.sort = action.payload;
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
export const { changeCurrentDir, pushDirStack, popDirStack, changeSortBy } =
	filesSlice.actions;
