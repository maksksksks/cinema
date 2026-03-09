'use client';

import React from 'react';
import classNames from 'classnames';
import Loader from '../Loader/Loader';
import Text from '../Text/Text';
import styles from './Button.module.scss';

export type ButtonVariant = 'filled' | 'outlined' | 'underline';
export type ButtonTextColor = 'primary' | 'secondary' | 'accent' | 'white' | 'red';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
    variant?: ButtonVariant;
    textColor?: ButtonTextColor;
    children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
    loading = false,
    variant = 'filled',
    textColor = 'white',
    children,
    className,
    disabled,
    onClick,
    ...props
}) => {
    const isDisabled = !!disabled || loading;

    const classes = classNames(
        styles.button,
        styles[variant],
        styles[`text-${textColor}`],
        {
            [styles.loading]: loading,
            [styles.disabled]: !!disabled,
        },
        className
    );

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        if (isDisabled) return;
        onClick?.(e);
    };

    return (
        <button
            className={classes}
            disabled={isDisabled}
            onClick={handleClick}
            {...props}
        >
            {loading && <Loader size="s" accent />}

            <Text
                tag="span"
                view="button"
                weight="normal"
                // maxLines={1}
            >
                {children}
            </Text>
        </button>
    );
};

export default Button;