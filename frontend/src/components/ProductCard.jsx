import { Link } from "react-router-dom";

const ProductCard = ({ item, category }) => {
  return (
    <div className="product-card">
      <div className="product-img-container">
        <img src={item.imageUrl} alt={item.name} />
        <div className="product-details">
          <div className="product-name">{item.name}</div>
          <div className="product-price">${item.price}</div>
        </div>
        <Link
          to={`/shop-now/${category}/${item.id}`}
          className="btn btn-details"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
