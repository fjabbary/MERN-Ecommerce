import { useEffect } from "react";

const CheckoutSuccess = () => {
  useEffect(() => {
    localStorage.removeItem("cartItems");
  }, []);

  return <div>CheckoutSuccess</div>;
};

export default CheckoutSuccess;
