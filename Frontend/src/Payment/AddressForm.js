import  {Fragment } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useStateValue } from "./StateContext";
import { Autocomplete } from "@mui/material";
import countries from "./constants/countries"

export default function AddressForm() {

  const [{ formValues }, dispatch] = useStateValue();

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstname"
            name="firstname"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={formValues.firstname}   
            onChange={e =>
              dispatch({
                  type: 'editFormValue',
                  key: "firstname",
                  value: e.target.value
              })
          }         
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastname"
            name="lastname"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={formValues.lastname}
            onChange={e =>
              dispatch({
                  type: 'editFormValue',
                  key: "lastname",
                  value: e.target.value
              })
          }  
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value={formValues.address1}
            onChange={e =>
              dispatch({
                  type: 'editFormValue',
                  key: "address1",
                  value: e.target.value
              })
          }  
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            value={formValues.address2}
            onChange={e =>
              dispatch({
                  type: 'editFormValue',
                  key: "address2",
                  value: e.target.value
              })
          }  
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            value={formValues.city}
            onChange={e =>
              dispatch({
                  type: 'editFormValue',
                  key: "city",
                  value: e.target.value
              })
          }  
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            value={formValues.state}
            onChange={e =>
              dispatch({
                  type: 'editFormValue',
                  key: "state",
                  value: e.target.value
              })
          }  
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            value={formValues.zip}
            onChange={e =>
              dispatch({
                  type: 'editFormValue',
                  key: "zip",
                  value: e.target.value
              })
          }  
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <Autocomplete
                options={countries}
                getOptionLabel={option => option.name || ""}
                renderInput={params =>
                    <TextField
                        label="Country"
                        name="country"
                        variant="outlined"
                        required
                        fullWidth
                        {...params}
                    />
                }
                value={formValues.country}
                onChange={(event, value) => {
                    dispatch({
                        type: 'editFormValue',
                        key: "country",
                        value: value
                    })
                }}
            />
        </Grid>
      </Grid>
    </Fragment>
  );
}
