import React from "react";
import { useGetAllProductsQuery } from "../features/productsApi";
import { addToCart, calcCartTotalQuantity } from "../features/cartSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const { data, isError, isLoading } = useGetAllProductsQuery();
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(calcCartTotalQuantity());
  };

  return (
    <div className="home-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>An error occured</p>
      ) : (
        <>
          <h2>New Arrivals</h2>
          <div className="products">
            {data?.map((product) => (
              <div className="product" key={product.id}>
                <h3>{product.name}</h3>
                <div className="product-img">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="detail">
                  <span>{product.desc} </span>
                  <span>Price: ${product.price}</span>
                </div>
                <button onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
