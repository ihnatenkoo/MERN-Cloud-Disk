import { FC, useState } from 'react';
import CreateDirPopup from '../../components/CreateDirPopup/CreateDirPopup';
import FileList from '../../components/FileList/FileList';
import FileNavigation from '../../components/FileNavigation/FileNavigation';

const MainPage: FC = () => {
	const [showPopup, setShowPopup] = useState<boolean>(false);

	return (
		<section>
			<FileNavigation setShowPopup={setShowPopup} />
			<FileList />
			<CreateDirPopup showPopup={showPopup} setShowPopup={setShowPopup} />
		</section>
	);
};

export default MainPage;
