import useCartContext from '../../../../hook/useCartContext';
import { isCartAddressValid } from '../../../../utils/address';

export default function useDhlDeliveryCartContext() {
  const { cart, setShippingMethod } = useCartContext();

  const {
    shipping_address: shippingAddress,
    selected_shipping_method: selectedShippingMethod = {},
  } = cart || {};
  const isCartShippingAddressValid = isCartAddressValid(shippingAddress);

  return {
    setShippingMethod,
    selectedShippingMethod,
    isCartShippingAddressValid,
  };
}
