import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export const stripePayment = async (product_id, subscription_id) => {
	try {
		const stripe_session = await fetch("/api/stripe", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ product_id, subscription_id }),
		})
			.then((res) => res.json())
			.then((data) => {
				return data;
			});

		const stripe = await stripePromise;
		const { error } = await stripe.redirectToCheckout({
			sessionId: stripe_session?.session?.id,
		});

		if (error) {
			if (error instanceof Error) throw new Error(error.message);
		} else {
			throw error;
		}
	} catch (error) {
		console.log(error);
	}
};
