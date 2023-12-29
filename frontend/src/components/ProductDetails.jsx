import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { productFetch } from "../features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, calcCartTotalQuantity } from "../features/cartSlice";
import Slideshow from "./SlideShow";

const ProductDetails = () => {
  const { category, id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct } = useSelector((state) => state.products);

  const handleAddToCart = (prod) => {
    dispatch(addToCart(prod));
    dispatch(calcCartTotalQuantity());
  };

  useEffect(() => {
    dispatch(productFetch({ category, id }));
  }, [category, id, dispatch]);

  return (
    <div className="one-product">
      <div className="breadcrumb">
        <Link to="/">Home</Link> &gt; <Link to="/shop-now">Shop-now</Link> &gt;{" "}
        <Link to={`/shop-now/${category}/`}>{category}</Link>&gt;{" "}
        <Link>{selectedProduct.name}</Link>
      </div>

      <div className="desc">
        <div className="left">
          <Slideshow slideImages={selectedProduct.images} />
        </div>
        <div className="middle">
          <h3>{selectedProduct.name}</h3>
          <p>
            <b>Price:</b> ${selectedProduct.price}
          </p>
          <hr />

          <ul>
            {selectedProduct.features?.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>

          <button
            className="add-to-cart"
            onClick={() => handleAddToCart(selectedProduct)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
