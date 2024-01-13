import { useSelector, useDispatch } from "react-redux";
import BackLink from "./BackLink";
import { useEffect } from "react";
import {
  closeCartDropdown,
  clearCart,
  removeCartItem,
  changeCartItemQuantity,
  calcCartTotalamount,
  calcCartTotalQuantity,
} from "../features/cartSlice";

import { Link } from "react-router-dom";
import PayButton from "./PayButton";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const cartTotalAmount = useSelector((state) => state.cart.cartTotalAmount);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeCartDropdown());
    dispatch(calcCartTotalamount());
    dispatch(calcCartTotalQuantity());
  }, [cart, dispatch]);

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      dispatch(clearCart());
    }
  };

  const handleRemoveCartItem = (item) => {
    if (window.confirm(`Are you sure you want to remove ${item.name}?`)) {
      dispatch(removeCartItem(item));
    }
  };

  const handleChangeQty = (id, direction, name) => {
    dispatch(changeCartItemQuantity({ id, direction, name }));
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
              <div className="cart-item" key={cartItem._id}>
                <div className="cart-desc">
                  <div className="cart-image-container">
                    <img src={cartItem.imageUrl} alt={cartItem.name} />
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
                <div className="cart-price">
                  <h3 className="product-price-mobile">Price:</h3> $
                  {cartItem.price}
                </div>
                <div className="cart-qty">
                  <button
                    onClick={() =>
                      handleChangeQty(cartItem._id, "dec", cartItem.name)
                    }
                    disabled={cartItem.quantity === 1}
                  >
                    {" "}
                    -{" "}
                  </button>
                  <span>{cartItem.quantity}</span>
                  <button
                    onClick={() =>
                      handleChangeQty(cartItem._id, "inc", cartItem.name)
                    }
                  >
                    {" "}
                    +{" "}
                  </button>
                </div>
                <div className="cart-total">
                  <h3 className="product-totalPrice-mobile">Total Price: </h3>$
                  {cartItem.quantity * cartItem.price}
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
                <strong>${cartTotalAmount}</strong>
              </div>
              <p className="tax">Taxes and shipping calculated at checkout</p>

              {auth._id ? (
                <PayButton cartItems={cart.cartItems} />
              ) : (
                <Link to="/login" className="login-btn">
                  <i className="fa fa-lock"></i> Login to checkout
                </Link>
              )}

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
