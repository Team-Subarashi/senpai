const stripe = require("stripe")(
  "sk_test_51JetOIEp77X0l0jdMfeOyoPZ5RQCBQsIwYGFHDl1oO7gp3MEcZBNIyUMIxyfjh1oV9Ti76Ql1NXNvm7vP28UCJ0X00h7n8UGYl"
);

require("dotenv").config();

if (process.env.NODE_ENV === "development") {
  YOUR_DOMAIN = "http://localhost:3000/checkout";
} else {
  YOUR_DOMAIN = "subarashi-senpai.herokuapp.com/checkout";
}

exports.createCheckoutSession = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // TODO: replace this with the `price` of the product you want to sell
        // price: "price_1Jg1LrEp77X0l0jdvmgYUpwP",
        price: req.params.priceId,
        quantity: 1,
      },
    ],
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/${req.params.senpaiId}/${req.query.lesson_id}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });
  res.redirect(303, session.url);
}

exports.createLessonAndPrice = async (req, res) => {
  const inputNewLesson = req.body;
  const product = await stripe.products.create({
    name: inputNewLesson.lessonName,
  });
  const inputPrice = req.body;
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: inputPrice.price,
    currency: "jpy",
  });
  res.send(200);
}

exports.getStripeLesson = async (req, res) => {
  const products = await stripe.products.list({
    limit: 100,
  });
  res.send(products);
}