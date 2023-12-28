import React from "react";
import { useGetAllProductsQuery } from "../features/productsApi";
import { addToCart, calcCartTotalQuantity } from "../features/cartSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const { data, isError, isLoading } = useGetAllProductsQuery();
  console.log(data);

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(calcCartTotalQuantity());
  };

  return (
    <div className="all-categories-container">
      {data?.map((category, index) => {
        return (
          <div key={index}>
            <h2 className="product-header">{category.title}</h2>
            <div className="all-categories">
              {category.items.map((item) => (
                <div key={item.id} className="product-card">
                  <div className="product-img-container">
                    <img src={item.imageUrl} alt={item.name} />
                    <div className="product-details">
                      <div className="product-name">{item.name}</div>
                      <div className="product-price">${item.price}</div>
                    </div>
                    <button className="btn btn-details">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
