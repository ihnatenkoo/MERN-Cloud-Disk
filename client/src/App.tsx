import { FC, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import { useAppDispatch, useAppSelector } from './hooks';
import LoginPage from './pages/LoginPage/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import { authUser } from './store/user/user.slice';

const App: FC = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(authUser());
	}, []);

	return (
		<BrowserRouter>
			<Header />
			<main>
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
				</Routes>
			</main>
		</BrowserRouter>
	);
};

export default App;
