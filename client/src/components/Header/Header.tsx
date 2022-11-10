import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logout } from '../../store/user/user.slice';
import s from './Header.module.scss';

const Header: FC = () => {
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector((state) => state.user.isAuth);

	const onLogoutHandler = () => {
		dispatch(logout());
	};

	return (
		<header className={s.header}>
			<Link to="/" className={s.header__intro}>
				<span className="material-icons-outlined">cloud_done</span>
				<h2 className={s.header__title}>Cloud Disk</h2>
			</Link>

			<nav className={s.header__nav}>
				{isAuth ? (
					<a onClick={onLogoutHandler} className={s.logout}>
						Logout
					</a>
				) : (
					<>
						<Link to="/login">Login</Link>
						<Link to="/register">Register</Link>
					</>
				)}
			</nav>
		</header>
	);
};

export default Header;
