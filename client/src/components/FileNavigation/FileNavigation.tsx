import { FC } from 'react';
import FormBtn from '../ui/MainBtn/MainBtn';
import s from './FileNavigation.module.scss';

const FileNavigation: FC = () => {
	return (
		<nav className={s.nav}>
			<div className={s.nav__left}>
				<FormBtn className={s.btn__back}>
					<span className="material-icons-outlined">reply</span>
				</FormBtn>
				<FormBtn className={s.btn__create}>Create Folder</FormBtn>
			</div>
		</nav>
	);
};

export default FileNavigation;
