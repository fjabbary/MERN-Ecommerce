import { useGetAllProductsQuery } from "../features/productsApi";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

const Home = () => {
  const { products } = useSelector((state) => state.products);

  const productsData = [...products];

  const categories = productsData.map((item) => item.category);
  const uniqueCategories = [...new Set(categories)];

  return (
    <div className="all-categories-container">
      {uniqueCategories.map((category, index) => (
        <div key={index}>
          <Link to={`/shop-now/${category}`}>
            <h2 className="product-header">{category}</h2>
          </Link>
          <div className="all-categories">
            {productsData.map((item, index) =>
              item.category === category && index % 3 !== 0 ? (
                <ProductCard item={item} key={item._id} />
              ) : null
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
