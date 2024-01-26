import "./App.css";

import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { useEffect, useState } from "react";

function App() {
  const [cartValue, setCartValue] = useState(0);
  const [deliveryDistance, setDeliveryDistance] = useState(0);
  const [items, setItems] = useState(0);
  const [dateTime, setdateTime] = useState("");
  const [dayofWeek, setDayofWeek] = useState(0);
  const [hour, setHour] = useState(0);
  const [finalDeliveryFeePrice, setFinalDeliveryFeePrice] = useState("0");

  useEffect(() => {
    return () => {
      const currentBrowserDateTime = new Date();
      const currentDayofWeek = currentBrowserDateTime.getDay();
      const currentDay =
        currentBrowserDateTime.getDay() +
        "/" +
        (currentBrowserDateTime.getMonth() + 1) +
        "/" +
        currentBrowserDateTime.getFullYear();

      const currentHour = currentBrowserDateTime.getHours();

      const currentMinutes = currentBrowserDateTime.getMinutes();

      setDayofWeek(currentDayofWeek);
      setHour(currentHour);
      setdateTime(currentDay + " " + currentHour + ":" + currentMinutes);
    };
  }, []);

  const handleCartValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCartValue(parseFloat(e.target.value));
  };

  const handleDeliveryDistance = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryDistance(parseFloat(e.target.value));
  };

  const handleItems = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItems(parseFloat(e.target.value));
  };

  function handleDeliveryFee() {
    let deliveryFeePrice = 0;
    let underTenFee = 0;
    let baseDeliveryFee = 2;

    if (cartValue >= 200) {
      deliveryFeePrice = 0;
      return setFinalDeliveryFeePrice("Free Delivery Fee!");
    } else {
      //
      if (cartValue >= 0.01 && cartValue < 10) {
        underTenFee = Number((10 - cartValue).toFixed(2));
        deliveryFeePrice += underTenFee;
      }

      if (deliveryDistance >= 1001) {
        const additionalMeters = Math.ceil((deliveryDistance - 1000) / 500);
        deliveryFeePrice += additionalMeters + baseDeliveryFee;
      } else {
        deliveryFeePrice += baseDeliveryFee;
      }

      if (items > 4) {
        let itemsFee = (items - 4) * 0.5;
        deliveryFeePrice += itemsFee;
      }
      if (items > 12) {
        deliveryFeePrice += 1.2;
      }

      if (dayofWeek === 5 && hour >= 15 && hour <= 19) {
        deliveryFeePrice *= 1.2;
      }

      if (deliveryFeePrice >= 15) {
        deliveryFeePrice = 15;
      }
    }

    return setFinalDeliveryFeePrice(deliveryFeePrice.toFixed(2) + "$");
  }

  function handleClearCalculator() {
    setCartValue(0);
    setDeliveryDistance(0);
    setItems(0);
    setFinalDeliveryFeePrice("0");
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
          onChange={handleCartValue}
        ></TextField>
        <TextField
          data-test-id="deliveryDistance"
          id="outlined-basic"
          type="number"
          label="Delivery distance"
          value={deliveryDistance}
          variant="outlined"
          margin="normal"
          onChange={handleDeliveryDistance}
        ></TextField>
        <TextField
          data-test-id="numberOfItems"
          id="outlined-basic"
          type="number"
          label="Number of items"
          value={items}
          variant="outlined"
          margin="normal"
          onChange={handleItems}
        ></TextField>
        <TextField
          data-test-id="orderTime"
          id="outlined-basic"
          type="text"
          label="Order Time"
          value={dateTime}
          variant="outlined"
          margin="normal"
          disabled
        ></TextField>

        <Button onClick={handleDeliveryFee}>Calculate delivery price</Button>
        <Button onClick={handleClearCalculator}>Clear Calculator</Button>
        <Typography>Delivery price: {finalDeliveryFeePrice}</Typography>
      </Box>
    </Box>
  );
}

export default App;
