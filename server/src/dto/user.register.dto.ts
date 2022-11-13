import { IsEmail, IsString, Length } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Wrong email' })
	email: string;

	@IsString({ message: 'Enter password' })
	@Length(3, 12, { message: 'Min 3 symbols, max 12 symbols' })
	password: string;

	@IsString({ message: 'Enter name' })
	@Length(3, 12, { message: 'Min 3 symbols, max 12 symbols' })
	name: string;
}
