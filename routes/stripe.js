const stripe = require("stripe")(process.env.STRIPE_SECRET);
const router = require('express').Router();


const successUrl = "http://localhost:3000/PaymentSuccess";  // Remove the initial encoding
const cancelUrl = "http://localhost:3000/PaymentFailed";  // Remove the initial encoding


router.post("/create-checkout-session", async (req, res) => {
    try {
        const { products } = req.body;

        const lineItems = products.map((product) => ({
            price_data: {
                currency: "eur",
                product_data: {
                    name: product.name,
                    images: [encodeURIComponent(product.image)],
                },
                unit_amount: product.price*100,
            },
            quantity: product.cartQuantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: decodeURIComponent(successUrl),  // Decode the URL
            cancel_url: decodeURIComponent(cancelUrl),  // Decode the URL
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while creating the checkout session.' });
    }
});

module.exports = router;
