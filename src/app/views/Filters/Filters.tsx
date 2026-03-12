'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import Input from "../../components/Input";
import MultiDropdown, { type Option } from "../../components/MultiDropdown";
import Button from "@/shared/components/Button";
import styles from "../../page.module.scss";

const genreOptions: Option[] = [
    { key: 'fantasy', value: 'Фэнтези' },
    { key: 'drama', value: 'Драма' },
    { key: 'comedy', value: 'Комедия' },
    { key: 'thriller', value: 'Триллер' },
];

interface Props {
    initialSearch: string;
    initialGenres: string[];
}

export default function Filters({ initialSearch, initialGenres }: Props) {
    const router = useRouter();
    const pathname = usePathname();

    const [inputValue, setInputValue] = useState(initialSearch);
    const selectedGenres = genreOptions.filter(opt => initialGenres.includes(opt.key));

    const pushParams = (newParams: Record<string, string | null>) => {
        const params = new URLSearchParams(window.location.search);
        Object.entries(newParams).forEach(([key, val]) => {
            if (val) params.set(key, val);
            else params.delete(key);
        });
        router.push(`${pathname}?${params.toString()}`);
    };

    const handleSearch = () => pushParams({ search: inputValue || null, page: '1' });

    const handleGenreChange = (value: Option[]) => {
        const keys = value.map(v => v.key).join(',') || null;
        pushParams({ genres: keys, page: '1' });
    };

    return (
        <div className={styles.filters}>
            <div className={styles.search}>
                <Input
                    onChange={setInputValue}
                    value={inputValue}
                    placeholder="Искать фильм"
                    className={styles.searchInput}
                />
                <Button className={styles.searchButton} onClick={handleSearch}>
                    Найти
                </Button>
            </div>

            <MultiDropdown
                className={styles.MultiDropdownFilters}
                options={genreOptions}
                value={selectedGenres}
                onChange={handleGenreChange}
                getTitle={(value) => value.length === 0 ? 'Фильтры' : value.map(v => v.value).join(', ')}
            />
        </div>
    );
}