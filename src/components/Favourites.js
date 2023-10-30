import { useState, useEffect } from "react";
import Rating from "./Rating";
import { db, auth } from "../config/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

let i=0;
let usid
onAuthStateChanged(auth, (user)=>{
    if (user){
        usid=user.uid;
    }
    else{
        console.log("Logged Out")
    }
})

export default function Favourites(){
    const [movieList, setMovieList ]=useState([]);
    useEffect (()=> {
        const getUserFunc = async () =>{
            try{
                const docRef = doc(db, "users", usid);
                const docSnap = await getDoc(docRef);
                const data=docSnap.data();
                const favDocList=data.Favourites;
                let favList=[];
                favDocList.forEach(async element => {
                    const docR= doc(db, "movies", element);
                    const docS = await getDoc(docR);
                    const filteredData= {
                    ...docS.data(),
                    id: docS.id
                }
                if (favList.length < favDocList.length){
                    favList.forEach(element=>{
                    if(element === filteredData){
                        i++;
                    }})
                    if(i===0){
                        favList.push(filteredData);
                    }
                }
                });
                console.log(favList);
                setMovieList(favList);
            }catch(mssg){
                console.log("error");
            }
        }
        getUserFunc();
        //console.log("movies: ");
        //console.log(movieList);
    },[]);

return (
    <div>
      <Navbar />
      <div> 
      {movieList.map((movie) => (
            <div className='item'>
            <Link to="/ReviewPage" state={{ kuwashikoto: {
              id: movie.id
            } }}><img src={movie.image_v} alt="movie" className="images" /></Link>
            <span className='movie-title'>{movie.Title}</span>
            {/*<span className="author-name">{movie.Author}</span>*/}
            <span><Rating Rating={movie.Stars}/></span>
            </div>
        ))}
      </div>
      </div>
  );
}