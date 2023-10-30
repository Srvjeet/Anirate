import React, { useState, useEffect } from "react";
import "./ReviewPage.css";
import Navbar from "./Navbar";
import Rating from "./Rating";
import Ratebutton from './Ratebutton';

import Ratingbutton from "./Ratebutton";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../config/firebase-config";
import { useLocation } from "react-router-dom";
import Heart from './Heart';
import {
  getDoc,
  doc,
  arrayUnion,
  arrayRemove,
  updateDoc,
  setDoc,
} from "firebase/firestore";

let usid;

function ReviewPage() {
  const [text, setText] = useState("");
  const location = useLocation();
  const { kuwashikoto } = location.state;
  const [reviews, setReviews]=useState([]);
  const [count,setCount] = useState(0);
  const [movie,setMovie] = useState({});
  const [user, setUser] = useState({});
  const [userDoc,setUserDoc] = useState();
  const [movRate, setMovRate]= useState(0);
  const [isFav, setFav] = useState(false);
  useEffect(()=>{
    const getMovie=async ()=>{
      const docRef = doc(db, "movies", kuwashikoto.id);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      const Review = data.Reviews;
      onAuthStateChanged(auth, (user) => {
        if (user) {
          usid=user.uid;
        } else {
          console.log("Logged Out");
          usid=null;
        }
      });
      if(usid !==null && usid !==undefined){
        const userRef = doc(db, "users", usid);
        setUserDoc(userRef);
        const userSnap = await getDoc(userRef);
        const userdata = userSnap.data();
        setUser(userdata);
      }
      setMovie(data);
      setReviews(Review);
    }
    getMovie();
    console.log(usid);
    console.log(user);
  }, [count])

  useEffect(()=>{
    if(user !==null && user!==undefined && user.hasOwnProperty('RatedMov') && user.RatedMov.hasOwnProperty(kuwashikoto.id)){
      setMovRate(user.RatedMov[kuwashikoto.id]);
    }else{
      setMovRate(0);
    }
    if(user !==null && user!==undefined && user.hasOwnProperty('Favourites') && user.Favourites.includes(kuwashikoto.id)){
      setFav(true);
    }else{
      setFav(false);
    }
  })

  const addFav = async () => {
    if(usid!==null && usid !== undefined){
    const favDocList = user.Favourites;
    let is = false;
    if (!user.Favourites) {
      await updateDoc(userDoc, { Favourites: arrayUnion(kuwashikoto.id) });
      setCount(count+1);
    } else {
      favDocList.forEach((ele) => {
        if (ele === kuwashikoto.id) {
          is = true;
        }
      });
      if (is === false) {
        await updateDoc(userDoc, { Favourites: arrayUnion(kuwashikoto.id) });
        setCount(count+1);
      } else {
        await updateDoc(userDoc, { Favourites: arrayRemove(kuwashikoto.id) });
        setCount(count+1);
      }
    }
    }else{
      alert("You're not logged in!");
    }
  };

  const writeReview = async()=> {
    if(usid!==null && usid !== undefined){
      if (text !== "") {
        const docRef = doc(db, "movies", kuwashikoto.id);
        await updateDoc(docRef, { Reviews: arrayUnion(text)});
        setCount(count+1);

      } else {
        alert("Comment box, can't be empty");
      }
    }else{
      alert("You're not logged in!");
    }
  };

  const addRating = async (num) => {
    if(usid!==null && usid !== undefined){
    const movieRef = doc(db, "movies", kuwashikoto.id);
    const userdocRef = doc(db, "users", usid);
    const data = user
    if (!data.RatedMov) {
      let newdata;
      let Rate = movie.Rates + 1;
      let Point = movie.Points + num;
      let Star = Point / Rate;
      if (data.Favourites) {
        newdata = {
          Favourites: data.Favourites,
          usid: data.usid,
          RatedMov: {
            [kuwashikoto.id]: num,
          },
        };
      } else {
        newdata = {
          usid: data.usid,
          RatedMov: {
            [kuwashikoto.id]: num,
          },
        };
      }
      await setDoc(userdocRef, newdata);
      await updateDoc(movieRef, { Rates: Rate, Points: Point, Stars: Star });
    } else {
      if (data.RatedMov[kuwashikoto.id]) {
        const prevRat = data.RatedMov[kuwashikoto.id];
        let Point = movie.Points - prevRat;
        Point = Point + num;
        let Star = Point / movie.Rates;
        data.RatedMov[kuwashikoto.id] = num;
        await updateDoc(userdocRef, data);
        await updateDoc(movieRef, { Points: Point, Stars: Star });
      } else {
        const updateData = data.RatedMov;
        updateData[kuwashikoto.id] = num;
        await updateDoc(userdocRef, {
          RatedMov: updateData,
        });
        let Point = movie.Points + num;
        let Rate = movie.Rates + 1;
        let Star = Point / Rate;
        await updateDoc(movieRef, { Points: Point, Rates: Rate, Stars: Star });
      }
    }
    setCount(count+1);
  }else{
    alert("you're not logged in!");
  }
  };

  return (
    <div>
      <Navbar />
      <div className="review-page-card">
        <div>
          <img src={movie.image_v} className="movie-img" alt="movie pic" />
        </div>
        <div className="movie-title-rp">{movie.Title}</div>
        <div className="movie-director-rp">{movie.Author}</div>
        <button className="fav-btn" onClick={addFav}>
          {/*<FontAwesomeIcon icon={faHeart} className="heart" />*/}
          <Heart isfav={isFav}/>
        </button>

        <h2 className="movie-des-title">Movie Description</h2>
        <div className="movie-description-rp">{movie.Description}</div>
        <div>
          <h2 className="rev-title">Reviews:</h2>
          <span><Rating Rating={movie.Stars}/></span>

          <div className="other-revs">
            {reviews.map((r) => (
              <div>‣ {r}</div>
            ))}
          </div>
        </div>
        <hr />
        <div className="your-thoughts">Your Thoughts...</div>
        {/*<button className="stars-rp-1" onClick={() => addRating(1)}></button>
        <button className="stars-rp" onClick={() => addRating(2)}></button>
        <button className="stars-rp" onClick={() => addRating(3)}></button>
        <button className="stars-rp" onClick={() => addRating(4)}></button>
            <button className="stars-rp" onClick={() => addRating(5)}></button>*/}
            <Ratebutton Rating={movRate} handleClick={addRating}/>
        <div>
          <input
            type="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="leave-review"
          />
        </div>
        <button className="post-btn" onClick={writeReview}>
          Post
        </button>
      </div>
    </div>
  );
}

export default ReviewPage;
