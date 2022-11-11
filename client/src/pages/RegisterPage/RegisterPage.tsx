import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../../components/forms/RegisterForm/RegisterForm';
import { useAppSelector } from '../../hooks';
import s from './RegisterPage.module.scss';

const RegisterPage = () => {
	const navigate = useNavigate();
	const isAuth = useAppSelector((state) => state.user.isAuth);

	useEffect(() => {
		if (isAuth) {
			return navigate('/');
		}
	}, [isAuth]);

	return (
		<section className={s.reg}>
			<h2>Registration</h2>
			<RegisterForm />
		</section>
	);
};

export default RegisterPage;
