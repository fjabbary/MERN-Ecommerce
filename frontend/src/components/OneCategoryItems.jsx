import { Link, useParams } from "react-router-dom";
import { useGetAllProductsQuery } from "../features/productsApi";
import ProductCard from "./ProductCard";

const OneCategoryItems = () => {
  const { category } = useParams();
  const { data } = useGetAllProductsQuery();

  const foundEl = data?.find((el) => el.title === category);

  const styleContainer = {
    margin: "40px auto",
    width: "80%",
  };

  return (
    <div style={styleContainer}>
      <div className="breadcrumb">
        <Link to="/">Home</Link> &gt; <Link to="/shop-now">Shop-now</Link> &gt;{" "}
        <Link to={`/shop-now/${category}`}>{category}</Link>
      </div>
      <h1 style={{ textAlign: "center" }}>{category}</h1>
      <div className="product-container">
        {foundEl?.items.map((item) => (
          <ProductCard key={item.id} item={item} category={category} />
        ))}
      </div>
    </div>
  );
};

export default OneCategoryItems;
