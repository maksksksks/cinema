import axios from "axios";
import qs from "qs";

// --- Константы ---
const STRAPI_BASE_URL = 'https://front-school-strapi.ktsdev.ru';
export const STRAPI_URL = `${STRAPI_BASE_URL}/api`;

// --- Типы ---
export interface Film {
  id: number;
  documentId: string;
  title: string;
  rating: number;
  duration: number;
  releaseYear: number;
  ageLimit: number;
  shortDescription: string;
  description: string;
  poster?: { url: string };
  category?: { name: string; slug: string };
}

export interface FilmsResponse {
    data: Film[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

export interface SingleFilmResponse {
    data: Film;
    meta: object;
}

export interface FilmsQueryParams {
    page?: number;
    pageSize?: number;
    search?: string;
    genres?: string[];
    excludeId?: string; // Для рекомендаций
    yearRange?: { min: number; max: number }; // Для рекомендаций
    ids?: string[]; // Если нужно получить по ID
}

// --- Функции запросов ---

// Получение списка фильмов (универсальная)
export const fetchFilms = async (params: FilmsQueryParams): Promise<FilmsResponse> => {
    const { page = 1, pageSize = 9, search, genres, excludeId, yearRange, ids } = params;

    const filters: any = {};

    // Фильтр по поиску
    if (search) {
        filters.title = { $containsi: search };
    }

    // Фильтр по жанрам
    if (genres && genres.length > 0) {
        filters.category = { slug: { $in: genres } };
    }

    // Фильтр по годам (для рекомендаций)
    if (yearRange) {
        filters.releaseYear = {
            $gte: yearRange.min,
            $lte: yearRange.max
        };
    }

    // Исключение текущего фильма (для рекомендаций)
    if (excludeId) {
        filters.documentId = { $ne: excludeId };
    }

    // Получение конкретных ID (если понадобится)
    if (ids && ids.length > 0) {
        filters.documentId = { $in: ids };
    }

    const query = qs.stringify(
        {
            populate: ["poster", "category", "gallery"], // Добавил gallery, так как было в Film.ts
            filters,
            pagination: { page, pageSize },
        },
        { encodeValuesOnly: true }
    );

    const { data } = await axios.get<FilmsResponse>(`${STRAPI_URL}/films?${query}`);
    return data;
};

// Получение одного фильма
export const fetchFilmById = async (documentId: string): Promise<Film> => {
    const query = qs.stringify({
        populate: ["poster", "category", "gallery"],
    }, { encodeValuesOnly: true });

    const { data } = await axios.get<SingleFilmResponse>(`${STRAPI_URL}/films/${documentId}?${query}`);
    return data.data;
};