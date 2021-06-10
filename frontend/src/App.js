import { useEffect } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { loadUser } from "./modules/userModule";
import store from "./store";
import Profile from "./components/user/Profile";
import Cart from "./components/cart/Cart";
import OrderSuccess from "./components/cart/OrderSuccess";
import "../src/components/scss/main.scss";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <div className="App">
        <Header></Header>
        <div
          className="page"
          style={{ minHeight: "500px", maxWidth: "1000px", margin: "0 auto" }}
        >
          <Route path="/" component={Home} exact />
          <Route path="/search/:keyword" component={Home} />
          <Route path="/product/:id" component={ProductDetails} exact />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/me" component={Profile} />
          <Route path="/cart" component={Cart} exact />
          <Route path="/order/success" component={OrderSuccess} exact />
        </div>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
