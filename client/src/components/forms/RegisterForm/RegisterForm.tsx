import axios from 'axios';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormBtn from '../../ui/FormBtn/FormBtn';
import s from './RegisterForm.module.scss';

const RegisterForm: FC = () => {
	const navigate = useNavigate();
	const [reqStatus, setReqStatus] = useState({ type: '', message: '' });
	const [data, setData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const onRegisterDataSubmit = async (
		e: FormEvent<HTMLFormElement>
	): Promise<void> => {
		e.preventDefault();
		try {
			const req = await axios.post(
				`${import.meta.env.VITE_URL}/api/auth/register`,
				{
					name: data.name,
					email: data.email,
					password: data.password,
				}
			);
			navigate('/login');
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
		<form className={s.form} onSubmit={onRegisterDataSubmit}>
			<input
				type="text"
				value={data.name}
				name="name"
				placeholder="Enter name"
				onChange={onChangeValue}
			/>
			<input
				type="text"
				value={data.email}
				name="email"
				placeholder="Enter email"
				onChange={onChangeValue}
			/>
			<input
				type="password"
				value={data.password}
				name="password"
				placeholder="Enter password"
				onChange={onChangeValue}
			/>

			<FormBtn className={s.btn}>Register</FormBtn>

			{reqStatus.type === 'success' && (
				<p className={s.success}>{reqStatus.message}</p>
			)}
			{reqStatus.type === 'error' && (
				<p className={s.error}>{reqStatus.message}</p>
			)}
		</form>
	);
};

export default RegisterForm;
