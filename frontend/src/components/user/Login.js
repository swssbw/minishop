import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

import { Link } from "react-router-dom";
import { login } from "../../modules/userModule";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [dispatch, isAuthenticated, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Login"} />

          <div className="loginContainer">
            <form onSubmit={submitHandler}>
              <h2>Login</h2>
              <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password_field">Password</label>
                <input
                  type="password"
                  id="password_field"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="on"
                />
              </div>

              <button type="submit" className="loginbtn">
                LOGIN
              </button>

              <Link to="/register">New User?</Link>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
