import "./App.css";

import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

function App() {
  const [dateTime, setdateTime] = useState(new Date());

  const [cartValue, setCartValue] = useState(0);
  const [deliveryDistance, setDeliveryDistance] = useState(0);
  const [items, setItems] = useState(0);
  const [finalDeliveryFeePrice, setFinalDeliveryFeePrice] = useState<number>();

  function handleDeliveryFee() {
    setFinalDeliveryFeePrice(
      getDeliveryFee({
        cartValue,
        deliveryDistance,
        items,
        dateTime,
      })
    );
  }

  function handleClearCalculator() {
    setCartValue(0);
    setDeliveryDistance(0);
    setItems(0);
    setFinalDeliveryFeePrice(0);
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
            setDeliveryDistance(parseFloat(event.target.value))
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
          onChange={(event) => setItems(parseFloat(event.target.value))}
        />
        {/* https://mui.com/x/react-date-pickers/date-time-picker/ */}
        {/* <DateTimePicker
          label="Controlled picker"
          value={dateTime}
          onChange={(newValue) => setdateTime(newValue)}
        /> */}
        <TextField
          data-test-id="orderTime"
          id="outlined-basic"
          type="text"
          label="Order Time"
          value={dateTime}
          variant="outlined"
          margin="normal"
          disabled
        />

        <Button onClick={handleDeliveryFee}>Calculate delivery price</Button>
        <Button onClick={handleClearCalculator}>Clear Calculator</Button>
        {!!finalDeliveryFeePrice && (
          <Typography>Delivery price: {finalDeliveryFeePrice} $</Typography>
        )}
        {finalDeliveryFeePrice === 0 && (
          <Typography>Free Delivery Fee!</Typography>
        )}
      </Box>
    </Box>
  );
}

export default App;

// colocar em outro arquivo dentro da past helpers
function getDeliveryFee(args: {
  cartValue: number;
  deliveryDistance: number;
  items: number;
  dateTime: Date;
}) {
  const { cartValue, dateTime, deliveryDistance, items } = args;
  let deliveryFeePrice = 2;
  let underTenFee = 0;

  if (cartValue >= 200) {
    return 0;
  }

  if (cartValue >= 0.01 && cartValue < 10) {
    underTenFee = Number((10 - cartValue).toFixed(2));
    deliveryFeePrice += underTenFee;
  }

  if (deliveryDistance >= 1001) {
    const additionalMeters = Math.ceil((deliveryDistance - 1000) / 500);
    deliveryFeePrice += additionalMeters;
  }

  if (items > 4) {
    let itemsFee = (items - 4) * 0.5;
    deliveryFeePrice += itemsFee;
  }

  if (items > 12) {
    deliveryFeePrice += 1.2;
  }

  if (
    dateTime.getDay() === 5 &&
    dateTime.getHours() >= 15 &&
    dateTime.getHours() <= 19
  ) {
    deliveryFeePrice *= 1.2;
  }

  if (deliveryFeePrice >= 15) {
    deliveryFeePrice = 15;
  }

  return Number(deliveryFeePrice.toFixed(2));
}
