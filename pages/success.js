import Confetti from "react-confetti";
import { siteTitle } from "../components/layout";
import Head from "next/head";
import Image from "next/image";
import { Fragment } from "react";
import styles from "../styles/success.module.css";
import { useState, useEffect } from "react";
import "animate.css";

export default function Success() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    window.localStorage.setItem("shopping-cart", JSON.stringify([]));
    setTimeout(() => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }, 100);
  });
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
      <div className={styles.container}>
        <main className={styles.main}>
          <Confetti width={width} height={height} numberOfPieces={300} />
          <h1 className={styles.title}>congrats!</h1>
          <p className={styles.description}>
            We have successfully processed your payment!
          </p>
          <img
            className="animate__animated animate__rotateInDownRight"
            src="/images/watering-plants.png"
            alt="animated plant"
          />
        </main>
      </div>
    </Fragment>
  );
}
