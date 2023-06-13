import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
	if (req.method === "POST") {
		try {
			const { product_id, subscription_id } = req.body;
			// return res.status(200).json({ p: product_id, s: subscription_id });
			const session = await stripe.checkout.sessions.create({
				line_items: [
					{
						price: product_id,
						quantity: 1,
					},
				],
				mode: "payment",
				success_url: `${req.headers.origin}/subscription/activate?_sid={CHECKOUT_SESSION_ID}`,
				cancel_url: req.headers.origin,
				metadata: {
					subscription_id: subscription_id,
				},
				// line_items: [
				// 	{
				// 		price_data: {
				// 			currency: "usd",
				// 			product_data: {
				// 				name: "Monthly Subscription",
				// 			},
				// 			unit_amount: 99,
				// 		},
				// 		quantity: 1,
				// 	},
				// ],
			});

			return res.status(201).json({ session });
		} catch (err) {
			res.status(err.statusCode || 500).json(err.message);
		}
	} else {
		res.setHeader("Allow", "POST");
		res.status(405).end("Method Not Allowed");
	}
}
