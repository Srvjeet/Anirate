import "./Card.css";
import { React, useEffect, useState } from "react";
import { db } from "../config/firebase-config";
import { getDocs, collection } from "firebase/firestore";


function Card() {
  const [movieList, setMovieList] = useState([]);
  const movieCollectionRef = collection(db, "featured");

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const data = await getDocs(movieCollectionRef);
        const filtereddata = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(filtereddata);
        setMovieList(filtereddata);
      } catch (err) {
        console.error("Data fetch error");
      }
    };
    getMovieList();
  },[]);

  return (
    <div className="card">
      <div>
        {movieList.map((movie) => (
          <div>
            <img src={movie.image_h} alt="error loading" className="card-img"/>
            <div className="card-title">{movie.Title}</div>
            <div className="director-style">{movie.Author}</div>
            <div className="stars"> {movie.Stars}</div>
            <div className="stars"> {movie.Stars}</div>
            <div className="stars"> {movie.Stars}</div>
            <div className="stars"> {movie.Stars}</div>
            <div className="stars"> {movie.Stars}</div>

            <div className="description-style">{movie.Description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Card;
