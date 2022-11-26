/*
    Author: Sahil Prafulkumar Parekh
    Banner: B00900956
    Feature: Payment
    Task: controller for a stripe payment 
*/
const publishableKey = "pk_test_51LAxvxGBEXp5hUDF0J86tQkJATiPdFpQrN5fQgYTo4Ufe47qemVaiH9CYWDC86kLly8KrUY1kI52MG1r85pQWU8j00Ojt6PWRf";
const secretKey = "sk_test_51LAxvxGBEXp5hUDFIbqctmTudrjydDOR1NMKqnAzhI103A5UnQWO0s9KQAwHWqdUmzdzSGwBw6uRwKcjdivAdvCM00OyVfjy3k";
const stripe = require("stripe")(secretKey);
const Payment = require("../models/paymentModel");

module.exports.getCheckoutServer = (req, res) => {
  res.send({
    message: "Ping from Checkout Server",
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
  });
};

module.exports.getPublicKey = (req, res) => {
  res.send({
    message: "Use this public key",
    timestamp: new Date().toISOString(),
    key: publishableKey,
  });
};

module.exports.paymentIntent = async (req, res,next) => {

  const data = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: data.amount,
    currency: data.currency,
    payment_method_types: [data.cardType],
  });

const clientSecret = paymentIntent.client_secret;
const output = {
  publishableKey,
  clientSecret
}
res.json( clientSecret);
};

module.exports.paymentStatus = async (req, res,next) => {
  try {
    const paymentData = req.body;
    const response = await Payment.create(paymentData);
    return res.json({ status: true, msg: "Payment status updated", });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getPaymentStatus = async (req, res,next) => {
  try {
    const response = await Payment.find({ senderEmail: req.params.id });
    return res.json({ status: true, msg: "Payment staus of seller", response });
  } catch (ex) {
    next(ex);
  }
};
