'use client';

import Button from "@/shared/components/Button";
import { useFavorites } from "@/shared/hooks/useFavorites";

interface FavoriteButtonProps {
    documentId: string;
}

export const FavoriteButton = ({ documentId }: FavoriteButtonProps) => {
    const { toggleFavorite, isFavorite } = useFavorites();
    
    const isActive = isFavorite(documentId);

    return (
        <Button
            variant="outlined"
            textColor={isActive ? "red" : "primary"}
            onClick={() => toggleFavorite(documentId)}
        >
            {isActive ? "В избранном" : "В избранное"}
        </Button>
    );
};