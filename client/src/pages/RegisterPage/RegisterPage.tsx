import RegisterForm from '../../components/forms/RegisterForm/RegisterForm';
import s from './RegisterPage.module.scss';

const RegisterPage = () => {
	return (
		<section className={s.reg}>
			<h2>Registration</h2>
			<RegisterForm />
		</section>
	);
};

export default RegisterPage;
