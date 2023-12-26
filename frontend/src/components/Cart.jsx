import { useSelector, useDispatch } from "react-redux";
import BackLink from "./BackLink";
import { useEffect } from "react";
import {
  closeCartDropdown,
  clearCart,
  removeCartItem,
} from "../features/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeCartDropdown());
  }, [dispatch]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleRemoveCartItem = (item) => {
    if (window.confirm(`Are you sure you want to remove ${item.name}?`)) {
      dispatch(removeCartItem(item));
    }
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      {cart.cartItems.length === 0 ? (
        // Empty cart
        <div className="cart-empty">
          <p>Your shopping cart is empty!</p>
          <div className="start-shopping">
            <BackLink text="Start Shopping" />
          </div>
        </div>
      ) : (
        // Non-empty cart
        <div className="cart-items-list">
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="product-price">Price</h3>
            <h3 className="product-qty">Quantity</h3>
            <h3 className="product-total">Total</h3>
          </div>

          <div className="cart-items">
            {cart.cartItems?.map((cartItem) => (
              <div className="cart-item" key={cartItem.id}>
                <div className="cart-desc">
                  <div className="cart-image-container">
                    <img src={cartItem.image} alt={cartItem.name} />
                  </div>
                  <div className="details">
                    <p className="title">{cartItem.name}</p>
                    <p>{cartItem.desc}</p>
                    <button
                      className="btn-remove"
                      onClick={() => handleRemoveCartItem(cartItem)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="cart-price">${cartItem.price}</div>
                <div className="cart-qty">
                  <button> - </button>
                  <span>{cartItem.quantity}</span>
                  <button> + </button>
                </div>
                <div className="cart-total">
                  ${cartItem.quantity * cartItem.price}
                </div>
              </div>
            ))}
          </div>

          <div className="row">
            <div className="clear-btn">
              <button onClick={handleClearCart}>Clear Cart</button>
            </div>

            <div className="subtotal-container">
              <div className="subtotal">
                <span>Subtotal</span>
                <strong>$999</strong>
              </div>
              <p className="tax">Taxes and shipping calculated at checkout</p>

              <button className="checkout-btn">Check out</button>
              <div className="start-shopping">
                <BackLink text="Continue Shopping" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
