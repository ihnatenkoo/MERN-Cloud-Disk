import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import { useAppSelector } from './hooks';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

const App: FC = () => {
	const isAuth = useAppSelector((state) => state.user.isAuth);

	return (
		<BrowserRouter>
			<Header />
			<main>
				<Routes>
					<Route path="/" element={<h1>Main</h1>} />
					{!isAuth && (
						<>
							<Route path="/login" element={<LoginPage />} />
							<Route path="/register" element={<RegisterPage />} />
						</>
					)}
				</Routes>
			</main>
		</BrowserRouter>
	);
};

export default App;
