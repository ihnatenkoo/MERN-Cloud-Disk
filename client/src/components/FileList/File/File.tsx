import { BaseSyntheticEvent, FC } from 'react';
import { IFile } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
	changeCurrentDir,
	deleteFile,
	getFiles,
	pushDirStack,
} from '../../../store/files/files.slice';
import cn from 'classnames';
import s from './File.module.scss';
import { downloadFile } from '../../../utils/downloadFile';

interface FileProps {
	file: IFile;
}

const File: FC<FileProps> = ({ file }) => {
	const dispatch = useAppDispatch();
	const currentDir = useAppSelector((state) => state.files.currentDir);

	const onFileClickHandler = () => {
		if (file.type === 'dir') {
			dispatch(getFiles(file._id));
			dispatch(changeCurrentDir(file._id));
			dispatch(pushDirStack(currentDir));
		}
	};

	const onDownloadHandler = async (e: BaseSyntheticEvent) => {
		e.stopPropagation();
		downloadFile(file);
	};

	const onDeleteHandler = async (e: BaseSyntheticEvent) => {
		e.stopPropagation();
		dispatch(deleteFile(file));
	};

	return (
		<div className={s.file} onClick={onFileClickHandler}>
			{file.type === 'dir' ? (
				<span className={cn(s.file__type, 'material-icons')}>folder_open</span>
			) : (
				<span className={cn(s.file__type, 'material-icons-outlined')}>
					description
				</span>
			)}
			<span>{file.name}</span>
			<span className={s.file__date}>{file.date.slice(0, 10)}</span>
			<span className={s.file__size}>{file.size}</span>
			{file.type !== 'dir' && (
				<button
					className={cn(s.file__download, s.file__btn)}
					onClick={onDownloadHandler}
				>
					<span className="material-icons-outlined">file_download</span>
				</button>
			)}

			<button
				className={cn(s.file__delete, s.file__btn)}
				onClick={onDeleteHandler}
			>
				<span className="material-icons-outlined">delete</span>
			</button>
		</div>
	);
};

export default File;
