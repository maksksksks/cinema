// app/film/[documentId]/page.tsx

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/shared/lib/getQueryClient';
import { fetchFilmById, fetchFilms, getStrapiMediaUrl } from '@/shared/services/FilmService'; // Импортируем утилиту
import { notFound } from 'next/navigation';
import Text from "@/shared/components/Text";
import styles from "./page.module.scss";
import Link from "next/link";
import ArrowRightIcon from "@/shared/components/icons/ArrowRightIcon";
import BigCard from "./components/BigCard";
import { FavoriteButton } from "@/app/views/FavoriteButton/FavoriteButton";
import RecommendationsCarousel from "@/app/views/RecomendationsCarousel/RecomendationsCarousel";
import cover1 from "@/shared/assets/Rectangle 23.png";
import { Film } from '@/shared/types/film';

interface Props {
    params: Promise<{ documentId: string }>;
}

export default async function CinemaPageDetails({ params }: Props) {
    const queryClient = getQueryClient();
    const { documentId } = await params;

    let film: Film;

    try {
        film = await queryClient.fetchQuery({
            queryKey: ['film', documentId],
            queryFn: () => fetchFilmById(documentId),
        });
    } catch (error) {
        notFound();
    }

    if (film.releaseYear) {
        await queryClient.prefetchQuery({
            queryKey: ['recommendations', film.releaseYear, documentId],
            queryFn: () => fetchFilms({
                excludeId: documentId,
                yearRange: { min: film.releaseYear - 2, max: film.releaseYear + 2 },
                pageSize: 6,
            }),
        });
    }

    const dehydratedState = dehydrate(queryClient);

    // ИСПОЛЬЗУЕМ УТИЛИТУ getStrapiMediaUrl
    const imageUrl = getStrapiMediaUrl(film.poster?.url) || cover1.src;

    return (
        <HydrationBoundary state={dehydratedState}>
            <div className={styles.content}>
                <Link href={`/`}>
                    <div className={styles.back}>
                        <ArrowRightIcon width={32} height={32} />
                        <Text color="primary" view="p-20" tag="div">Назад</Text>
                    </div>
                </Link>

                <BigCard
                    image={imageUrl} // Правильный URL
                    title={film.title}
                    description={film.description}
                    year={film.releaseYear}
                    genre={film.category?.name || "Неизвестно"}
                    age={film.ageLimit.toString()}
                    duration={`${film.duration} мин`}
                    rating={film.rating.toString()}
                    actionSlot={<FavoriteButton documentId={film.documentId} />} // Используем actionSlot
                />

                <div className={styles.recommendations}>
                    <Text color="primary" view="p-32" weight="bold" tag="h1">
                        Рекомендации
                    </Text>
                    
                    <RecommendationsCarousel releaseYear={film.releaseYear} currentFilmId={documentId} />
                </div>
            </div>
        </HydrationBoundary>
    );
}