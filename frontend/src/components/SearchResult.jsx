import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { useEffect, useRef } from "react";
import {
  closeSearchDropdown,
  sortSearchResult,
  clearSearchResult,
} from "../features/searchSlice";

const SearchResult = () => {
  const dispatch = useDispatch();
  const { results } = useSelector((state) => state.search);
  const selectTagRef = useRef();

  const { minPrice, maxPrice, category } = useSelector(
    (state) => state.search.results
  );

  useEffect(() => {
    dispatch(closeSearchDropdown());

    return () => {
      dispatch(clearSearchResult());
    };
  }, [dispatch]);

  useEffect(() => {
    if (selectTagRef.current) {
      selectTagRef.current.value = 0;
    }
  }, [results.length]);

  const handleSortSearchResult = (e) => {
    dispatch(sortSearchResult(e.target.value));
  };

  return (
    <div>
      {results.length && (
        <div className="sort-dropdown-container">
          <select
            className="sort-dropdown"
            onChange={handleSortSearchResult}
            ref={selectTagRef}
          >
            <option value="0">Sort By:</option>
            <option value="increment">A-Z</option>
            <option value="decrement">Z-A</option>
            <option value="asc-price">Price (Low to High)</option>
            <option value="desc-price">Price (High to Low)</option>
          </select>
        </div>
      )}
      {minPrice && (
        <h2
          style={{
            textAlign: "center",
            marginTop: "40px",
            background: "#ccc",
            padding: "20px",
          }}
        >
          ({results?.length}) Results found between ${minPrice} and ${maxPrice}{" "}
          for {category}
        </h2>
      )}
      <div className="search-result">
        {results?.length === 0 && (
          <h2 className="no-search-result">No results found!</h2>
        )}
        {results?.map((item) => (
          <ProductCard item={item} key={item._id} category={item.category} />
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
