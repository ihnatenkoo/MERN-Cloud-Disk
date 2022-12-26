import { DragEvent, FC, useState } from 'react';
import CreateDirPopup from '../../components/CreateDirPopup/CreateDirPopup';
import FileList from '../../components/FileList/FileList';
import FileNavigation from '../../components/FileNavigation/FileNavigation';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { uploadFile } from '../../store/files/files.slice';
import s from './MainPage.module.scss';

const MainPage: FC = () => {
	const [showPopup, setShowPopup] = useState<boolean>(false);
	const [dragEnter, setDragEnter] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const dirId = useAppSelector((state) => state.files.currentDir);

	const dragEnterHandler = (event: DragEvent) => {
		event.preventDefault();
		event.stopPropagation();
		setDragEnter(true);
	};

	const dragLeaveHandler = (event: DragEvent) => {
		event.preventDefault();
		event.stopPropagation();
		setDragEnter(false);
	};

	const onDropHandler = (event: DragEvent) => {
		event.preventDefault();
		event.stopPropagation();
		let files = [...event.dataTransfer.files];
		files.forEach((file: string | Blob) => {
			dispatch(uploadFile({ file, dirId }));
		});
		setDragEnter(false);
	};

	return dragEnter ? (
		<div
			className={s.drop_area}
			onDragEnter={dragEnterHandler}
			onDragLeave={dragLeaveHandler}
			onDragOver={dragEnterHandler}
			onDrop={onDropHandler}
		>
			Drag files here...
		</div>
	) : (
		<section
			className={s.main}
			onDragEnter={dragEnterHandler}
			onDragLeave={dragLeaveHandler}
			onDragOver={dragEnterHandler}
		>
			<FileNavigation setShowPopup={setShowPopup} />
			<FileList />
			<CreateDirPopup showPopup={showPopup} setShowPopup={setShowPopup} />
		</section>
	);
};

export default MainPage;
