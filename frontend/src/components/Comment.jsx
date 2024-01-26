import { useDispatch } from "react-redux";
import { useState } from "react";
import { addComment } from "../features/rateSlice";

const Comment = ({ comments, productId, auth }) => {
  const dispatch = useDispatch();

  const [commentObj, setComment] = useState({ headline: "", feedback: "" });
  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment({ ...commentObj, productId: productId, auth }));
    setComment({ headline: "", feedback: "" });
    setMsg("Your comment has been added");
  };

  const handleChange = (e) => {
    setComment({ ...commentObj, [e.target.name]: e.target.value });
  };

  return (
    <div className="comment-container">
      {!auth._id ? (
        <p className="feedback-message">Login to add your feedback</p>
      ) : null}
      {auth._id && (
        <form onSubmit={handleSubmit}>
          <h2>Add your feedback</h2>
          <div className="form-control">
            <label>Add a headline</label>
            <br />
            <input
              type="text"
              onChange={handleChange}
              name="headline"
              value={commentObj.headline}
              required
            />
          </div>

          <div className="form-control">
            <label>Feedback for product</label>
            <br />
            <textarea
              value={commentObj.feedback}
              name="feedback"
              cols="30"
              rows="10"
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button className="comment-btn add-to-cart">Submit</button>
          <h3 className="comment-success">{msg}</h3>
        </form>
      )}

      <div className="comments">
        <h2>Comments ({comments?.length})</h2>
        {comments?.map((comment, index) => (
          <div className="comment" key={index}>
            <p>
              <i className="fa fa-user-tie"></i> {comment.name?.split(" ")[0]}{" "}
              says:
            </p>
            <br />
            <h3>{comment.headline}</h3>
            <p>{comment.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
