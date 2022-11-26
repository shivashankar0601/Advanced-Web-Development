import Axios from "axios";
import {paymentAPI, publicKey } from "../../utils/APIRoutes";

export const getPublicApikey = async () => {
  return new Promise(async (resolve) => {
    const data = await Axios.get(publicKey);
    resolve(data);
  });
};

export const clientSecretPull = (input) => {
  return new Promise(async (resolve) => {
    const data = await Axios.post(paymentAPI, input);
    resolve(data);
  });
};

export const clientSecretDataObjectConverter = ({
  email: receipt_email,
  amount,
}) => ({
  amount: amount * 100,
  currency: "cad",
  cardType: "card",
  receipt_email,
});

export const stripeDataObjectConverter = (
  { firstname, lastname, email, address1, address2, zip, city, country, state },
  cardElement
) => ({
  payment_method: {
    card: cardElement,
    billing_details: {
      address: {
        city,
        country:country.code,
        line1: address1,
        line2: address2,
        postal_code: zip,
        state,
      },
      email,
      name: `${firstname} ${lastname}`,
      phone: null,
    },
  },
});
