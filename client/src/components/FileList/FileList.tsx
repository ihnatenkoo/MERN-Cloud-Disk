import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFiles } from '../../store/files/files.slice';

const FileList: FC = () => {
	const dispatch = useAppDispatch();
	const currentDir = useAppSelector((state) => state.files.currentDir);

	useEffect(() => {
		dispatch(getFiles(currentDir));
	}, [currentDir]);

	return <div>FileList</div>;
};
export default FileList;
