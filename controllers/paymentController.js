const Product = require("../Models/Product");
const Subscription = require("../Models/Subscription");
const { encrypt } = require("../utils/encryptDecrypt");

module.exports.choosePaymentMethod = async (req, res) => {
  try {
    const userId = req.user._id;
    const { paymentMethod, productId } = req.body;

    console.log(paymentMethod, productId);

    const product = await Product.findOne({ productId });
    console.log(product);
    let subscription = new Subscription({
      user: userId,
      product: product.id,
      paymentMethod
    });

    subscription = await subscription.save();

    const { iv, encryptedData: encryptedSubscriptionId } = encrypt(
      subscription.id
    );

    console.log(iv, encryptedSubscriptionId);

    res.status(200).json({
      success: true,
      redirectURI: `${
        process.env.NODE_ENV === undefined
          ? process.env.DEVELOPMENT_URL
          : process.env.LIVE_URL
      }/payment-intent/card/${iv}/${encryptedSubscriptionId}`
    });
  } catch (err) {
    console.log(err);
  }
};
