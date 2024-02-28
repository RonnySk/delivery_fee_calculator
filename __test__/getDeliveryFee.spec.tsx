import dayjs from "dayjs";
import { getDeliveryFee } from "../src/helpers/getDeliveryFee";

describe("Delivery fee function", () => {
  test("should return 0 if cart value >= 200", () => {
    const feeValues = {
      cartValue: 250,
      deliveryDistance: 1500,
      items: 5,
      pickerDateTime: dayjs("2024-01-27T15:30"),
    };
    expect(getDeliveryFee(feeValues)).toEqual(0);
  });

  test("should return the difference between the cart value and 10", () => {
    const feeValues = {
      cartValue: 8,
      deliveryDistance: 1500,
      items: 5,
      pickerDateTime: dayjs("2024-01-27T15:30"),
    };
    expect(getDeliveryFee(feeValues)).toEqual(5.5);
  });

  test("should return 2 if the delivery distance is <= 1000 meters and add 1 to each more 500 meters", () => {
    const feeValues = {
      cartValue: 10,
      deliveryDistance: 2501,
      items: 4,
      pickerDateTime: dayjs("2024-01-27T15:30"),
    };
    expect(getDeliveryFee(feeValues)).toEqual(6);
  });

  test("should return 0,50 for each extra item above 4 items", () => {
    const feeValues = {
      cartValue: 120,
      deliveryDistance: 800,
      items: 6,
      pickerDateTime: dayjs("2024-01-27T15:30"),
    };
    expect(getDeliveryFee(feeValues)).toEqual(3);
  });

  test("should return 1.2 extra fee if have more than 12 items", () => {
    const feeValues = {
      cartValue: 189,
      deliveryDistance: 3546,
      items: 13,
      pickerDateTime: dayjs("2024-01-27T15:30"),
    };
    expect(getDeliveryFee(feeValues)).toEqual(13.7);
  });

  test("should return the delivery value multiply by 1.2 if is rush hour, Friday between 3pm and 7pm.", () => {
    const feeValues = {
      cartValue: 6.54,
      deliveryDistance: 1001,
      items: 4,
      pickerDateTime: dayjs("2024-01-26T15:30"),
    };
    expect(getDeliveryFee(feeValues)).toEqual(7.75);
  });

  test("should return 15 as the maximum delivery fee.", () => {
    const feeValues = {
      cartValue: 180,
      deliveryDistance: 4187,
      items: 15,
      pickerDateTime: dayjs("2024-01-26T15:30"),
    };
    expect(getDeliveryFee(feeValues)).toEqual(15);
  });
});
