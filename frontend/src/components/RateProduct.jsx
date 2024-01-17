import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { rateLike, rateDislike } from "../features/rateSlice";
import { useSelector } from "react-redux";

const RateProduct = ({ product }) => {
  const dispatch = useDispatch();
  const likes = useSelector((state) => state.rate.likes);
  const dislikes = useSelector((state) => state.rate.dislikes);

  const fullBarRef = useRef(null);

  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikeClicked, setDislikeClicked] = useState(false);

  const [likeCountPress, setLikeCountPress] = useState(0);
  const [dislikeCountPress, setDislikeCountPress] = useState(0);

  const [disableLike, setDisableLike] = useState(false);
  const [disableDislike, setDisableDislike] = useState(false);

  const [productIds, setProductIds] = useState(function () {
    return localStorage.getItem("product_ids")
      ? JSON.parse(localStorage.getItem("product_ids"))
      : [];
  });

  const [alreadyRatedMessage, setAlreadyRatedMessage] = useState(false);

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
    if (likeClicked) {
      dispatch(rateLike({ _id, direction: "inc" }));
      setDisableDislike(true);
      setProductIds([...productIds, _id]);
    }

    if (!likeClicked && likeCountPress > 0) {
      dispatch(rateLike({ _id, direction: "dec" }));
      setDisableDislike(false);
      setProductIds(productIds.filter((i) => i !== _id));
    }
  }, [likeClicked]);

  useEffect(() => {
    if (dislikeClicked) {
      dispatch(rateDislike({ _id, direction: "inc" }));
      setDisableLike(true);
      setProductIds([...productIds, _id]);
    }

    if (!dislikeClicked && dislikeCountPress > 0) {
      dispatch(rateDislike({ _id, direction: "dec" }));
      setDisableLike(false);
      setProductIds(productIds.filter((i) => i !== _id));
    }
  }, [dislikeClicked]);

  useEffect(() => {
    return () => {
      localStorage.setItem("product_ids", JSON.stringify(productIds));
    };
  });

  useEffect(() => {
    const allRatedIds = JSON.parse(localStorage.getItem("product_ids"));
    let ratedProductId;
    if (_id) {
      ratedProductId = allRatedIds?.find((id) => id === _id);
    }

    if (ratedProductId) {
      setAlreadyRatedMessage(true);
    }
  }, [_id]);

  function handleLike() {
    setLikeClicked(!likeClicked);
    setLikeCountPress((c) => c + 1);
  }

  function handleDislike() {
    setDislikeClicked(!dislikeClicked);
    setDislikeCountPress((c) => c + 1);
  }

  return (
    <>
      <div className="product-rate-container">
        <div className="rate-product">
          <button
            style={{ pointerEvents: alreadyRatedMessage ? "none" : "all" }}
            className={likeClicked ? "btn btn-liked" : "btn"}
            onClick={handleLike}
            disabled={disableLike}
          >
            <i className="fa fa-thumbs-up" aria-hidden="true"></i> (
            {likes || likeCount})
          </button>

          <button
            style={{ pointerEvents: alreadyRatedMessage ? "none" : "all" }}
            className={dislikeClicked ? "btn btn-disliked" : "btn"}
            onClick={handleDislike}
            disabled={disableDislike}
          >
            <i className="fa fa-thumbs-down" aria-hidden="true"></i> (
            {dislikes || dislikeCount})
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
      {alreadyRatedMessage && (
        <p style={{ color: "red" }}>
          <small>You already rated this product</small>
        </p>
      )}
    </>
  );
};

export default RateProduct;
