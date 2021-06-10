import React, { useState } from "react";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <>
      <form onSubmit={searchHandler}>
        <div className="input-group search">
          <input
            type="text"
            id="searchbox"
            className=""
            placeholder="Enter Product Name ..."
            onChange={(e) => setKeyword(e.target.value)}
          />

          <button id="" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </form>
    </>
  );
};

export default Search;
