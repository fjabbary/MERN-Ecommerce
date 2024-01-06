import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { advancedSearchProducts } from "../features/searchSlice";
import { useNavigate } from "react-router-dom";

const AdavncedSearch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories } = useSelector((state) => state.categories);
  const categoriesArr = categories.map((item) => item.title);

  const [searchCriteria, setSearchCriteria] = useState({
    minPrice: 0,
    maxPrice: 0,
    category: "",
  });

  const handleChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(advancedSearchProducts(searchCriteria));
    navigate("/search-result");
  };

  const { minPrice, maxPrice, category } = searchCriteria;

  return (
    <form className="adv-search-dropdown" onSubmit={handleSubmit}>
      <h3>Search Criteria:</h3>

      <br />
      <div>
        <label>Min Price($): {minPrice}</label>
        <br />
        <input
          type="range"
          min="0"
          max="100"
          name="minPrice"
          value={minPrice}
          onChange={handleChange}
        />
      </div>
      <br />
      <br />

      <div>
        <label>Max Price($): {maxPrice}</label>
        <br />
        <input
          type="range"
          min="0"
          max="350"
          name="maxPrice"
          value={maxPrice}
          onChange={handleChange}
        />
      </div>

      <label id="category-select-label">Category:</label>
      <select
        name="category"
        id="category-select"
        onChange={handleChange}
        value={category}
      >
        <option value="">Select a category</option>
        {categoriesArr.map((category, index) => (
          <option value={category} key={index}>
            {category}
          </option>
        ))}
      </select>

      <button
        className="checkout-btn"
        disabled={!minPrice || !maxPrice || !category}
      >
        {" "}
        Serach
      </button>
    </form>
  );
};

export default AdavncedSearch;
