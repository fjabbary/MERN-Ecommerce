import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getFavorites } from "../features/favoriteSlice";
import ProductCard from "./ProductCard";

const MyFavorites = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { favorites } = useSelector((state) => state.favorite);

  console.log(favorites);

  useEffect(() => {
    dispatch(getFavorites(auth._id));
  }, [dispatch, auth._id]);

  return (
    <div className="favorite-products">
      {favorites?.map((favorite) => (
        <ProductCard key={favorite._id} item={favorite} />
      ))}
    </div>
  );
};

export default MyFavorites;
