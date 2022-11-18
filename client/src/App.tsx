import { FC, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import { useAppDispatch, useAppSelector } from './hooks';
import LoginPage from './pages/LoginPage/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import { authUser } from './store/user/user.slice';

const App: FC = () => {
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector((state) => state.user.isAuth);

	useEffect(() => {
		dispatch(authUser());
	}, []);

	return (
		<BrowserRouter>
			<Header />
			<main>
				<Routes>
					{isAuth ? (
						<>
							<Route path="/" element={<MainPage />} />
							<Route path="*" element={<Navigate to="/" replace />} />
						</>
					) : (
						<>
							<Route path="/login" element={<LoginPage />} />
							<Route path="/register" element={<RegisterPage />} />
							<Route path="*" element={<Navigate to="/login" replace />} />
						</>
					)}
				</Routes>
			</main>
		</BrowserRouter>
	);
};

export default App;
