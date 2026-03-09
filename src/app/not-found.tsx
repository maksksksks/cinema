import Text from "@/shared/components/Text";
import Button from "@/shared/components/Button";
import Link from "next/link";
import styles from "./not-found.module.scss";

export default function NotFoundPage() {
    return (
        <div className={styles.notFoundPage}>
            <Text tag="h1" view="p-32" color="primary" weight="bold">
                404 — Страница не найдена
            </Text>
            <Text tag="p" view="p-20" color="secondary">
                К сожалению, такой страницы не существует.
            </Text>
            <Link href="/films">
                <Button variant="filled">Вернуться к фильмам</Button>
            </Link>
        </div>
    );
}