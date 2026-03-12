'use client'

import { useEffect } from "react";
import Text from "@/shared/components/Text";
import Button from "@/shared/components/Button";
import styles from "./error.module.scss";

interface ErrorProps {
    error: Error;
    reset: () => void;
}

export default function SegmentError({ error, reset }: ErrorProps) {
    useEffect(() => {
        console.error("Segment error:", error);
    }, [error]);

    return (
        <div className={styles.errorPage}>
            <Text tag="h1" view="p-32" color="red" weight="bold">
                Что-то пошло не так
            </Text>
            <Text tag="p" view="p-20" color="secondary">
                Произошла ошибка при загрузке этой страницы.
            </Text>
            <Button variant="filled" onClick={reset}>
                Попробовать снова
            </Button>
        </div>
    );
}