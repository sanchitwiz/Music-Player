import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';


const App = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [search, setSearch] = useState("");

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  return (
    <div>
      {/* Pass setSearchKeyword to Navbar */}
      <Navbar setSearch={handleSearch} />
      {/* Pass searchKeyword to Hero */}
      <Hero searchKeyword={searchKeyword} />
    </div>
  );
};

export default App;