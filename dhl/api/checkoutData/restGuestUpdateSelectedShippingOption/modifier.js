export default function restGuestUpdateSelectedShippingOptionModifier(result) {
  if (result?.message && result?.trace) {
    throw new Error(result.message);
  }
  return result;
}
