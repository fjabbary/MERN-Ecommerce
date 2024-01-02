import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const SearchResult = () => {
  const { results } = useSelector((state) => state.search.results);

  return (
    <div className="search-result">
      {results?.map((item) => (
        <ProductCard item={item} key={item._id} category={item.category} />
      ))}
    </div>
  );
};

export default SearchResult;
