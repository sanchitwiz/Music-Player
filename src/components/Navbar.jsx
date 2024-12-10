import React, { useState } from 'react';

const Navbar = ({ setSearch }) => {
  const [keyword, setKeyword] = useState("");

  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Music Player
        </a>
        <div className="collapse navbar-collapse d-flex justify-content-center " id="navbarSupportedContent">
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            className="form-control me-2 w-75 "
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            onClick={() => setSearch(keyword)}
            className="btn btn-outline-success"
            type="submit"
          >
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;