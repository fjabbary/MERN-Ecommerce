import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/authSlice";
import { StyledForm } from "./StyledForm";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { registerError } = useSelector((state) => state.auth);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth._id) {
      navigate("/");
    }
  }, [auth._id, navigate]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleFormChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(user));
  };

  return (
    <div className="register-form">
      <StyledForm onSubmit={handleFormSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleFormChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleFormChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleFormChange}
        />
        <button>Register</button>
        <small>
          <p className="error-msg">{registerError}</p>{" "}
        </small>
      </StyledForm>
    </div>
  );
};

export default Register;
