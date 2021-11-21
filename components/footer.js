import styles from "./footer.module.css";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a href="https://www.instagram.com/wavertreefarm/" target="_blank">
        Wavertree Farm{" "}
        <span className={styles.instagram}>
          <Image
            src="/images/instagram.png"
            height={20}
            width={20}
            alt="instagram"
          ></Image>
        </span>
      </a>
    </footer>
  );
}
