import React, { useEffect, useState } from "react";
import MetaData from "./layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../modules/productModule";
import Product from "./product/product";
import Loader from "./layout/Loader";
import Pagination from "react-js-pagination";

const Home = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");

  // 직접 카테고리 목록 정해줌
  const categories = ["Top", "Bottom", "Accessories", "Dress", "SET"];

  const { loading, products, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  const keyword = match.params.keyword;

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    dispatch(getProducts(keyword, currentPage, category));
  }, [dispatch, currentPage, keyword, category]);

  let count = products.length;

  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <>
          <MetaData title={"Buy Best Products"} />

          <div className="sectionTitle">
            <ul className="categories">
              {categories.map((category) => (
                <li
                  style={{ cursor: "pointer", listStyle: "none" }}
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>

          <section>
            <div className="productWrapper">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>

          {resPerPage <= count && (
            <div className="pagination">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={">"}
                prevPageText={"<"}
                firstPageText={"<<"}
                lastPageText={">>"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
