import { IFile } from '../types';

export const downloadFile = async (file: IFile) => {
	const response = await fetch(
		`${import.meta.env.VITE_URL}/api/files/download?id=${file._id}`,
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		}
	);

	if (response.status === 200) {
		const blob = await response.blob();
		const downloadUrl = window.URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = downloadUrl;
		link.download = file.name;
		document.body.appendChild(link);
		link.click();
		link.remove();
	}
};
