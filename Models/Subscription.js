const mongoose = require("mongoose");
const SubscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true
    },
    paymentMethod: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true,
      default: "unpaid",
      enum: ["unpaid", "active", "cancelled", "expired"]
    }
  },
  { timestamps: true }
);

module.exports = Subscription = mongoose.model(
  "subscription",
  SubscriptionSchema
);
