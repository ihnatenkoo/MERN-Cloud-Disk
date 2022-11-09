import axios from 'axios';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import FormBtn from '../../ui/FormBtn/FormBtn';
import s from './LoginForm.module.scss';

const LoginForm: FC = () => {
	const [reqStatus, setReqStatus] = useState({ type: '', message: '' });
	const [data, setData] = useState({
		email: '',
		password: '',
	});

	const onLoginSubmit = async (
		e: FormEvent<HTMLFormElement>
	): Promise<void> => {
		e.preventDefault();
		try {
			const req = await axios.post(
				`${import.meta.env.VITE_URL}/api/auth/login`,
				{
					email: data.email,
					password: data.password,
				}
			);

			setReqStatus({ type: 'success', message: `Hello ${req.data.user.name}` });
			setData({ email: '', password: '' });
		} catch (e) {
			setReqStatus({
				type: 'error',
				//@ts-ignore
				message: e.response?.data.message,
			});
		}
	};

	const onChangeValue = (e: ChangeEvent<HTMLInputElement>): void => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	return (
		<form className={s.form} onSubmit={onLoginSubmit}>
			<input
				type="text"
				placeholder="Enter email"
				value={data.email}
				name="email"
				onChange={onChangeValue}
			/>
			<input
				type="text"
				placeholder="Enter password"
				value={data.password}
				name="password"
				onChange={onChangeValue}
			/>

			<FormBtn className={s.btn}>Log in</FormBtn>

			{reqStatus.type === 'success' && (
				<p className={s.success}>{reqStatus.message}</p>
			)}
			{reqStatus.type === 'error' && (
				<p className={s.error}>{reqStatus.message}</p>
			)}
		</form>
	);
};

export default LoginForm;
