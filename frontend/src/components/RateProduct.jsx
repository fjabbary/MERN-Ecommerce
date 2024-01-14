import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { rateLike, rateDislike } from "../features/rateSlice";
import { useSelector } from "react-redux";

const RateProduct = ({ product }) => {
  const dispatch = useDispatch();
  const [productIds, setProductIds] = useState(function () {
    return localStorage.getItem("product_ids")
      ? JSON.parse(localStorage.getItem("product_ids"))
      : [];
  });

  const fullBarRef = useRef(null);

  const [likeClicked, setLikeClicked] = useState(false);
  const [disLikeClicked, setDislikeClicked] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const { _id, likeCount, dislikeCount } = product;

  let percentageWidth;
  const percentage = ((likeCount / (likeCount + dislikeCount)) * 100).toFixed(
    1
  );
  const fullBarWidth = fullBarRef.current?.offsetWidth;
  percentageWidth = (
    (likeCount / (likeCount + dislikeCount)) *
    fullBarWidth
  ).toFixed(1);

  useEffect(() => {
    localStorage.setItem("product_ids", JSON.stringify(productIds));
  }, [productIds]);

  useEffect(() => {
    const productsId = JSON.parse(localStorage.getItem("product_ids"));

    if (productsId.find((item) => item === _id)) {
      setButtonPressed(true);
    } else {
      setButtonPressed(false);
    }
  }, [_id]);

  function handleLike() {
    setLikeClicked(!likeClicked);
    setDislikeClicked(false);
    dispatch(rateLike(_id));

    setProductIds([...productIds, _id]);
    setButtonPressed(true);
  }

  function handleDislike() {
    setDislikeClicked(!disLikeClicked);
    setLikeClicked(false);
    dispatch(rateDislike(_id));
    setProductIds([...productIds, _id]);
    setButtonPressed(true);
  }

  return (
    <div className="product-rate-container">
      <div className="rate-product">
        <button
          disabled={buttonPressed}
          className={likeClicked ? "btn btn-liked" : "btn"}
          onClick={handleLike}
        >
          <i className="fa fa-thumbs-up" aria-hidden="true"></i> ({likeCount})
        </button>

        <button
          disabled={buttonPressed}
          className={disLikeClicked ? "btn btn-disliked" : "btn"}
          onClick={handleDislike}
        >
          <i className="fa fa-thumbs-down" aria-hidden="true"></i> (
          {dislikeCount})
        </button>
      </div>
      <div className="full-scale" ref={fullBarRef}>
        <div
          className="empty-scale"
          style={{
            backgroundColor: "rgb(110, 34, 182)",
            width: percentageWidth + "px",
            height: "5px",
          }}
        ></div>
        <div className="rate-number hide-tablet">
          {isNaN(percentage) ? 0 : percentage}%
        </div>
      </div>
      <div className="rate-number show-tablet">
        {isNaN(percentage) ? 0 : percentage}%
      </div>
    </div>
  );
};

export default RateProduct;
