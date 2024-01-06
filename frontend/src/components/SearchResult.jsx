import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { useEffect } from "react";
import { closeSearchDropdown } from "../features/searchSlice";

const SearchResult = () => {
  const dispatch = useDispatch();
  const { results } = useSelector((state) => state.search.results);

  useEffect(() => {
    dispatch(closeSearchDropdown());
  }, [dispatch]);

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        {results?.length} Results found
      </h2>
      <div className="search-result">
        {results?.map((item) => (
          <ProductCard item={item} key={item._id} category={item.category} />
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
