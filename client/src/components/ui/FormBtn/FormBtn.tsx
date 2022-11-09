import { FC, PropsWithChildren } from 'react';
import s from './FormBtn.module.scss';
import cn from 'classnames';

interface IBtn extends PropsWithChildren {
	className?: string;
}

const FormBtn: FC<IBtn> = ({ children, className }) => {
	return <button className={cn(s.btn, className)}>{children}</button>;
};

export default FormBtn;
