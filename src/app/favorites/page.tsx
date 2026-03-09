"use client";

import Text from "@/shared/components/Text";
import styles from "./page.module.scss";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import { useFavorites } from "@/shared/hooks/useFavorites";
import { useFilms } from "@/shared/hooks/useFilms";
import { STRAPI_URL } from "@/shared/services/FilmService";
import cover1 from "@/shared/assets/Rectangle 25.png";
import Link from "next/link";
import { Film } from "@/shared/types/film"

const FavoritesPage = () => {
    const { favorites, toggleFavorite } = useFavorites();

    const { data, isLoading, isError } = useFilms(
        {
            ids: favorites,
            pageSize: 100,
        },
        {
            enabled: favorites.length > 0,
        }
    );

    const films = data?.data || [];

    const displayedFilms = films.filter((film: Film) =>
        favorites.includes(film.documentId)
    );

    const renderContent = () => {
        if (favorites.length === 0) {
            return (
                <div className={styles.emptyState}>
                    <Text tag="p" view="p-20" color="secondary">
                        Вы еще не добавили ни одного фильма в избранное.
                    </Text>

                    <Link href="/films">
                        <Button variant="filled">Смотреть фильмы</Button>
                    </Link>
                </div>
            );
        }

        if (isLoading) {
            return <div className={styles.loading}>Загрузка избранного...</div>;
        }

        if (isError) {
            return <div className={styles.error}>Ошибка при загрузке данных.</div>;
        }

        return (
            <div className={styles.cards}>
                {displayedFilms.map((film: Film) => {
                    const imageUrl = film.poster?.url
                        ? `${STRAPI_URL}${film.poster.url}`
                        : cover1.src;

                    return (
                        <Card
                            key={film.id}
                            image={imageUrl}
                            rating={<>{film.rating}</>}
                            label={`${film.duration} мин`}
                            meta={`${film.releaseYear} • ${film.ageLimit}+`}
                            title={film.title}
                            subtitle={film.shortDescription}
                            secondaryAction={
                                <Button
                                    variant="outlined"
                                    textColor="red"
                                    onClick={() => toggleFavorite(film.documentId)}
                                >
                                    Удалить
                                </Button>
                            }
                            primaryAction={
                                <Link href={`/film/${film.documentId}`}>
                                    <Button variant="filled">
                                        Смотреть
                                    </Button>
                                </Link>
                            }
                        />
                    );
                })}
            </div>
        );
    };

    return (
        <div className={styles.content}>
            <div className={styles.header}>
                <Text tag="h1" view="p-32" weight="bold" color="primary">
                    Избранное
                </Text>

                <Text tag="span" view="p-20-mono" color="red" weight="bold">
                    {favorites.length}
                </Text>
            </div>

            {renderContent()}
        </div>
    );
};

export default FavoritesPage;