import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getPublicApikey } from "./constants/functions";
import Checkout from "./Checkout";

const Payment = () => {
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    const retrievePublishableKey = async () => {
      const response = await getPublicApikey();
      const stripe = loadStripe(response.data.key);
      if(stripePromise===null){
        setStripePromise(stripe);
      }
    };
    retrievePublishableKey();
  }, []);

  return (
    <Container>
      <Elements stripe={stripePromise}>
        <Checkout />
      </Elements>
    </Container>
  );
};

export default Payment;
