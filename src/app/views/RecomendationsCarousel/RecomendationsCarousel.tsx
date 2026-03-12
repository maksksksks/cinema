'use client';

import { useRecommendations } from '@/shared/hooks/useFilms';
import Card from "@/shared/components/Card";
import { FavoriteButton } from "@/app/views/FavoriteButton/FavoriteButton";
import styles from "../../film/[documentId]/page.module.scss";
import Link from "next/link";
import { useState } from "react";
import cover1 from "@/shared/assets/Rectangle 25.png";
import Button from '@/shared/components/Button';
import { getStrapiMediaUrl } from '@/shared/services/FilmService';

interface Props {
    releaseYear?: number;
    currentFilmId: string;
}

export default function RecommendationsCarousel({ releaseYear, currentFilmId }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const ITEMS_PER_PAGE = 3;

    const { data, isLoading } = useRecommendations(releaseYear, currentFilmId);
    const recommendations = data?.data || [];

    if (isLoading) return <div>Загрузка...</div>;
    if (recommendations.length === 0) return <div>Нет рекомендаций</div>;

    const handlePrev = () => setCurrentIndex(prev => Math.max(0, prev - ITEMS_PER_PAGE));
    const handleNext = () => setCurrentIndex(prev => prev + ITEMS_PER_PAGE);

    return (
        <div className={styles.carouselContainer}>
            <button
                className={styles.carouselArrowLeft}
                onClick={handlePrev}
                disabled={currentIndex === 0}
                aria-label="Предыдущие рекомендации"
            >
                ←
            </button>
            
            <div className={styles.cards}>
                {recommendations.slice(currentIndex, currentIndex + ITEMS_PER_PAGE).map(rec => {
                
                const recImage = getStrapiMediaUrl(rec.poster?.url) || cover1.src;

                return (
                    <Card
                        key={rec.id}
                        image={recImage}
                        rating={<>{rec.rating}</>}
                        label={`${rec.duration} мин`}
                        meta={`${rec.releaseYear} • ${rec.ageLimit}+`}
                        title={rec.title}
                        subtitle={rec.shortDescription}
                        secondaryAction={<FavoriteButton documentId={rec.documentId} />}
                        primaryAction={
                            <Link href={`/film/${rec.documentId}`}>
                                <Button>Смотреть</Button>
                            </Link>
                        }
                    />
                )})}
            </div>

            <button
                className={styles.carouselArrowRight}
                onClick={handleNext}
                disabled={currentIndex + ITEMS_PER_PAGE >= recommendations.length}
                aria-label="Следующие рекомендации"
            >
                →
            </button>
        </div>
    );
}