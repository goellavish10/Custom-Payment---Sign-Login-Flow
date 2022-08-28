const stripe = Stripe(
  "pk_test_51LbehpSFKgZPcoh4R29St40b8ErWaarhsKMR5wgjZfXFDldh54zIYWhHYUMiowEpBCF064v9E1ui8cqKPLDZF2X600XGUZ7c72"
);

const options = {
  clientSecret: document.getElementById("payment-form").dataset.clientsecret,
  appearance: {
    theme: "night",
    colorPrimary: "#76ed07",
    colorBackground: "#000",
    colorText: "#fff"
  }
};

const elements = stripe.elements(options);

// Create and mount the Payment Element
const paymentElement = elements.create("payment");
paymentElement.mount("#payment-element");

const form = document.getElementById("payment-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const { error } = await stripe.confirmPayment({
    //`Elements` instance that was used to create the Payment Element
    elements,
    confirmParams: {
      return_url: "http://localhost:8000/payment-intent/success"
    }
  });

  if (error) {
    const messageContainer = document.querySelector("#error-message");
    messageContainer.textContent = error.message;
  }
});
