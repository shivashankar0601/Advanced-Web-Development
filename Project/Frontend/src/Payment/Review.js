import * as React from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { useStateValue } from "./StateContext";
import { getPaymentStatusApi, host } from "../utils/APIRoutes";
import { useCookies } from "react-cookie";

export default function Review() {
  const [{ formValues, product, status }, dispatch] = useStateValue();
  const [cookies] = useCookies(["user"]);

  const firstName = cookies.user.user.firstname;
  const lastName = cookies.user.user.lastname;
  const name = firstName + " " + lastName;
  const payments = [
    { name: "Method", detail: "Card" },
    { name: "Card holder", detail: name },
  ];
  const addresses = [
    formValues.address1,
    formValues.address2,
    formValues.city,
    formValues.state,
    formValues.zip,
    formValues.country.name,
  ];
  const products = [product];
  const total = formValues.amount;

  React.useEffect(() => {
    const getPaymentStatus = async () => {
      const email = formValues.email;
      const data = await axios.get(`${getPaymentStatusApi}/${email}`);
    };
    getPaymentStatus();
    const buyersRewards = {
      userId: product.buyerId,
      points: product.price,
      itemId: product.name,
    };
    const sellerRewards = {
      userId: product.sellerId,
      points: product.price,
      itemId: product.name,
    };
    const buyerLeaderBoard = {
      userId: name,
      points: product.price,
    };
    const sellerLeaderBoard = {
      userId: product.sellerName,
      points: product.price,
    };
    const transaction = {
      transactionAmount: product.price,
      receiverEmail: formValues.email,
      senderEmail: cookies.user.user.email,
      SenderEmailBuildingNo: cookies.user.user.buildingNo,
      transactionTimeStamp: Date.now(),
    };
    const sendRewardPoints = async () => {
      await axios.post(`${host}/reward/add`, buyersRewards);
      await axios.post(`${host}/reward/add`, sellerRewards);
      await axios.post(`${host}/leaderboard/update`, buyerLeaderBoard);
      await axios.post(`${host}/leaderboard/update`, sellerLeaderBoard);
      await axios.post(`${host}/admin/transactions`, transaction);
      await axios.post(`${host}/posts/delete`, {
        postId: product.id,
      });
    };
    sendRewardPoints();
    dispatch({ type: "emptyFormValue" });
  }, []);

  //dispatch({ type: "emptyFormValue" });
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
        {status ? "Payment success" : "Payment decline"}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {total}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>
            {formValues.firstname}&nbsp;{formValues.lastname}
          </Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
