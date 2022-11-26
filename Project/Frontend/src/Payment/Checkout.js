import { useState, Fragment } from "react";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "./AddressForm";
import Review from "./Review";
import Grid from "@mui/material/Grid";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useStateValue } from "./StateContext";
import {
  clientSecretPull,
  clientSecretDataObjectConverter,
  stripeDataObjectConverter,
} from "./constants/functions";
import {
  paymentStatusApi,
} from "../utils/APIRoutes";

const steps = ["Shipping address", "Payment details", "Payment Status"];

const theme = createTheme();

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [{ formValues, product }, dispatch] = useStateValue();
  const [activeStep, setActiveStep] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

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

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };


  const paymentStart = async () => {
    const clientSecretDataObject = clientSecretDataObjectConverter(formValues);
    const output = await clientSecretPull(clientSecretDataObject);
    const clientSecret = output.data;
    const cardElement = elements.getElement(CardElement);
    const stripeDataObject = stripeDataObjectConverter(formValues, cardElement);
    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      stripeDataObject
    );
    if (error) {
      setPaymentStatus(false)
    } else if (paymentIntent.status === "succeeded") {
      const paymentRequest = {
        amount: product.price,
        userid: product.buyerId,
        postid:  product.id,
        senderEmail: formValues.email,
        paymentStatus: true
      }
      const response = await axios.post(paymentStatusApi, paymentRequest);
      setPaymentStatus(true);
      dispatch({
        type: "setPaymentStatus",
        value: true,
      });
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Grid container sx={{ height: "100%", width: "100%" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Fragment>
              {activeStep === steps.length ? (
                <Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #2001539. We have emailed your order
                    confirmation, and will send you an update when your order
                    has shipped.
                  </Typography>
                </Fragment>
              ) : (
                <Fragment>
                  {activeStep === 0 && <AddressForm />}
                  {activeStep === 1 && (
                    <Fragment>
                      <Typography variant="h6" gutterBottom>
                        Payment method
                      </Typography>
                      <Box mt={5}>
                        <CardElement options={CARD_ELEMENT_OPTIONS} />
                      </Box>
                      <Box sx={{ display: "flex", mt: 3, justifyContent: "flex-end" }}>
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ mt: 3, ml: 1 }}
                        onClick={paymentStart}
                      >
                        Place order
                      </Button>
                      </Box>
                    </Fragment>
                  )}
                  {activeStep === 2 && <Review />}
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          
                    {activeStep === 0 && (
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 3, ml: 1 }}
                      >
                        {activeStep === 0 && "Next"}
                      </Button>
                    )}
                  </Box>
                </Fragment>
              )}
            </Fragment>
          </Paper>
        </Container>
      </ThemeProvider>
    </Grid>
  );
};

export default Checkout;
