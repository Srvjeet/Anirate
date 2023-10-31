import React, { useState, useEffect } from "react";
import Rating from "./Rating";
import { db } from "../config/firebase-config";
import { Link } from "react-router-dom";
import { getDocs, collection, orderBy, query, where } from "firebase/firestore";
import { useLocation } from 'react-router-dom';

export default function Genre() {
    const location= useLocation();
    const { gen }= location.state;
    const [moviesList,setMoviesList]=useState([]);
    const fantasyRef=collection(db,"movies");
    useEffect(()=>{
        const queryfunction= async ()=>{
            const q= await query(fantasyRef,orderBy("Genre","desc"),where("Genre","==",gen))
            const data=await getDocs(q)
            const filtereddata = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setMoviesList(filtereddata);
        }
        queryfunction();
    },[]);
    return (
        <div>
            <div> 
                {moviesList.map((movie) => (
                <div className='item'>
                <Link to="/ReviewPage" state={{ kuwashikoto: {
                id: movie.id
                }}}><img src={movie.image_v} alt="error loading" className="images" /></Link>
                <span className='movie-title'>{movie.Title}</span>
                {/*<span><Rating Rating={movie.Stars}/></span>*/}
                </div>
            ))}
            </div>
        </div>
    );
}