import Link from "next/link";
import styles from "./header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a>Blog</a>
      </Link>
      <Link href="/store">
        <a>Store</a>
      </Link>
    </header>
  );
}
