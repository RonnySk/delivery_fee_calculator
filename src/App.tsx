import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import logo from "./images/wolt_logo.png";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { getDeliveryFee } from "./helpers/getDeliveryFee";

function App() {
  const [cartValue, setCartValue] = useState(0);
  const [deliveryDistance, setDeliveryDistance] = useState(0);
  const [items, setItems] = useState(0);
  const [pickerDateTime, setPickerDateTime] = useState<Dayjs | null>(dayjs());
  const [finalDeliveryFeePrice, setFinalDeliveryFeePrice] = useState(0);

  function handleDeliveryFee() {
    setFinalDeliveryFeePrice(
      getDeliveryFee({ cartValue, deliveryDistance, items, pickerDateTime })
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
      <img src={logo} style={{ width: 250 }} alt="Wolt logo" />

      <Typography variant="h1" color="#ffffff" m={4} fontSize={30}>
        Delivery Fee Calculator
      </Typography>

      <Stack bgcolor="#ffffff" borderRadius={4} p={6} spacing={3}>
        <FormControl fullWidth>
          <InputLabel>Cart value</InputLabel>
          <OutlinedInput
            data-test-id="cartValue"
            type="number"
            startAdornment={<InputAdornment position="start">€</InputAdornment>}
            value={cartValue}
            label="Cart value"
            onChange={(event) => setCartValue(parseFloat(event.target.value))}
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Delivery distance in meters</InputLabel>
          <OutlinedInput
            data-test-id="deliveryDistance"
            type="number"
            value={deliveryDistance}
            label="Delivery distance in meters"
            onChange={(event) =>
              setDeliveryDistance(parseInt(event.target.value))
            }
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Number of items</InputLabel>
          <OutlinedInput
            data-test-id="numberOfItems"
            type="number"
            value={items}
            label="Number of items"
            onChange={(event) => setItems(parseInt(event.target.value))}
          />
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            data-test-id="orderTime"
            sx={{ width: "100%" }}
            label="Order time"
            value={pickerDateTime}
            onChange={(newDateTime) => setPickerDateTime(newDateTime)}
          />
        </LocalizationProvider>

        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "#00c2e8",
          }}
          size="small"
          onClick={handleDeliveryFee}
        >
          Calculate delivery price
        </Button>
        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "#00c2e8",
          }}
          size="small"
          onClick={handleClearCalculator}
        >
          Clear Calculator
        </Button>
        <Typography textAlign="center">
          Delivery price:
          <Typography data-test-id="fee" display={"inline-block"} mx={1}>
            {finalDeliveryFeePrice}€
          </Typography>
        </Typography>
      </Stack>
    </Box>
  );
}

export default App;
