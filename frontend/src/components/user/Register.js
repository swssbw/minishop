import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MetaData from "../layout/MetaData";

import { register } from "../../actions/userActions";

const Register = ({ history }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const dispatch = useDispatch();

  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [dispatch, isAuthenticated, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <MetaData title={"Register User"} />
      <div className="loginContainer">
        <div className="">
          <form className="" onSubmit={submitHandler}>
            <h1 className="">Register</h1>

            <div className="form-group">
              <label htmlFor="email_field">Name</label>
              <input
                type="name"
                className="form-control"
                name="name"
                value={name}
                onChange={onChange}
                autoComplete="on"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={onChange}
                autoComplete="on"
              />
            </div>

            <button
              id="register_button"
              type="submit"
              className="loginbtn"
              disabled={loading ? true : false}
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
