import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';

const App: FC = () => {
	return (
		<BrowserRouter>
			<Header />
			<main>
				<Routes>
					<Route path="/" element={<h1>Main</h1>} />
					<Route path="/register" element={<h1>Register</h1>} />
					<Route path="/login" element={<h1>Login</h1>} />
				</Routes>
			</main>
		</BrowserRouter>
	);
};

export default App;
