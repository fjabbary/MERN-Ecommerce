import axios from "axios";
import { useSelector } from "react-redux";
import { url } from "../features/api";

const PayButton = ({ cartItems }) => {
  const { _id } = useSelector((state) => state.auth);

  const handleCheckout = () => {
    axios
      .post(`${url}/stripe/create-checkout-session`, {
        cartItems,
        userId: _id,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((e) => console.log("Error creating checkout session: ", e));
  };

  return (
    <>
      <button className="checkout-btn" onClick={() => handleCheckout()}>
        Check out
      </button>
    </>
  );
};

export default PayButton;
