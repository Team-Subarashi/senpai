const stripe = require("stripe")(
  "sk_test_51JetOIEp77X0l0jdMfeOyoPZ5RQCBQsIwYGFHDl1oO7gp3MEcZBNIyUMIxyfjh1oV9Ti76Ql1NXNvm7vP28UCJ0X00h7n8UGYl"
);

require("dotenv").config();

  // YOUR_DOMAIN = "http://localhost:5000/checkout";
  YOUR_DOMAIN = "https://subarashi-senpai.herokuapp.com/";
// else {
//   YOUR_DOMAIN = window.location.href.split(".com")[1];
// }

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
    success_url: `${YOUR_DOMAIN}`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  // axios({
  //   method: 'patch',
  //   url: `/lessons/${req.query.lessonId}`,
  //   data: {
  //     kouhaiId: user._id,
  //   }
  // })

  // exports.updateLesson = (req, res) => {
  //   Lesson.findOneAndUpdate(
  //     { _id: req.params.id },
  //     req.body,
  //     { new: true },
  //     (err, todo) => {
  //       if (err) {
  //         res.status(500).send(err);
  //       }
  //       res.status(200).json(todo);
  //     }
  //   );
  // };


  console.log(session.success_url)
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