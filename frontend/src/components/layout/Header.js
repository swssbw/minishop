import React from "react";
import Search from "./Search";
import { Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../modules/userModule";

const Header = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    alert("Good Bye!");
  };

  return (
    <>
      <nav className="navflexWrap">
        <div className="">
          <Link to="/" className="navbar-brand">
            <img src="./images/logo.png" alt="logo" />
          </Link>
        </div>

        <div className="searchflexWrap">
          <Route render={({ history }) => <Search history={history} />} />

          <div className="text-center navmenuWrap">
            <Link
              to="/cart"
              className="btn"
              id="login_btn"
              style={{ textDecoration: "none" }}
            >
              <span id="cart" className="ml-3">
                Cart
              </span>
              <span className="" id="cart_count">
                ({cartItems.length})
              </span>
            </Link>

            {user ? (
              <div className="dropdown">
                <Link
                  to="/"
                  className="dropdown-toggle mr-4"
                  type="button"
                  id="dropDownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span>{user && user.name}</span>
                </Link>

                <div
                  className="dropdown-menu"
                  aria-labelledby="dropDownMenuButton"
                >
                  {user && user.role === "admin" && (
                    <Link className="dropdown-item" to="/dashboard">
                      Dashboard
                    </Link>
                  )}
                  <Link className="dropdown-item" to="/orders/me">
                    Orders
                  </Link>
                  <Link className="dropdown-item" to="/me">
                    Profile
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="/"
                    onClick={logoutHandler}
                  >
                    Logout
                  </Link>
                </div>
              </div>
            ) : (
              !loading && (
                <Link to="/login" className="btn" id="login_btn">
                  Login
                </Link>
              )
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
