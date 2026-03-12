import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { fetchFilms, fetchFilmById } from '@/shared/services/FilmService';
import type { FilmsQueryParams, FilmsResponse } from '@/shared/services/FilmService';

type UseFilmsOptions = Omit<UseQueryOptions<FilmsResponse, Error, FilmsResponse>, 'queryKey' | 'queryFn'>;

// Хук для получения списка фильмов
export const useFilms = (params: FilmsQueryParams, options?: UseFilmsOptions) => {
  return useQuery<FilmsResponse>({
    queryKey: ['films', params],
    queryFn: () => fetchFilms(params),
    placeholderData: (previousData) => previousData,
    ...options,
  });
};
// Хук для деталей фильма
export const useFilmDetails = (documentId?: string) => {
    return useQuery({
        queryKey: ['film', documentId],
        queryFn: () => fetchFilmById(documentId!),
        enabled: !!documentId,
    });
};

// Хук для рекомендаций
export const useRecommendations = (releaseYear?: number, currentFilmId?: string) => {
    return useQuery({
        queryKey: ['recommendations', releaseYear, currentFilmId],
        queryFn: () => fetchFilms({
            excludeId: currentFilmId,
            // Пример логики: +/- 2 года от выхода фильма
            yearRange: releaseYear ? { min: releaseYear - 2, max: releaseYear + 2 } : undefined,
            pageSize: 6, // Ограничиваем кол-во рекомендаций
        }),
        enabled: !!releaseYear, // Запрос идет только если известен год
    });
};