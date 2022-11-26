import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { CardElement,useElements,
  useStripe } from "@stripe/react-stripe-js";
  import { loadStripe } from "@stripe/stripe-js";
import { Box, Button } from "@mui/material";
import { useStateValue } from "./StateContext";
import {
  clientSecretPull,
  clientSecretDataObjectConverter,
  stripeDataObjectConverter,
} from "./constants/functions";
export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [{ formValues }, dispatch] = useStateValue();
  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleSubmit = async () => {
    const clientSecretDataObject = clientSecretDataObjectConverter(formValues);
    const output = await clientSecretPull(clientSecretDataObject);
    const clientSecret = output.data;
    const cardElement = elements.getElement(CardElement);
    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: cardElement,
    // });
    const stripeDataObject = stripeDataObjectConverter(formValues, cardElement);
    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      stripeDataObject
    );

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentIntent);
      if(paymentIntent.status === 'succeeded'){
        console.log("Payment success");
      }
      // ... SEND to your API server to process payment intent
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Box mt={5}>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </Box>
      <Button onClick={handleSubmit}>Submit</Button>
    </React.Fragment>
  );
}
