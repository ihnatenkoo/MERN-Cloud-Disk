import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/forms/LoginForm/LoginForm';
import { useAppSelector } from '../../hooks';
import s from './LoginPage.module.scss';

const LoginPage: FC = () => {
	const navigate = useNavigate();
	const isAuth = useAppSelector((state) => state.user.isAuth);

	useEffect(() => {
		if (isAuth) {
			return navigate('/');
		}
	}, [isAuth]);

	return (
		<section className={s.login}>
			<h2>Login</h2>
			<LoginForm />
		</section>
	);
};

export default LoginPage;
