import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { productFetch, clearSelected } from "../features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, calcCartTotalQuantity } from "../features/cartSlice";
import ImageGallery from "react-image-gallery";

const ProductDetails = () => {
  const { category, id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct } = useSelector((state) => state.products);

  console.log(selectedProduct);

  const handleAddToCart = (prod) => {
    dispatch(addToCart(prod));
    dispatch(calcCartTotalQuantity());
  };

  useEffect(() => {
    dispatch(productFetch({ category, id }));

    return () => {
      dispatch(clearSelected());
    };
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
