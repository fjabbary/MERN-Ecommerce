import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/authSlice";
import { StyledForm } from "./StyledForm";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loginError } = useSelector((state) => state.auth);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth._id) {
      navigate("/shop-now");
    }
  }, [auth._id, navigate]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(user));
  };

  return (
    <div className="register-form">
      <StyledForm onSubmit={handleFormSubmit}>
        <h2>Login</h2>
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
          <p className="error-msg">{loginError}</p>{" "}
        </small>
        <small>
          <Link className="alert" to="/register">
            Don't have account? Register now!
          </Link>
        </small>
      </StyledForm>
    </div>
  );
};

export default Login;
