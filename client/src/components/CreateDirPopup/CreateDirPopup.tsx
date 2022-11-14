import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import MainBtn from '../ui/MainBtn/MainBtn';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { createFolder } from '../../store/files/files.slice';
import s from './CreateDirPopup.module.scss';
import cn from 'classnames';

interface ICreateDirPopup {
	showPopup: boolean;
	setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateDirPopup: FC<ICreateDirPopup> = ({ showPopup, setShowPopup }) => {
	const [dirName, setDirName] = useState<string>('');
	const dispatch = useAppDispatch();
	const currentDir = useAppSelector((state) => state.files.currentDir);

	const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
		setDirName(e.target.value);
	};

	const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') onCreateDir();
	};

	const onCreateDir = () => {
		dispatch(createFolder({ name: dirName, dirId: currentDir }));
		setDirName('');
		setShowPopup(false);
	};

	const onClosePopup = () => {
		setDirName('');
		setShowPopup(false);
	};

	return (
		<div
			onClick={onClosePopup}
			className={cn(s.popup, { [s.show]: showPopup })}
		>
			<div onClick={(e) => e.stopPropagation()} className={s.inner}>
				<h3>Create new folder</h3>
				<input
					type="text"
					placeholder="Enter folder name"
					value={dirName}
					onChange={onValueChange}
					onKeyDown={onKeyDown}
				/>
				<div className={s.inner__nav}>
					<button onClick={onClosePopup} className={s.inner__nav_cancel}>
						Cancel
					</button>
					<MainBtn handler={onCreateDir} className={s.inner__nav_create}>
						Create
					</MainBtn>
				</div>
			</div>
		</div>
	);
};

export default CreateDirPopup;
