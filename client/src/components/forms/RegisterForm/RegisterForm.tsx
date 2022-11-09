import { FC } from 'react';
import FormBtn from '../../ui/FormBtn/FormBtn';
import s from './RegisterForm.module.scss';

const RegisterForm: FC = () => {
	return (
		<form className={s.form}>
			<input type="text" placeholder="Enter name" />
			<input type="text" placeholder="Enter email" />
			<input type="text" placeholder="Enter password" />

			<FormBtn className={s.btn}>Register</FormBtn>
		</form>
	);
};

export default RegisterForm;
