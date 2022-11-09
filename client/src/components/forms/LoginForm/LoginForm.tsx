import { FC } from 'react';
import FormBtn from '../../ui/FormBtn/FormBtn';
import s from './LoginForm.module.scss';

const LoginForm: FC = () => {
	return (
		<form className={s.form}>
			<input type="text" placeholder="Enter email" />
			<input type="text" placeholder="Enter password" />

			<FormBtn className={s.btn}>Log in</FormBtn>
		</form>
	);
};

export default LoginForm;
