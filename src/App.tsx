import "./App.css";

import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { useState } from "react";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import React from "react";

import { getDeliveryFee } from "./helpers/getDeliveryFee";

function App() {
  const [cartValue, setCartValue] = useState(0);
  const [deliveryDistance, setDeliveryDistance] = useState(0);
  const [items, setItems] = useState(0);
  const [pickerDateTime, setPickerDateTime] = React.useState<Dayjs | null>(
    dayjs()
  );
  const [finalDeliveryFeePrice, setFinalDeliveryFeePrice] = useState<number>();

  function handleDeliveryFee() {
    setFinalDeliveryFeePrice(
      getDeliveryFee({ cartValue, deliveryDistance, items, pickerDateTime })
    );
  }

  function handleClearCalculator() {
    setCartValue(0);
    setDeliveryDistance(0);
    setItems(0);
    setFinalDeliveryFeePrice(undefined);
  }

  return (
    <Box
      bgcolor="#00c2e8"
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h4" color="#ffffff" mb={4}>
        Delivery Fee Calculator
      </Typography>

      <Box
        bgcolor="#ffffff"
        width="50vw"
        height="80vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        border={1}
        borderColor="#ffffff"
        borderRadius={4}
      >
        <TextField
          data-test-id="cartValue"
          id="outlined-basic"
          type="number"
          label="Cart Value"
          value={cartValue}
          variant="outlined"
          margin="normal"
          onChange={(event) => setCartValue(parseFloat(event.target.value))}
        />
        <TextField
          data-test-id="deliveryDistance"
          id="outlined-basic"
          type="number"
          label="Delivery distance"
          value={deliveryDistance}
          variant="outlined"
          margin="normal"
          onChange={(event) =>
            setDeliveryDistance(parseInt(event.target.value))
          }
        />
        <TextField
          data-test-id="numberOfItems"
          id="outlined-basic"
          type="number"
          label="Number of items"
          value={items}
          variant="outlined"
          margin="normal"
          onChange={(event) => setItems(parseInt(event.target.value))}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            value={pickerDateTime}
            onChange={(newDateTime) => setPickerDateTime(newDateTime)}
          />
        </LocalizationProvider>

        <Button onClick={handleDeliveryFee}>Calculate delivery price</Button>
        <Button onClick={handleClearCalculator}>Clear Calculator</Button>
        {!!finalDeliveryFeePrice && (
          <Typography data-test-id="fee">
            Delivery price: {finalDeliveryFeePrice}$
          </Typography>
        )}
        {finalDeliveryFeePrice === 0 && (
          <Typography>Free Delivery Fee!</Typography>
        )}
      </Box>
    </Box>
  );
}

export default App;
