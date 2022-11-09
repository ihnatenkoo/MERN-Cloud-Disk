import axios from 'axios';
import { ChangeEvent, FC, useState } from 'react';
import FormBtn from '../../ui/FormBtn/FormBtn';
import s from './RegisterForm.module.scss';

const RegisterForm: FC = () => {
	const [data, setData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const onRegisterDataSubmit = async (): Promise<void> => {
		try {
			const req = await axios.post(import.meta.env.VITE_URL, {
				name: data.name,
				email: data.email,
				password: data.password,
			});
		} catch (error) {
			console.log(error);
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
		</form>
	);
};

export default RegisterForm;
