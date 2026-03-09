import React from 'react';
import Text from '../Text/Text';
import styles from './Card.module.scss';
import StarIcon from '../icons/StarIcon';

export type CardProps = {
    image: string;
    rating?: React.ReactNode;        // левый badge (рейтинг)
    label?: React.ReactNode;         // правый badge
    meta?: React.ReactNode;          // строка типа "Wood • Modern • 2024"
    title: React.ReactNode;
    subtitle: React.ReactNode;
    secondaryAction?: React.ReactNode;
    primaryAction?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
    image,
    rating,
    label,
    meta,
    title,
    subtitle,
    secondaryAction,
    primaryAction,
}) => {
    return (
        <div className={styles.card}>

            <div className={styles.header}>
                <img src={image} alt="" className={styles.image} />

                {rating && (
                    <div className={`${styles.badge} ${styles.left}`}>
                        <Text view="p-18" weight="bold" color="primary">
                            {rating}
                        </Text>
                        <StarIcon width={20} height={20}></StarIcon>
                    </div>
                )}

                {label && (
                    <div className={`${styles.badge} ${styles.right}`}>
                        <Text view="p-18" weight="bold" color="primary">
                            {label}
                        </Text>
                    </div>
                )}
            </div>

            <div className={styles.body}>
                <div className={styles.content}>
                    <div className={styles.meta}>
                        {meta && (
                            <Text view="p-16" weight="medium" color="primary">
                                {meta}
                            </Text>
                        )}
                    </div>

                    <Text view="p-20" weight="medium" color="primary">
                        {title}
                    </Text>

                    <Text view="p-16" color="secondary" maxLines={2}>
                        {subtitle}
                    </Text>
                </div>

                <div className={styles.actions}>
                    {secondaryAction}
                    {primaryAction}
                </div>
            </div>
        </div>
    );
};

export default Card;