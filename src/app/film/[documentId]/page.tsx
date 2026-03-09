'use client';

import Text from "@/shared/components/Text";
import cover1 from "@/shared/assets/Rectangle 23.png" // Дефолтная картинка
import styles from "./page.module.scss";
import Button from "@/shared/components/Button";
import BigCard from "./components/BigCard";
import ArrowRightIcon from "@/shared/components/icons/ArrowRightIcon";
import Card from "@/shared/components/Card";
import { useState } from "react";
import { useFilmDetails, useRecommendations } from "@/shared/hooks/useFilms"; // Наши новые хуки
import { useFavorites } from "@/shared/hooks/useFavorites"; // Хук избранного
import { STRAPI_URL } from "@/shared/services/FilmService"; // Импорт URL
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { Film } from "@/shared/types/film";

const CinemaPageDetails = () => {
    const params = useParams();
    const documentId = params?.documentId as string;
    
    // Состояние для карусели (локальное UI состояние)
    const [currentIndex, setCurrentIndex] = useState(0);
    const ITEMS_PER_PAGE = 3;

    // 1. Запрос деталей фильма
    const { 
        data: film, 
        isLoading: isFilmLoading, 
        isError: isFilmError 
    } = useFilmDetails(documentId);

    // 2. Запрос рекомендаций (зависит от года выхода фильма)
    const { 
        data: recData, 
        isLoading: isRecLoading 
    } = useRecommendations(film?.releaseYear, film?.documentId);

    const { toggleFavorite, isFavorite } = useFavorites();

    
    if (isFilmLoading) {
        return (
            <>
                <div className={styles.content}>
                    {/* Скелетон кнопки "Назад" */}
                    <div className={styles.skeletonBack} />

                    {/* Скелетон BigCard */}
                    <div className={styles.skeletonBigCard}>
                        <div className={styles.skeletonBigImage} />
                        
                        <div className={styles.skeletonBigCardBody}>
                            {/* textFrame1: Заголовок и Рейтинг */}
                            <div className={styles.skeletonTextFrame1}>
                                <div className={styles.skeletonTitle} />
                                <div className={styles.skeletonRating} />
                            </div>

                            {/* textFrame2: Год, жанр и т.д. */}
                            <div className={styles.skeletonTextFrame2} />

                            {/* textFrame3: Описание */}
                            <div className={styles.skeletonTextFrame3}>
                                <div className={styles.skeletonTextLine} />
                                <div className={styles.skeletonTextLine} />
                                <div className={styles.skeletonTextLine} />
                                <div className={styles.skeletonTextLineShort} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    if (isFilmError || !film) {
        return (
            notFound()
        );
    }

    const imageUrl = film.poster?.url
        ? `${STRAPI_URL}${film.poster.url}`
        : cover1.src;
    
    
    const recommendations = recData?.data || [];

    // --- Обработчики карусели ---

    const handlePrev = () => setCurrentIndex(prev => Math.max(0, prev - ITEMS_PER_PAGE));
    const handleNext = () => setCurrentIndex(prev => prev + ITEMS_PER_PAGE);
    const isPrevDisabled = currentIndex === 0;
    const isNextDisabled = currentIndex + ITEMS_PER_PAGE >= recommendations.length;

    return (
        <>
            <div className={styles.content}>
                <Link href={`/films`}>
                    <div className={styles.back}>
                        <ArrowRightIcon width={32} height={32} />
                        <Text color="primary" view="p-20" tag="div">
                            Назад
                        </Text>
                    </div>
                </Link>

                <BigCard
                    image={imageUrl}
                    title={film.title}
                    description={film.description}
                    year={film.releaseYear}
                    genre={film.category?.name || "Неизвестно"}
                    age={film.ageLimit.toString()}
                    duration={`${film.duration} мин`}
                    rating={film.rating.toString()}
                />

                <div className={styles.recommendations}>
                    <Text color="primary" view="p-32" weight="bold" tag="h1">
                        Рекомендации
                    </Text>

                    {isRecLoading ? (
                        <div className={styles.skeletonRecs}>Загрузка рекомендаций...</div>
                    ) : recommendations.length === 0 ? (
                        <Text color="secondary" view="p-20">
                            Рекомендаций в диапазоне ±2 года пока нет
                        </Text>
                    ) : (
                        <div className={styles.carouselContainer}>
                            <button
                                className={styles.carouselArrowLeft}
                                onClick={handlePrev}
                                disabled={isPrevDisabled}
                                aria-label="Предыдущие рекомендации"
                            >
                                ←
                            </button>

                            <div className={styles.cards}>
                                {recommendations
                                    .slice(currentIndex, currentIndex + ITEMS_PER_PAGE)
                                    .map((rec: Film) => {
                                        const recImage = rec.poster?.url
                                            ? `${STRAPI_URL}${rec.poster.url}`
                                            : cover1.src;

                                        return (
                                            <Card
                                                key={rec.id}
                                                image={recImage}
                                                rating={<>{rec.rating || "—"}</>}
                                                label={`${rec.duration || "?"} мин`}
                                                meta={`${rec.releaseYear || "?"} • ${rec.category?.name || "—"} • ${rec.ageLimit || "?"}+`}
                                                title={rec.title || "Без названия"}
                                                subtitle={rec.shortDescription || ""}
                                                secondaryAction={
                                                    <Button 
                                                        variant="outlined" 
                                                        textColor={isFavorite(rec.documentId) ? "red" : "primary"} 
                                                        onClick={() => toggleFavorite(rec.documentId)}
                                                    >
                                                        {isFavorite(rec.documentId) ? "В избранном" : "В избранное"}
                                                    </Button>
                                                }
                                                primaryAction={
                                                    <Link href={`/film/${rec.documentId}`}>
                                                        <Button variant="filled">
                                                            Смотреть
                                                        </Button>
                                                    </Link>
                                                }
                                            />
                                        );
                                    })}
                            </div>

                            <button
                                className={styles.carouselArrowRight}
                                onClick={handleNext}
                                disabled={isNextDisabled}
                                aria-label="Следующие рекомендации"
                            >
                                →
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default CinemaPageDetails;