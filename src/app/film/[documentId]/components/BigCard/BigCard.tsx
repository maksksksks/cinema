import React from 'react';
import Text from "@/shared/components/Text"
import styles from "./BigCard.module.scss";
import StarIcon from '@/shared/components/icons/StarIcon';

export type CardProps = {
    /** Дополнительный classname */
    className?: string,
    /** URL изображения */
    image: string;
    year: number;
    genre: string;
    age: string;
    duration: string;
    rating: string;
    /** Заголовок карточки */
    title: React.ReactNode;
    /** Описание карточки */
    description: string;
    /** Содержимое карточки (футер/боковая часть), может быть пустым */
    contentSlot?: React.ReactNode;
    /** Клик на карточку */
    onClick?: React.MouseEventHandler;
    /** Слот для действия */
    actionSlot?: React.ReactNode;
};

const BigCard: React.FC<CardProps> = ({
    className = '',
    image,
    year,
    genre,
    age,
    duration,
    title,
    rating,
    description,
    contentSlot,
    actionSlot,
    onClick,
}) => {
    return (
        <div
            className={`${styles.bigCard} ${className}`}
            onClick={onClick}
        >
            <img
                src={image}
                alt={typeof title === 'string' ? title : 'card image'}
                className={styles.bigCardImage}
            />

            <div className={styles.bigCardBody}>
                <div className={styles.textFrame1}>
                    <Text
                        tag="h2"
                        view="p-32"
                        weight="bold"
                        color="primary"
                        maxLines={2}
                    >
                        {title}
                    </Text>

                    <div className={styles.rating}>
                        <Text
                            tag="p"
                            view="p-24"
                            weight="bold"
                            color="primary"
                            maxLines={1}
                        >
                            {rating}
                        </Text>
                        <StarIcon width={24} height={24} />
                    </div>
                </div>

                <div className={styles.textFrame2}>
                    <Text tag="h2" view="p-20" weight="bold" color="primary" maxLines={1}>
                        {year}
                    </Text>
                    <Text tag="h2" view="p-20" weight="bold" color="primary" maxLines={1}>
                        {"•"}
                    </Text>
                    <Text tag="h2" view="p-20" weight="bold" color="primary" maxLines={1}>
                        {genre}
                    </Text>
                    <Text tag="h2" view="p-20" weight="bold" color="primary" maxLines={1}>
                        {"•"}
                    </Text>
                    <Text tag="h2" view="p-20" weight="bold" color="primary" maxLines={1}>
                        {age + "+"}
                    </Text>
                    <Text tag="h2" view="p-20" weight="bold" color="primary" maxLines={1}>
                        {"•"}
                    </Text>
                    <Text tag="h2" view="p-20" weight="bold" color="primary" maxLines={1}>
                        {duration}
                    </Text>
                </div>

                <div className={styles.textFrame3}>
                    <Text
                        tag="p"
                        view="p-20"
                        weight="medium"
                        color="secondary"
                        maxLines={8}
                    >
                        {description}
                    </Text>
                </div>

                {(contentSlot || actionSlot) && (
                    <div className={styles.bigCardFooter}>
                        <Text
                            tag="h3"
                            view="p-20"
                            color="primary"
                            maxLines={1}
                        >
                            {contentSlot}
                        </Text>
                        {actionSlot}
                    </div>
                )}
            </div>
        </div>
    );
};


export default BigCard;
