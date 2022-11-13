import { FC } from 'react';
import LoginForm from '../../components/forms/LoginForm/LoginForm';
import s from './LoginPage.module.scss';

const LoginPage: FC = () => {
	return (
		<section className={s.login}>
			<h2>Login</h2>
			<LoginForm />
		</section>
	);
};

export default LoginPage;
