import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const FAVORITES_KEY = 'cinema_favorites';

const getFavorites = async (): Promise<string[]> => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem(FAVORITES_KEY);
    return saved ? JSON.parse(saved) : [];
};

export const useFavorites = () => {
    const queryClient = useQueryClient();

    const { data: favorites = [] } = useQuery({
        queryKey: ['favorites'],
        queryFn: getFavorites,
        initialData: () => {
            if (typeof window === "undefined") return [];
            const saved = localStorage.getItem(FAVORITES_KEY);
            return saved ? JSON.parse(saved) : [];
        },
    });

    const mutation = useMutation({
        mutationFn: async (ids: string[]) => {
            if (typeof window === "undefined") return ids;
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
            return ids;
        },
        onSuccess: (newData) => {
            queryClient.setQueryData(['favorites'], newData);
        },
    });

    const toggleFavorite = (id: string) => {
        const currentFavorites = queryClient.getQueryData<string[]>(['favorites']) || [];
        const isExist = currentFavorites.includes(id);
        
        const newList = isExist
            ? currentFavorites.filter((fid) => fid !== id)
            : [...currentFavorites, id];
            
        mutation.mutate(newList);
    };

    const isFavorite = (id: string) => favorites.includes(id);

    return { 
        favorites, 
        toggleFavorite, 
        isFavorite,
        isLoading: mutation.isPending
    };
};