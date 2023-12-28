import { useSelector } from "react-redux";
import CategoryCard from "./CategoryCard";
import { Link } from "react-router-dom";

const Home = () => {
  const { categories } = useSelector((state) => state.categories);
  console.log(categories);

  return (
    <Link to="/shop-now">
      <div className="categories-container">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </Link>
  );
};

export default Home;
