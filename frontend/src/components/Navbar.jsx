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
import { getUser } from "../features/authSlice";
import AdavncedSearch from "./AdavncedSearch";
import { toggleSearchDropdown } from "../features/searchSlice";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [searchErrBorder, setSearchErrBorder] = useState(false);

  const navigate = useNavigate();

  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const cartTotalQty = useSelector((state) => state.cart.cartTotalQty);
  const auth = useSelector((state) => state.auth);
  const { searchDropdownOpen } = useSelector((state) => state.search);

  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleCartDropdown());
  };

  useEffect(() => {
    dispatch(calcCartTotalQuantity());
    if (auth._id) {
      dispatch(getUser(auth._id));
    }
  }, [dispatch, auth._id]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
    toast.warning("Logged out!", { position: "bottom-right" });
  };

  const handleSearch = () => {
    if (query) {
      dispatch(searchProducts(query));
      setSearchErrBorder(false);
      navigate("/search-result");
    }

    if (!query) {
      setSearchErrBorder(true);
    }
  };

  const handleSearchEnter = (e) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };

  return (
    <nav className="navbar-container">
      <div className="nav-bar">
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          <div>
            <Link to="/" className="logo-container">
              <img src="/logo.png" alt="" className="logo" />
            </Link>
          </div>

          <div className="search-container">
            <input
              type="text"
              placeholder="search"
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={handleSearchEnter}
              className={`${searchErrBorder ? "err-msg" : ""} `}
            />
            <i className="fa fa-search" onClick={handleSearch}></i>

            <span
              className="adv-search-text"
              onClick={() => dispatch(toggleSearchDropdown())}
            >
              Advanced Search{" "}
              {searchDropdownOpen ? (
                <i className="fa-solid fa-minus"></i>
              ) : (
                <i className="fa-solid fa-plus"></i>
              )}
            </span>

            {searchDropdownOpen && <AdavncedSearch />}
          </div>
        </div>

        {isCartOpen && <DropDown />}

        <div className="nav-right">
          {auth._id && (
            <Link to="/my-favorites">
              <i className="fa fa-star"></i> My Favorites
            </Link>
          )}
          <Link to="/shop-now">
            {" "}
            <i className="fa fa-store"></i> Shop Now
          </Link>
          {auth._id ? (
            <>
              <Logout onClick={handleLogout}>
                {" "}
                <i className="fa-solid fa-right-from-bracket"></i> Logout{" "}
              </Logout>

              <Link>
                Hello{" "}
                <span className="loggedin-name">
                  {auth.user?.name.split(" ")[0]}
                </span>
              </Link>
            </>
          ) : (
            <AuthLinks>
              <div className="auth-links">
                <Link to="/login">
                  {" "}
                  <i className="fa-solid fa-right-from-bracket"></i> Login{" "}
                </Link>
                <Link to="/register">
                  {" "}
                  <i className="fa-solid fa-user-plus"></i> Sign Up{" "}
                </Link>
              </div>
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
