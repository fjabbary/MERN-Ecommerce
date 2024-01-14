import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { productFetch, clearSelected } from "../features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, calcCartTotalQuantity } from "../features/cartSlice";
import ImageGallery from "react-image-gallery";
import { addToFavorite, getFavorites } from "../features/favoriteSlice";
import RateProduct from "./RateProduct";

const ProductDetails = () => {
  const { category, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedProduct } = useSelector((state) => state.products);
  const auth = useSelector((state) => state.auth);

  const handleAddToCart = (prod) => {
    dispatch(addToCart(prod));
    dispatch(calcCartTotalQuantity());
  };

  useEffect(() => {
    dispatch(productFetch(id));
    return () => {
      dispatch(clearSelected());
    };
  }, [category, id, dispatch]);

  useEffect(() => {
    document.title = selectedProduct.name;

    return () => {
      document.title = "Online Shop";
    };
  }, [selectedProduct.name]);

  const handleAddtoFavorite = (selectedProduct) => {
    const data = { userId: auth._id, favoriteProduct: selectedProduct };
    dispatch(addToFavorite(data));
  };

  return (
    <div className="one-product">
      <div className="breadcrumb">
        <Link to="/">Home</Link> &gt; <Link to="/shop-now">Shop-now</Link> &gt;{" "}
        <Link to={`/shop-now/${category}/`}>{category}</Link>&gt;{" "}
        <Link>{selectedProduct.name}</Link>
      </div>

      <div className="desc">
        <div className="left">
          {selectedProduct.images?.length > 0 ? (
            <ImageGallery items={selectedProduct.images} />
          ) : (
            <div className="text-container">
              <h2>Sorry no image is available!</h2>
            </div>
          )}
        </div>
        <div className="right">
          <h3>{selectedProduct.name}</h3>

          <hr />

          <ul>
            {selectedProduct.features?.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>

          <h3>
            <b>Price:</b> ${selectedProduct.price}
          </h3>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              className="add-to-cart"
              onClick={() => handleAddToCart(selectedProduct)}
            >
              Add to Cart
            </button>
            {auth._id ? (
              <button
                className="add-to-favorite"
                onClick={() => handleAddtoFavorite(selectedProduct)}
              >
                <i className="fa fa-plus"></i> Add to Favorite
              </button>
            ) : (
              <button
                className="add-to-favorite"
                onClick={() => navigate("/login")}
              >
                Login to add to favorite
              </button>
            )}
          </div>

          <RateProduct product={selectedProduct} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
