import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getFavorites } from "../features/favoriteSlice";
import ProductCard from "./ProductCard";

const MyFavorites = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  let { favorites } = useSelector((state) => state.favorite);

  useEffect(() => {
    dispatch(getFavorites(auth._id));
  }, [dispatch, auth._id]);

  return (
    <div className="favorite-products">
      {favorites.length > 0 ? (
        favorites?.map((favorite) => (
          <ProductCard
            key={favorite._id}
            item={favorite}
            hasRemoveButton={true}
          />
        ))
      ) : (
        <h2 className="no-favorite">There is no item in your favorites</h2>
      )}
    </div>
  );
};

export default MyFavorites;
