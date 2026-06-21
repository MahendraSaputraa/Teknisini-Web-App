export const PLATFORM_FEE_RATE = 0.25;
export const TRANSPORT_FEE = 25_000;

export function calculatePlatformFee(servicePrice: number) {
  return Number((servicePrice * PLATFORM_FEE_RATE).toFixed(2));
}

export function calculateOrderSubtotal(servicePrice: number) {
  return servicePrice + calculatePlatformFee(servicePrice);
}

export function calculateOrderGrandTotal(orderSubtotal?: number | null) {
  return (Number(orderSubtotal) || 0) + TRANSPORT_FEE;
}

export function calculateGrandTotalFromServicePrice(servicePrice: number) {
  return calculateOrderGrandTotal(calculateOrderSubtotal(servicePrice));
}
