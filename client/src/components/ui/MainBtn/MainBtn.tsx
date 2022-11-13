import { FC, PropsWithChildren } from 'react';
import s from './MainBtn.module.scss';
import cn from 'classnames';

interface IBtn extends PropsWithChildren {
	className?: string;
	handler?: (() => void) | undefined;
}

const MainBtn: FC<IBtn> = ({ children, className, handler }) => {
	return (
		<button onClick={handler} className={cn(s.btn, className)}>
			{children}
		</button>
	);
};

export default MainBtn;
