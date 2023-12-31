import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const SearchResult = () => {
  const { results } = useSelector((state) => state.search.results);
  console.log(results);
  return (
    <div className="search-result">
      {results?.map((item) => (
        <ProductCard item={item} />
      ))}
    </div>
  );
};

export default SearchResult;
