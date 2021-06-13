import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

import { getProductDetails } from "../../modules/productDetailModule";
import { addItemToCart } from "../../modules/cartModule";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, product } = useSelector((state) => state.productDetails);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id]);

  const decreaseQty = () => {
    const count = document.querySelector(".count");
    const qty = count.valueAsNumber - 1;
    if (count.valueAsNumber <= 1) return;
    setQuantity(qty);
  };

  const increaseQty = () => {
    const count = document.querySelector(".count");
    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const addToCart = () => {
    dispatch(addItemToCart(match.params.id, quantity));
    alert("Item added to cart!");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={product.name} />
          <div className="itemDetailContainer">
            <div>
              {product.images && (
                <img
                  src={product.images[0].url}
                  alt="sdf"
                  height="500"
                  width="500"
                />
              )}
            </div>

            <div>
              <h3>{product.name}</h3>
              <p className="itemid">Product # {product._id} </p>

              <hr />

              <p className="itemprice">${product.price}</p>
              <div className="qtyWrap">
                <span className="removebtn" onClick={decreaseQty}>
                  -
                </span>

                <input
                  type="number"
                  className="qtynumber count"
                  value={quantity}
                  readOnly
                />

                <span className="addbtn" onClick={increaseQty}>
                  +
                </span>
              </div>
              <button type="button" className="cartbtn" onClick={addToCart}>
                Add to Cart
              </button>

              <hr />

              <h5 className="mt-2">Description:</h5>
              <p>{product.description}</p>
              <hr />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
