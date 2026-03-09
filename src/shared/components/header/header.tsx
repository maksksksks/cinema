
import Link from "next/link";
import Image from "next/image";
import Button from "../Button";
import BookmarkIcon from "../icons/BookmarkIcon";
import UserIcon from "../icons/UserIcon";
import styles from "./header.module.scss";
import logo from "@/shared/assets/logo.png";

export default function Header() {
    return (
        <div className={styles.header}>
            <Link href="/films">
                <Image src={logo} alt="Logo" width={142} height={94} />
            </Link>

            <div className={styles.nav}>
                <Button variant="underline">Фильмы</Button>
                <Button variant="underline">Новинки</Button>
                <Button variant="underline">Подборки</Button>
            </div>

            <div className={styles.icons}>
                <Link href="/favorites">
                    <BookmarkIcon width={30} height={30} />
                </Link>

                <UserIcon width={30} height={30} />
            </div>
        </div>
    );
}