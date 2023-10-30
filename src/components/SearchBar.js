
import React , {useState} from 'react';
import './SearchBar.css';
import { Link } from "react-router-dom";
import searchImage from '../search.png';

function SearchBar() {
  const [searchKey, setSearchKey]=useState('');
  return (
    <div className="search-bar">
      <input type="text" onChange={(e)=>setSearchKey(e.target.value)} placeholder="Search..." />
      <Link to='/SearchPage' state={{key: searchKey}}><img src={searchImage} alt="Search" className='search-button'/></Link>
    </div>
  );
}

export default SearchBar;