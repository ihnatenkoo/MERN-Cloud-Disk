import axios from 'axios';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useAppDispatch } from '../../../hooks';
import { loginUser } from '../../../store/user/user.slice';
import FormBtn from '../../ui/FormBtn/FormBtn';
import s from './LoginForm.module.scss';

const LoginForm: FC = () => {
	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	});

	const dispatch = useAppDispatch();

	const onLoginSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		dispatch(loginUser(loginData));
	};

	const onChangeValue = (e: ChangeEvent<HTMLInputElement>): void => {
		setLoginData({ ...loginData, [e.target.name]: e.target.value });
	};

	return (
		<form className={s.form} onSubmit={onLoginSubmit}>
			<input
				type="text"
				placeholder="Enter email"
				value={loginData.email}
				name="email"
				onChange={onChangeValue}
			/>
			<input
				type="text"
				placeholder="Enter password"
				value={loginData.password}
				name="password"
				onChange={onChangeValue}
			/>

			<FormBtn className={s.btn}>Log in</FormBtn>
		</form>
	);
};

export default LoginForm;
