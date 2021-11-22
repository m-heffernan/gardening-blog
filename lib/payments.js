import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);

export async function initiateCheckout({ lineItems } = {}) {
  const stripe = await stripePromise;
  await stripe.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: `${window.location.origin}/success`,
    // successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}/success`,
    cancelUrl: `${window.location.origin}/store`,
    shippingAddressCollection: {
      allowedCountries: ["US"],
    },
  });
}
