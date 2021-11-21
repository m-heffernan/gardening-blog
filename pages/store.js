import { siteTitle } from "../components/layout";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/store.module.css";
import { Fragment } from "react";
import { useState, useEffect } from "react";

import Footer from "../components/footer";

import products from "../products-test.json";

function format({ amount, currency }) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format((amount / 100).toFixed(2));
}

export default function Store() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedValue = window.localStorage.getItem("shopping-cart");
    const query = new URLSearchParams(window.location.search);
    const cartValue =
      query.get("status") === "success" ? [] : JSON.parse(savedValue);

    if (savedValue) {
      setCart(cartValue);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("shopping-cart", JSON.stringify(cart));
  }, [cart]);

  function emptyCart() {
    setCart([]);
    window.localStorage.setItem("shopping-cart", JSON.stringify([]));
  }

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
      <section className={styles.store}>
        <div className={styles.products}>
          {products.map((product) => {
            function addToCart() {
              const isInCart = cart.some(({ price }) => price === product.id);

              const newCart = isInCart
                ? cart.map((item) => {
                    if (item.price !== product.id) {
                      return item;
                    }
                    return {
                      price: item.price,
                      quantity: item.quantity + 1,
                    };
                  })
                : [...cart, { price: product.id, quantity: 1 }];
              setCart(newCart);
              console.log("Cart", cart);
            }

            const formattedPrice = format({
              amount: product.amount,
              currency: product.currency,
            });

            const { id, name, description, image } = product;
            return (
              <div className={styles.product} key={id}>
                <Image
                  src={image}
                  alt={name}
                  width={135}
                  height={335}
                  priority
                />
                <h2>{name}</h2>
                <p className={styles.description}>{description}</p>
                <p>
                  <span className={styles.price}>{formattedPrice}</span>
                  <span className={styles.tag}>free NYC shipping!</span>
                </p>
                <button
                  aria-label={`Add ${product.name} To Cart`}
                  onClick={addToCart}
                >
                  Add To Cart
                </button>
              </div>
            );
          })}
        </div>
        <aside className={styles.cart}>
          <h3>Your Cart</h3>
          {cart.length === 0 ? (
            <p className={styles.empty}>
              your cart is empty! maybe boop it with a seedling or two?
            </p>
          ) : (
            <Fragment>
              <ul className={styles.cartItems}>
                {cart.map((item) => {
                  const cartItem = products.find((p) => p.id === item.price);
                  return (
                    <li key={cartItem.id}>
                      <p className={styles.cartItemDetails}>
                        <span>{cartItem.name}</span>
                        <span className={styles.cartItemSubtotal}>
                          {format({
                            amount: cartItem.amount * item.quantity,
                            currency: "usd",
                          })}
                        </span>
                      </p>
                      <p className={styles.cartItemQuantity}>
                        <span>Qty. {item.quantity}</span>
                        <span>
                          {format({
                            amount: cartItem.amount,
                            currency: "usd",
                          })}{" "}
                          each
                        </span>
                      </p>
                    </li>
                  );
                })}
              </ul>
              <p>
                {format({
                  amount: cart.reduce((total, item) => {
                    const { amount } = products.find(
                      (p) => p.id === item.price
                    );
                    return (total += amount * item.quantity);
                  }, 0),
                  currency: "usd",
                })}
              </p>
              <button>Check Out</button>
              <p className={styles.emptyCart}>
                <button onClick={emptyCart}>empty cart</button>
              </p>
            </Fragment>
          )}
        </aside>
      </section>
      <Footer />
    </Fragment>
  );
}
