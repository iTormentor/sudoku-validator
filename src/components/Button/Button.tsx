import styles from './Button.module.css';
import {ButtonHTMLAttributes, ReactNode} from "react";

type Props = {
    children: ReactNode;
    variant?: 'filled' | 'outlined';
} & ButtonHTMLAttributes<HTMLButtonElement>

Button.defaultProps = {
    variant: 'outlined'
};

export function Button(props: Props) {
    return (
        <button
            {...props}
            className={`${styles.button} ${props.variant === 'filled' ? styles.filled : styles.outlined}`}
        >
            <div className={styles.container}>
                {props.children}
            </div>
        </button>
    );
}
