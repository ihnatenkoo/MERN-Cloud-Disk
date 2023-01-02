import { ChangeEvent, FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
	changeSortBy,
	popDirStack,
	uploadFile,
} from '../../store/files/files.slice';
import MainBtn from '../ui/MainBtn/MainBtn';
import s from './FileNavigation.module.scss';

interface IFileNavigation {
	setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const FileNavigation: FC<IFileNavigation> = ({ setShowPopup }) => {
	const dispatch = useAppDispatch();
	const dirStack = useAppSelector((state) => state.files.dirStack);
	const dirId = useAppSelector((state) => state.files.currentDir);
	const sortBy = useAppSelector((state) => state.files.sort);

	const handleFolderCreating = () => {
		setShowPopup(true);
	};

	const handleBackPathClick = () => {
		dispatch(popDirStack());
	};

	const fileUploadHandler = (e: any) => {
		const files = [...e?.target.files];
		files.forEach((file: string | Blob) => {
			dispatch(uploadFile({ file, dirId }));
		});
	};

	const sortChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		dispatch(changeSortBy(e.target.value));
	};

	return (
		<nav className={s.nav}>
			<div className={s.nav__left}>
				<MainBtn
					disabled={!dirStack.length}
					handler={handleBackPathClick}
					className={s.btn__back}
				>
					<span className="material-icons-outlined">reply</span>
				</MainBtn>
				<MainBtn handler={handleFolderCreating} className={s.btn__create}>
					Create Folder
				</MainBtn>
				<form>
					<label htmlFor="upload" className={s.nav__upload}>
						Upload file
					</label>
					<input
						multiple={true}
						onChange={fileUploadHandler}
						type="file"
						id="upload"
						className={s.nav__upload_input}
					/>
				</form>
			</div>

			<div className={s.nav__right}>
				<select
					value={sortBy}
					className={s.select}
					onChange={sortChangeHandler}
				>
					<option value="name">Name</option>
					<option value="type">Type</option>
					<option value="date">Date</option>
				</select>
			</div>
		</nav>
	);
};

export default FileNavigation;
