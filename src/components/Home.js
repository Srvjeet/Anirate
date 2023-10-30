import './Home.css'
import Card from "../UI/Card";
import Navbar from "./Navbar";
import { useEffect, useState, React } from "react";
import { db } from "../config/firebase-config";
import { getDocs, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import Rating from "./Rating";


function Home() {
  const [movieList, setMovieList] = useState([]);
  const movieCollectionRef = collection(db, "movies");

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const data = await getDocs(movieCollectionRef);
        const filtereddata = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(filtereddata)
        setMovieList(filtereddata);
      } catch (err) {
        console.error("Data fetch error");
      }
    };
    getMovieList();
  },[]);

  return (
    <div>
      <Navbar />
      <Card />
      <div> 
        {movieList.map((movie) => (
            <div className='item'>
            <Link to="/ReviewPage" state={{ kuwashikoto: {        
              id: movie.id,
            } }}><img src={movie.image_v} alt="error loading" className="images" /></Link>
            <span className='movie-title'>{movie.Title}</span>
            {/*<span className='author-name'>{movie.Author}</span>*/}

            <span><Rating Rating={movie.Stars}/></span>
            </div>
        ))}
      </div>
      </div>
  );
}

export default Home;
