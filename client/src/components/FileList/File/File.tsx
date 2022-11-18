import { FC } from 'react';
import { IFile } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
	changeCurrentDir,
	getFiles,
	pushDirStack,
} from '../../../store/files/files.slice';
import cn from 'classnames';
import s from './File.module.scss';

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
		</div>
	);
};

export default File;
