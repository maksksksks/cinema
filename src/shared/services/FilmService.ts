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
    excludeId?: string;
    yearRange?: { min: number; max: number };
    ids?: string[];
}

interface StrapiFilters {
    title?: { $containsi: string };
    category?: { slug: { $in: string[] } };
    releaseYear?: { $gte: number; $lte: number };
    documentId?: { $ne: string } | { $in: string[] };
}

export const fetchFilms = async (params: FilmsQueryParams): Promise<FilmsResponse> => {
    const { page = 1, pageSize = 9, search, genres, excludeId, yearRange, ids } = params;

    const filters: StrapiFilters = {};

    if (search) {
        filters.title = { $containsi: search };
    }

    if (genres && genres.length > 0) {
        filters.category = { slug: { $in: genres } };
    }

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

export const fetchFilmById = async (documentId: string): Promise<Film> => {
    const query = qs.stringify({
        populate: ["poster", "category", "gallery"],
    }, { encodeValuesOnly: true });

    const { data } = await axios.get<SingleFilmResponse>(`${STRAPI_URL}/films/${documentId}?${query}`);
    return data.data;
};

export const getStrapiMediaUrl = (url?: string): string | null => {
    if (!url) return null;
    if (url.startsWith('http')) return url;

    return `${STRAPI_BASE_URL}${url}`;
};