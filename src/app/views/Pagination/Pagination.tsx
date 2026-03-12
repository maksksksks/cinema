'use client';

import { useRouter, usePathname } from 'next/navigation';
import Button from "@/shared/components/Button";
import styles from "../../page.module.scss";

interface Props {
    currentPage: number;
    pageCount: number;
}

export default function Pagination({ currentPage, pageCount }: Props) {
    const router = useRouter();
    const pathname = usePathname();

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(window.location.search);
        params.set("page", String(page));
        router.push(`${pathname}?${params.toString()}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (pageCount <= 1) return null;

    return (
        <div className={styles.paginator}>
            <Button variant="outlined" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                Предыдущая
            </Button>

            <div className={styles.pagesButtons}>
                {Array.from({ length: pageCount }, (_, i) => i + 1).map(page => (
                    <Button
                        key={page}
                        variant={page === currentPage ? "filled" : "outlined"}
                        onClick={() => handlePageChange(page)}
                        style={{ minWidth: "48px" }}
                    >
                        {page}
                    </Button>
                ))}
            </div>

            <Button variant="outlined" disabled={currentPage === pageCount} onClick={() => handlePageChange(currentPage + 1)}>
                Следующая
            </Button>
        </div>
    );
}