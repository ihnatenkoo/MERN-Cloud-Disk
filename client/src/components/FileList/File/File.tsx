import { BaseSyntheticEvent, FC } from 'react';
import { IFile } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
	changeCurrentDir,
	deleteFile,
	getFiles,
	pushDirStack,
} from '../../../store/files/files.slice';
import { downloadFile } from '../../../utils/downloadFile';
import sizeFormat from '../../../utils/sizeFormat';
import cn from 'classnames';
import s from './File.module.scss';

interface FileProps {
	file: IFile;
}

const File: FC<FileProps> = ({ file }) => {
	const dispatch = useAppDispatch();
	const currentDir = useAppSelector((state) => state.files.currentDir);
	const view = useAppSelector((state) => state.files.view);

	const onFileClickHandler = () => {
		if (file.type === 'dir') {
			dispatch(getFiles({ parentId: file._id }));
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
		<div
			className={cn(s.file, { [s.plate]: view === 'plate' })}
			onClick={onFileClickHandler}
		>
			{file.type === 'dir' ? (
				<span className={cn(s.file__type, 'material-icons')}>folder_open</span>
			) : (
				<span className={cn(s.file__type, 'material-icons-outlined')}>
					description
				</span>
			)}

			<span>{view === 'list' ? file.name : file.name.slice(0, 15)}</span>

			{view === 'list' && (
				<span className={s.file__date}>{file.date.slice(0, 10)}</span>
			)}

			{view === 'list' && file.type !== 'dir' && (
				<span className={s.file__size}>{sizeFormat(file.size)}</span>
			)}

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
