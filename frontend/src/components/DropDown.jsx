import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DropDown = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <div className="dropdown">
      {cartItems.length === 0 ? (
        <p className="no-cart-item">No item in the cart!</p>
      ) : (
        cartItems.map((item) => (
          <div key={item._id}>
            <div className="dropItem">
              <div>
                <img src={item.imageUrl} alt={item.name} />
              </div>
              <div>
                <p>{item.name}</p>
                <p>
                  {item.quantity} &times; ${item.price}
                </p>
              </div>
            </div>
          </div>
        ))
      )}

      <hr />
      <div style={{ padding: "15px 0", fontWeight: "bold" }}>
        Total: $
        {cartItems.reduce(
          (total, item) => total + item.quantity * item.price,
          0
        )}{" "}
      </div>
      <Link to="/cart">
        <button className="checkout-btn">Go To Checkout</button>
      </Link>
    </div>
  );
};

export default DropDown;
