export interface IUser {
	diskSpace: number;
	email: string;
	id: string;
	name: string;
	usedSpace: number;
}

export interface ILoginData {
	email: string;
	password: string;
}

export interface IFile {
	_id: string;
	name: string;
	type: string;
	size: number;
	path: string;
	user: string;
	date: string;
	children: Array<string>;
}
