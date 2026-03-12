import React from 'react';
import cn from 'classnames';
import styles from './Loader.module.scss';

export type LoaderProps = {
    size?: 's' | 'm' | 'l';
    accent?: boolean;
    className?: string;
};


const Loader: React.FC<LoaderProps> = ({
    size = 'l',
    accent = false,
    className,
}) => {
    return (
        <div
            data-testid="loader"
            className={cn(
                styles.loader,
                styles[`loader--${size}`],
                {
                    [styles['loader--accent']]: accent,
                },
                className
            )}
        />
    );
};

export default Loader;
