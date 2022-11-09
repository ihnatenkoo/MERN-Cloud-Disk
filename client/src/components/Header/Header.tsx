import { FC } from 'react';
import { Link } from 'react-router-dom';
import s from './Header.module.scss';

const Header: FC = () => {
	return (
		<header className={s.header}>
			<Link to="/" className={s.header__intro}>
				<span className="material-icons-outlined">cloud_done</span>
				<h2 className={s.header__title}>Cloud Disk</h2>
			</Link>

			<nav className={s.header__nav}>
				<Link to="/login">Login</Link>
				<Link to="/register">Register</Link>
			</nav>
		</header>
	);
};

export default Header;
