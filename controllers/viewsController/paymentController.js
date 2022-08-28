const Product = require("../../Models/Product");
const Subscription = require("../../Models/Subscription");
const User = require("../../Models/User");
const { decrypt } = require("../../utils/encryptDecrypt");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports.choosePaymentPage = async (req, res) => {
  try {
    const products = await Product.find({});

    res.render("paymentMethod", {
      products
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.makePayment = async (req, res) => {
  try {
    console.log(req.params);
    const { xiv, encryptedSubscriptionId } = req.params;
    const subscriptionId = decrypt({
      iv: xiv,
      encryptedData: encryptedSubscriptionId
    });

    let subscription = await Subscription.findById(subscriptionId);

    let user = await User.findById(subscription.user);

    if (!user.stripeCusId) {
      const customer = await stripe.customers.create({
        email: user.email
      });

      user = await User.findByIdAndUpdate(
        req.user._id,
        { stripeCusId: customer.id },
        { new: true }
      );
    }

    let product = await Product.findById(subscription.product);

    // Create the subscription. Note we're expanding the Subscription's
    // latest invoice and that invoice's payment_intent
    // so we can pass it to the front end to confirm the payment
    const stripeSubscription = await stripe.subscriptions.create({
      customer: user.stripeCusId,
      items: [
        {
          price: product.priceId
        }
      ],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"]
    });

    res.render("payment", {
      subscriptionId: stripeSubscription.id,
      clientSecret:
        stripeSubscription.latest_invoice.payment_intent.client_secret
    });
  } catch (err) {
    console.log(err);
    res.render("error", {
      message: "Server error, please try again later!"
    });
  }
};
