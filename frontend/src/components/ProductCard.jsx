import { Link } from "react-router-dom";
import { removeFromFavorite } from "../features/favoriteSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductCard = ({ item, hasRemoveButton }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  function handleRemoveFromFavorite(productId) {
    const data = { userId: auth._id, productId };
    dispatch(removeFromFavorite(data));
  }

  return (
    <div className="product-card">
      <div className="product-img-container">
        <img src={item.imageUrl} alt={item.name} />
        <div className="product-details">
          <div className="product-name">{item.name}</div>
          <div className="product-price">${item.price}</div>
        </div>
        <Link
          to={`/shop-now/${item.category}/${item._id}`}
          className="btn btn-details"
        >
          View Details
        </Link>
        {hasRemoveButton && (
          <button
            className="remove-from-favorite"
            onClick={() => handleRemoveFromFavorite(item._id)}
          >
            <i className="fa fa-trash"></i> Remove From Favorite
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
