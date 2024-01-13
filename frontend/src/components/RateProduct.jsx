import { useState } from "react";

const RateProduct = () => {
  const [likeClicked, setLikeClicked] = useState(false);
  const [disLikeClicked, setDislikeClicked] = useState(false);

  const percentage = ((18 / 36) * 100).toFixed(1);
  const percentageWdith = ((18 / 36) * 100 * 2.3).toFixed(1);

  function handleLike() {
    setLikeClicked(!likeClicked);
  }

  function handleDislike() {
    setDislikeClicked(!disLikeClicked);
  }

  return (
    <>
      <div className="rate-product">
        <button
          className={likeClicked ? "btn btn-liked" : "btn"}
          onClick={handleLike}
        >
          <i className="fa fa-thumbs-up" aria-hidden="true"></i> (18)
        </button>

        <button
          className={disLikeClicked ? "btn btn-disliked" : "btn"}
          onClick={handleDislike}
        >
          <i className="fa fa-thumbs-down" aria-hidden="true"></i> (18)
        </button>
      </div>
      <div className="rate-number">{percentage}%</div>
      <div className="full-scale">
        <div
          className="empty-scale"
          style={{
            backgroundColor: "rgb(110, 34, 182)",
            width: percentageWdith + "px",
            height: "5px",
          }}
        ></div>
      </div>
    </>
  );
};

export default RateProduct;
