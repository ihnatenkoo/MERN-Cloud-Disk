import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFiles } from '../../store/files/files.slice';
import File from './File/File';
import s from './FileList.module.scss';

const FileList: FC = () => {
	const dispatch = useAppDispatch();
	const currentDir = useAppSelector((state) => state.files.currentDir);
	const files = useAppSelector((state) => state.files.files);

	useEffect(() => {
		dispatch(getFiles(currentDir));
	}, [currentDir]);

	return (
		<div className={s.list}>
			<div className={s.list__header}>
				<div className={s.list__header_name}>Name</div>
				<div className={s.list__header_date}>Date</div>
				<div className={s.list__header_size}>Size</div>
			</div>
			<div className={s.list__content}>
				{!files?.length && (
					<p className={s.list__content_empty}>No files uploaded</p>
				)}
				{files?.map((file) => (
					<File file={file} key={file._id} />
				))}
			</div>
		</div>
	);
};

export default FileList;