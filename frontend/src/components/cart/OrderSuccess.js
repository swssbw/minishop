import React from "react";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";

const OrderSuccess = () => {
  return (
    <>
      <MetaData title={"Order Success"} />

      <h2>Your Order has been placed successfully.</h2>
      <Link to="/orders/me">Go to Orders</Link>
    </>
  );
};

export default OrderSuccess;
