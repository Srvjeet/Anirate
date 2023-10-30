import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import { db } from '../config/firebase-config';
import Navbar from './Navbar';
import { Link } from "react-router-dom";
import Rating from './Rating';
import {
    getDocs,
    collection,
    orderBy,
    query,
    where,
  } from "firebase/firestore";

export default function(){
    const [movies, setMovies]= useState([]);
    const location = useLocation();
    const {key}=location.state;
    const newKey = key.toLowerCase();
    const movieRef = collection(db, "movies");
    useEffect(()=>{
        const queryFunction = async ()=>{
            const q = await query(movieRef, orderBy('Title_l','desc'), where('Title_l','array-contains',newKey));
            const data = await getDocs(q);
            const filtereddata = data.docs.map((doc)=>({
                ...doc.data(),
                id: doc.id
            }));
            setMovies(filtereddata);
            console.log(movies);
        }
        queryFunction();
    },[key]);
    return(
        <div>
            <Navbar/>
            <div>
                {movies.map(movie=>(
                    <div className="item">
                    <Link to="/ReviewPage" state={{ kuwashikoto: {
                    id: movie.id
                  } }}><img src={movie.image_v} alt="error loading" className="images" /></Link>
                    <span className="movie-title">{movie.Title}</span>
                    <span><Rating Rating={movie.Stars}/></span>
                  </div>
                ))}
            </div>
        </div>
    );
}