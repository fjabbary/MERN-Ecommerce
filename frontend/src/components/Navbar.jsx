import { Link } from "react-router-dom";
import DropDown from "./DropDown";
import { useSelector, useDispatch } from "react-redux";
import { toggleCartDropdown } from "../features/cartSlice";
import { useEffect } from "react";
import { calcCartTotalQuantity } from "../features/cartSlice";
import styled from "styled-components";
import { logoutUser } from "../features/authSlice";
import { toast } from "react-toastify";
import { searchProducts } from "../features/searchSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const cartTotalQty = useSelector((state) => state.cart.cartTotalQty);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleCartDropdown());
  };

  useEffect(() => {
    dispatch(calcCartTotalQuantity());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.warning("Logged out!", { position: "bottom-right" });
  };

  const handleSearch = () => {
    dispatch(searchProducts(query));
    navigate("/search-result");
  };

  const handleSearchEnter = (e) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };

  return (
    <nav className="navbar-container">
      <div className="nav-bar">
        <Link to="/">
          <img src="/logo.png" alt="" className="logo" />
        </Link>

        <div className="search-container">
          <input
            type="text"
            placeholder="search"
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={handleSearchEnter}
          />
          <i className="fa fa-search" onClick={handleSearch}></i>
        </div>

        {isCartOpen && <DropDown />}

        <div className="nav-right">
          <Link to="/shop-now">Shop Now</Link>
          {auth._id ? (
            <Logout onClick={handleLogout}> Logout </Logout>
          ) : (
            <AuthLinks>
              <Link to="/login"> Login </Link>
              <Link to="/register"> Register </Link>
            </AuthLinks>
          )}
          <div className="nav-bag" onClick={handleToggle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              className="bi bi-cart3"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg>

            <span className="bag-quantity">
              <span>{cartTotalQty}</span>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const Logout = styled.div`
  color: #fff;
  cursor: pointer;
  margin-right: 2rem;
`;

const AuthLinks = styled.div`
  a {
    &:last-child {
      margin-right: 2rem;
    }
  }
`;
