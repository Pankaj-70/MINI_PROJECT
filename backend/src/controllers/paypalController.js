import { asyncHandler } from "../utils/asyncHandler.js";
import paypal from "paypal-rest-sdk";

paypal.configure({
  mode: "sandbox",
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_SECRET_KEY,
});

const createPayment = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  const createPaymentJson = {
    intent: "sale",
    payer: { payment_method: "paypal" },
    redirect_urls: {
      return_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    },
    transactions: [
      {
        amount: {
          currency: "USD",
          total: amount.toFixed(2).toString(),
        },
        description: "Payment for order",
      },
    ],
  };

  paypal.payment.create(createPaymentJson, (error, payment) => {
    if (error) {
      console.error(error);
      res.status(500).send({ message: "Error creating PayPal payment" });
    } else {
      const approvalUrl = payment.links.find(
        (link) => link.rel === "approval_url"
      ).href;
      res.status(200).send({ approvalUrl });
    }
  });
});
const creditCardPayment = asyncHandler(async (req, res) => {
  const { amount, cardDetails } = req.body;

  const paymentJson = {
    intent: "sale",
    payer: {
      payment_method: "credit_card",
      funding_instruments: [
        {
          credit_card: {
            number: cardDetails.cardNumber,
            type: "visa",
            expire_month: parseInt(cardDetails.expiryDate.split("/")[0]),
            expire_year: parseInt("20" + cardDetails.expiryDate.split("/")[1]),
            cvv2: cardDetails.cvv,
          },
        },
      ],
    },
    transactions: [
      {
        amount: {
          total: amount.toFixed(2).toString(),
          currency: "USD",
        },
        description: "Payment for order",
      },
    ],
  };

  paypal.payment.create(paymentJson, (error, payment) => {
    if (error) {
      console.error(error.response);
      res.status(500).send({ success: false, message: error.response.message });
    } else {
      res.status(200).send({ success: true, payment });
    }
  });
});

export { createPayment, creditCardPayment };
