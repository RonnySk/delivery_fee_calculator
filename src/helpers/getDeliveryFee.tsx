import { Dayjs } from "dayjs";

export function getDeliveryFee(feeValues: {
  cartValue: number;
  deliveryDistance: number;
  items: number;
  pickerDateTime: Dayjs | null;
}) {
  let { cartValue, deliveryDistance, items, pickerDateTime } = feeValues;
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
    pickerDateTime?.day() === 5 &&
    pickerDateTime?.hour() >= 15 &&
    pickerDateTime?.hour() <= 19
  ) {
    deliveryFeePrice *= 1.2;
  }

  if (deliveryFeePrice >= 15) {
    deliveryFeePrice = 15;
  }

  return Number(deliveryFeePrice.toFixed(2));
}
