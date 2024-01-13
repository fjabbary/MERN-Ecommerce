import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cartSlice";
import BackLink from "./BackLink";

const CheckoutSuccess = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="checkout-success">
      <h2>
        <i className="fa fa-check"></i>{" "}
        <span>Successfully checked out the items</span>
      </h2>
    </div>
  );
};

export default CheckoutSuccess;
