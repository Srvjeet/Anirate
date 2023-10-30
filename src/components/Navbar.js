import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { db, auth } from "../config/firebase-config";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { onAuthStateChanged } from "firebase/auth";
import {
  getDoc,
  doc,
} from "firebase/firestore";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [usid, setUsid]=useState();
  const [user, setUser] = useState({});
  const [isUser, setIsUser] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    const getUser = async ()=>{
      onAuthStateChanged(auth, (user) => {
        if (user) {
            setUsid(user.uid);
        } else {
            console.log("Logged Out");
            return;
        }
        });
        console.log(usid);
        if(usid !==null && usid !==undefined){
          const userRef = doc(db, "users", usid);
          const userSnap = await getDoc(userRef);
          const userdata = userSnap.data();
          setUser(userdata);
          if(user!==undefined && user!= null && user.profile!==""){
            setIsUser(true);
          }
        }
    }
    getUser();
  },[usid])

  const logOut= async () =>{
      try{
          await signOut(auth).then(async ()=>{
            navigate("/");
          })
      }catch(err){
          console.error("Google user error")
          }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="navbar">
      <nav>
        <ul>
          <li className="logo">
            <Link to="/Home">
              A n i r a t e
            </Link>
          </li>
          <div className="navigationbar">
            <li>
              <Link to="/TopRated" className="nav-item-1">Top Rated</Link>
            </li>
            <li>
              <Link to="/Favourites" className="nav-item-2">Favourites</Link>
            </li>
            <li>
              <Link to="/Genres" className="nav-item-3">Genres</Link>
            </li>
            <li>
              <SearchBar />
            </li>
            <li className={`dropdown ${isDropdownOpen ? "open" : ""}`}>
              <button onClick={toggleDropdown} className="user-button">
                {isUser ? <img style={{height: '35px', width: '35px', borderRadius: '50%'}}src={user.Profile}></img> : <FontAwesomeIcon icon={faUserCircle} />}
              </button>
              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  <li className="user-profile-btn">
                    <Link to="/Login">User Profile</Link>
                  </li>
                  <li className="settings-btn">
                    <Link to="/Settings">Settings</Link>
                  </li>
                  <li>
                  <button onClick={logOut} className="logout-btn">Log Out</button>
                  </li>
                </ul>
              )}
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;