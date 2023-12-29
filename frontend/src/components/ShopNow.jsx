import { useGetAllProductsQuery } from "../features/productsApi";
import { addToCart, calcCartTotalQuantity } from "../features/cartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const Home = () => {
  const { data, isError, isLoading } = useGetAllProductsQuery();

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(calcCartTotalQuantity());
  };

  return (
    <div className="all-categories-container">
      {data?.map((category, index) => {
        return (
          <div key={index}>
            <Link to={`/shop-now/${category.title}`}>
              <h2 className="product-header">{category.title}</h2>
            </Link>
            <div className="all-categories">
              {category.items.slice(0, 4).map((item) => (
                <ProductCard
                  item={item}
                  key={item.id}
                  category={category.title}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
