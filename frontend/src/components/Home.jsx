import { useSelector } from "react-redux";
import CategoryCard from "./CategoryCard";
import { Link } from "react-router-dom";

const Home = () => {
  const { categories } = useSelector((state) => state.categories);

  return (
    <Link to="/shop-now">
      <div className="categories-container">
        {categories.map((category, idx) => (
          <CategoryCard key={idx} category={category} />
        ))}
      </div>
    </Link>
  );
};

export default Home;
