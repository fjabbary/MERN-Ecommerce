import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { useEffect } from "react";
import { closeSearchDropdown } from "../features/searchSlice";

const SearchResult = () => {
  const dispatch = useDispatch();
  const { results } = useSelector((state) => state.search.results);
  const { minPrice, maxPrice, category } = useSelector(
    (state) => state.search.results
  );
  // const results = results.results;

  useEffect(() => {
    dispatch(closeSearchDropdown());
  }, [dispatch]);

  return (
    <div>
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
        {[...results]
          ?.sort((a, b) => a.price - b.price)
          .map((item) => (
            <ProductCard item={item} key={item._id} category={item.category} />
          ))}
      </div>
    </div>
  );
};

export default SearchResult;
