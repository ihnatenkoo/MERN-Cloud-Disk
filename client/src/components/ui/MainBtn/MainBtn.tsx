import { FC, PropsWithChildren } from 'react';
import s from './MainBtn.module.scss';
import cn from 'classnames';

interface IBtn extends PropsWithChildren {
	className?: string;
	disabled?: boolean;
	handler?: (() => void) | undefined;
}

const MainBtn: FC<IBtn> = ({
	children,
	className,
	handler,
	disabled = false,
}) => {
	return (
		<button
			onClick={handler}
			className={cn(s.btn, className, { [s.disabled]: disabled })}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default MainBtn;
