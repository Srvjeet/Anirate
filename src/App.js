import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import TopRated from "./components/TopRated";
import Genres from "./components/Genres";
import Genre from "./components/Genre";
import Favourites from "./components/Favourites";
import ReviewPage from "./components/ReviewPage";
import SearchBar from "./components/SearchBar";
import SearchPage from "./components/SearchPage";
import Settings from "./components/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route path="/Home" Component={Home} />
        <Route path="/Login" Component={Login} />
        <Route path="/Register" Component={Register} />
        <Route path="/toprated" Component={TopRated} />
        <Route path="/Genres" Component={Genres} />
        <Route path="/Genre" Component={Genre} />
        <Route path="/Favourites" Component={Favourites} />
        <Route path="/ReviewPage" Component={ReviewPage} />
        <Route path="/SearchBar" Component={SearchBar} />
        <Route path="/SearchPage" Component={SearchPage} />
        <Route path="/Settings" Component={Settings} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
