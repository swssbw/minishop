import React from "react";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../actions/cartActions";

import { createOrder } from "../../actions/orderActions";

const Cart = ({ history }) => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const increaseQty = (id, quantity) => {
    const newQty = quantity + 1;
    dispatch(addItemToCart(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 0) return;
    dispatch(addItemToCart(id, newQty));
  };

  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const processToConfirm = () => {
    const order = {
      orderItems: cartItems,
      totalPrice: cartItems
        .reduce((acc, item) => acc + item.quantity * item.price, 0)
        .toFixed(2),
    };
    dispatch(createOrder(order));
    history.push("/order/success");
  };

  return (
    <>
      <MetaData title={"Your cart"} />
      {cartItems.length === 0 ? (
        <h2 className="cart-empty">Your cart is empty.</h2>
      ) : (
        <>
          <h2 className="sectionTitle">
            <b>{cartItems.length} items</b>
          </h2>

          <div className="orderContainer">
            <div className="flexWrap">
              {cartItems.map((item) => (
                <>
                  <hr />
                  <div className="">
                    <div className="itemContainer">
                      <div className="imgContainer">
                        <img
                          src={item.image}
                          alt="items"
                          height="150"
                          width="200"
                        />
                      </div>

                      <Link to={`/products/${item.product}`}>{item.name}</Link>

                      <div className="">
                        <p>$ {item.price}</p>
                      </div>

                      <div className="qtyWrap">
                        <span
                          className="removebtn"
                          onClick={() =>
                            decreaseQty(item.product, item.quantity)
                          }
                        >
                          -
                        </span>
                        <input
                          type="number"
                          className="qtynumber"
                          value={item.quantity}
                          readOnly
                        />

                        <span
                          className="addbtn"
                          onClick={() =>
                            increaseQty(item.product, item.quantity)
                          }
                        >
                          +
                        </span>
                      </div>

                      <i
                        id="delete_cart_item"
                        className="deleteBtn"
                        onClick={() => removeCartItemHandler(item.product)}
                      >
                        {" "}
                        X{" "}
                      </i>
                    </div>
                  </div>
                </>
              ))}
              <hr />
            </div>

            <div className="">
              <hr />
              <div id="order_summary">
                <h5>Order Summary</h5>
                <hr />
                <p>
                  {" "}
                  <span className="">
                    {cartItems.reduce(
                      (acc, item) => acc + Number(item.quantity),
                      0
                    )}{" "}
                    (Units)
                  </span>
                </p>
                <p>
                  Total:{" "}
                  <span className="">
                    $
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </p>

                <hr />
                <button className="confirmBtn" onClick={processToConfirm}>
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
