// app/page.tsx
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/shared/lib/getQueryClient';
import { fetchFilms } from '@/shared/services/FilmService';
import Text from "@/shared/components/Text";
import styles from "./page.module.scss";
import Filters from "./views/Filters/Filters";
import FilmsList from "./views/FilmsList/FilmsList";

interface HomePageProps {
  searchParams: {
    page?: string;
    search?: string;
    genres?: string;
  };
}

export default async function CinemaPage({ searchParams }: HomePageProps) {
  const queryClient = getQueryClient();

  // 1. Подготовка параметров
  const currentPage = Number(searchParams.page) || 1;
  const searchQuery = searchParams.search || '';
  const genres = searchParams.genres?.split(',').filter(Boolean) || [];

  const queryParams = {
    page: currentPage,
    search: searchQuery,
    genres: genres,
  };

  // 2. ПРЕФЕТЧИНГ: Загружаем данные на сервере
  await queryClient.prefetchQuery({
    queryKey: ['films', queryParams],
    queryFn: () => fetchFilms(queryParams),
  });

  // 3. Подготовка состояния для клиента
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className={styles.content}>
        <div className={styles.texts}>
          <Text tag="p" className={styles.title}>Cinema</Text>
          <Text tag="p" className={styles.subtitle}>
            Подборка для вечера уже здесь: фильмы, сериалы и новинки.
            <br />
            Найди что посмотреть — за пару секунд.
          </Text>
        </div>

        <Filters initialSearch={searchQuery} initialGenres={genres} />

        <FilmsList queryParams={queryParams} />
      </div>
    </HydrationBoundary>
  );
}