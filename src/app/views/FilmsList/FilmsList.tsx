'use client';

import { useFilms } from '@/shared/hooks/useFilms';
import Card from "@/shared/components/Card";
import { FavoriteButton } from "@/app/views/FavoriteButton/FavoriteButton";
import styles from "../../page.module.scss";
import { FilmsQueryParams, getStrapiMediaUrl } from '@/shared/services/FilmService';
import Link from "next/link";
import cover1 from "@/shared/assets/Rectangle 50.png";
import Pagination from "./../Pagination/Pagination";
import Text from "@/shared/components/Text";
import Button from '@/shared/components/Button';

interface Props {
    queryParams: FilmsQueryParams;
}

export default function FilmsList({ queryParams }: Props) {
    const { data, isLoading } = useFilms(queryParams);

    const films = data?.data || [];
    const total = data?.meta.pagination.total || 0;
    const pageCount = data?.meta.pagination.pageCount || 1;

    if (isLoading) return <div className={styles.cards}>Загрузка...</div>;

    return (
        <>
            <div className={styles.filmsTitle}>
                <Text color="primary" view="p-32" weight="bold" tag="h1">
                    Все фильмы
                </Text>
                <Text color="red" view="p-20-mono" weight="bold" className={styles.counter}>
                    {total}
                </Text>
            </div>
            <div className={styles.recommendations}>
                <div className={styles.cards}>
                    {films.map((film) => {
                        const imageUrl = getStrapiMediaUrl(film.poster?.url) || cover1.src;

                        return (
                            <Card
                                key={film.id}
                                image={imageUrl}
                                rating={<>{film.rating}</>}
                                label={`${film.duration} мин`}
                                meta={`${film.releaseYear} • ${film.ageLimit}+`}
                                title={film.title}
                                subtitle={film.shortDescription}
                                secondaryAction={<FavoriteButton documentId={film.documentId} />}
                                primaryAction={
                                    <Link href={`/film/${film.documentId}`}>
                                        <Button>Смотреть</Button>
                                    </Link>
                                }
                            />
                        );
                    })}
                </div>
            </div>

            <div className={styles.footer}>
                <Pagination currentPage={queryParams.page || 1} pageCount={pageCount} />
            </div>
        </>
    );
}