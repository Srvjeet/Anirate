import { React, useEffect, useState } from "react";
import "./TopRated.css";
import Navbar from "./Navbar";
import Rating from "./Rating";
import { db } from "../config/firebase-config";
import { Link } from "react-router-dom";
import {
  getDocs,
  collection,
  orderBy,
  limit,
  query,
  where,
} from "firebase/firestore";

export default function TopRated() {
  const [movieList, setMovieList] = useState([]);
  const topMovies = collection(db, "movies");
  useEffect(() => {
    const queryfunction = async () => {
      const q = await query(
        topMovies,
        orderBy("Stars", "desc"),
        where("Stars", ">", 3.5),
        limit(5)
      );
      const data = await getDocs(q);
      const filtereddata = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filtereddata);
    };
    queryfunction();
  },[]);
  return (
    <div>
      <Navbar />
      <div className="toprated-card">
        <div>
          {movieList.map((movie) => (
            <div className="item">
              <Link to="/ReviewPage" state={{ kuwashikoto: {
              id: movie.id
            } }}><img src={movie.image_v} alt="error loading" className="images" /></Link>
              <span className="movie-title">{movie.Title}</span>
              {/*<span className="author-name">{movie.Author}</span>*/}
              <span><Rating Rating={movie.Stars}/></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
