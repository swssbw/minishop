import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import { myOrders } from "../../modules/myOrderModule";

const OrderList = () => {
  const dispatch = useDispatch();
  const { loading, orders } = useSelector((state) => state.myOrder);

  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);

  console.log(orders);

  return (
    <>
      <MetaData title={"My Orders"} />
      <h1> My Orders </h1>

      {loading ? <Loader /> : <div>주문목록</div>}
    </>
  );
};

export default OrderList;
