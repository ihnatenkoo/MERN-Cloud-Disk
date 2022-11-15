import { FC } from 'react';
import { useAppDispatch } from '../../hooks';
import { popDirStack } from '../../store/files/files.slice';
import MainBtn from '../ui/MainBtn/MainBtn';
import s from './FileNavigation.module.scss';

interface IFileNavigation {
	setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const FileNavigation: FC<IFileNavigation> = ({ setShowPopup }) => {
	const dispatch = useAppDispatch();

	const handleFolderCreating = () => {
		setShowPopup(true);
	};

	const handleBackPathClick = () => {
		dispatch(popDirStack());
	};

	return (
		<nav className={s.nav}>
			<div className={s.nav__left}>
				<MainBtn handler={handleBackPathClick} className={s.btn__back}>
					<span className="material-icons-outlined">reply</span>
				</MainBtn>
				<MainBtn handler={handleFolderCreating} className={s.btn__create}>
					Create Folder
				</MainBtn>
			</div>
		</nav>
	);
};

export default FileNavigation;
