import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { createFolder } from '../../store/files/files.slice';
import FormBtn from '../ui/MainBtn/MainBtn';
import s from './FileNavigation.module.scss';

interface IFileNavigation {
	setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const FileNavigation: FC<IFileNavigation> = ({ setShowPopup }) => {
	const dispatch = useAppDispatch();
	const currentDir = useAppSelector((state) => state.files.currentDir);

	const handleFolderCreating = () => {
		setShowPopup(true);
	};

	return (
		<nav className={s.nav}>
			<div className={s.nav__left}>
				<FormBtn className={s.btn__back}>
					<span className="material-icons-outlined">reply</span>
				</FormBtn>
				<FormBtn handler={handleFolderCreating} className={s.btn__create}>
					Create Folder
				</FormBtn>
			</div>
		</nav>
	);
};

export default FileNavigation;
