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
