import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cartSlice";

const CheckoutSuccess = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return <div>CheckoutSuccess</div>;
};

export default CheckoutSuccess;
