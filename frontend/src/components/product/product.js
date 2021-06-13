import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div key={product._id} className="itemWrap">
      <img className="imgWrap" src={product.images[0].url} alt="img" />
      <div>
        <Link className="itemName" to={`/product/${product._id}`}>
          {product.name}
        </Link>

        <p className="itemPrice">$ {product.price}</p>
        <Link to={`/product/${product._id}`} className="itemDetail">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Product;
