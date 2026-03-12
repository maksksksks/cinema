import React from 'react';
import Image from 'next/image';
import Text from '../Text/Text';
import styles from './Card.module.scss';
import StarIcon from '../icons/StarIcon';

export type CardProps = {
    image: string;
    rating?: React.ReactNode;
    label?: React.ReactNode;
    meta?: React.ReactNode;
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
                <div className={styles.imageWrapper}>
                    <Image
                        src={image}
                        alt={typeof title === 'string' ? title : 'Film poster'}
                        fill
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority={false}
                    />
                </div>

                {rating && (
                    <div className={`${styles.badge} ${styles.left}`}>
                        <Text view="p-18" weight="bold" color="primary">
                            {rating}
                        </Text>
                        <StarIcon width={20} height={20} />
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