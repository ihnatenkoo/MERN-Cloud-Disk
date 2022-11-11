import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

const MainPage: FC = () => {
	const navigate = useNavigate();
	const isAuth = useAppSelector((state) => state.user.isAuth);

	useEffect(() => {
		if (!isAuth) {
			return navigate('/login');
		}
	}, [isAuth]);

	return <div>MainPage</div>;
};

export default MainPage;
