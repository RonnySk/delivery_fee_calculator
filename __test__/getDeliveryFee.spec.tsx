import dayjs from "dayjs";
import { getDeliveryFee } from "../src/helpers/getDeliveryFee";

describe("Delivery fee function", () => {
  const defaultArgs = {
    cartValue: 250,
    deliveryDistance: 1500,
    items: 5,
    pickerDateTime: dayjs("2024-01-27T15:30"),
  };

  test("should return 0 when the cart value is equal or more than 200", () => {
    // test case 1 = cart value equal or more than 200, delivery fee = 0
    const feeValues1 = {
      ...defaultArgs,
      cartValue: 200,
    };
    const feeValues2 = {
      ...defaultArgs,
      cartValue: 201,
    };

    expect(getDeliveryFee(feeValues1)).toEqual(0);
    expect(getDeliveryFee(feeValues2)).toEqual(0);
  });

  test("The delivery is free (0€) when the cart value is equal or more than 200€.", () => {
    // test case 2 = cart value under 10 euros, add the difference as fee
    const feeValues2 = {
      cartValue: 8,
      deliveryDistance: 1500,
      items: 5,
      pickerDateTime: dayjs("2024-01-27T15:30"),
    };

    // test case 3 = delivery distance until 1000 meters, add 2 euros fee, above 1000 meters add 1 euro each 500 meters
    const feeValues3 = {
      cartValue: 10,
      deliveryDistance: 2501,
      items: 4,
      pickerDateTime: dayjs("2024-01-27T15:30"),
    };

    // test case 4 = more or equal than 5 items add 0,50 to each items
    const feeValues4 = {
      cartValue: 120,
      deliveryDistance: 800,
      items: 6,
      pickerDateTime: dayjs("2024-01-27T15:30"),
    };

    // test case 5 = more than 12 items add extra 1.2 fee
    const feeValues5 = {
      cartValue: 189,
      deliveryDistance: 3546,
      items: 13,
      pickerDateTime: dayjs("2024-01-27T15:30"),
    };

    // test case 6 = rush hour, friday between 3pm and 7pm, multiply the delivery value by 1.2
    const feeValues6 = {
      cartValue: 6.54,
      deliveryDistance: 1001,
      items: 4,
      pickerDateTime: dayjs("2024-01-26T15:30"),
    };

    // test case 6 = max delivery fee 15 euros
    const feeValues7 = {
      cartValue: 180,
      deliveryDistance: 4187,
      items: 15,
      pickerDateTime: dayjs("2024-01-26T15:30"),
    };

    expect(getDeliveryFee(feeValues2)).toEqual(5.5);
    expect(getDeliveryFee(feeValues3)).toEqual(6);
    expect(getDeliveryFee(feeValues4)).toEqual(3);
    expect(getDeliveryFee(feeValues5)).toEqual(13.7);
    expect(getDeliveryFee(feeValues6)).toEqual(7.75);
    expect(getDeliveryFee(feeValues7)).toEqual(15);
  });
});
