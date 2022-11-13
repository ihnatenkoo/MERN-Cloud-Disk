import { FC } from 'react';
import FileList from '../../components/FileList/FileList';
import FileNavigation from '../../components/FileNavigation/FileNavigation';

const MainPage: FC = () => {
	return (
		<section>
			<FileNavigation />
			<FileList />
		</section>
	);
};

export default MainPage;
