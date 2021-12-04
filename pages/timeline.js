import Head from "next/head";
import { Fragment } from "react";
import { siteTitle } from "../components/layout";
import styles from "../styles/timeline.module.css";

export default function Timeline() {
  return (
    <Fragment>
      <Head>
        <link rel="icon" href="/favicon-32x32.png" />
        <meta name="description" content="Mike Heffernan personal blog" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <title>{siteTitle}</title>
      </Head>
      <div className={styles.timeline}>
        <div className={styles.outer}>
          <div className={styles.card}>
            <div className={styles.info}>
              <h3 className={styles.title}>Title 1</h3>
              <p>Lorem ipsum and test example</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.info}>
              <h3 className={styles.title}>Title 2</h3>
              <p>Lorem ipsum and test example</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
