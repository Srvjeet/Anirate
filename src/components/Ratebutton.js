import React from 'react';
import "./Ratebutton.css";


export default function Ratingbutton ({Rating, handleClick}){
    console.log(Rating);
    if(Rating===0 || Rating===null){
        return(
            <div class="main-div">
                <i onClick={()=>handleClick(1)} class="fa-regular fa-star"></i>
                <i onClick={()=>handleClick(2)} class="fa-regular fa-star"></i>
                <i onClick={()=>handleClick(3)} class="fa-regular fa-star"></i>
                <i onClick={()=>handleClick(4)} class="fa-regular fa-star"></i>
                <i onClick={()=>handleClick(5)} class="fa-regular fa-star"></i>
            </div>
        );
        }else if(Rating>0 && Rating<=0.5){
        return(
            <div class="main-div">
                <i onClick={()=>handleClick(1)} class="fa-solid fa-star-half-stroke"></i>
                <i onClick={()=>handleClick(2)} class="fa-regular fa-star"></i>
                <i onClick={()=>handleClick(3)} class="fa-regular fa-star"></i>
                <i onClick={()=>handleClick(4)} class="fa-regular fa-star"></i>
                <i onClick={()=>handleClick(5)} class="fa-regular fa-star"></i>
            </div>
        );
    }else if(Rating>0.5 && Rating<=1){
        return(
            <div class="main-div">
                <i onClick={()=>handleClick(1)} class="fa-solid fa-star"></i>
                <i onClick={()=>handleClick(2)} class="fa-regular fa-star"></i>
                <i onClick={()=>handleClick(3)} class="fa-regular fa-star"></i>
                <i onClick={()=>handleClick(4)} class="fa-regular fa-star"></i>
                <i onClick={()=>handleClick(5)} class="fa-regular fa-star"></i>
            </div>
        );
    }else if(Rating >1 && Rating <= 1.5){
        return(
            <div class="main-div">
                <i onClick={()=>handleClick(1)} class="fa-solid fa-star"></i>
                <i onClick={()=>handleClick(2)} class="fa-solid fa-star-half-stroke"></i>
                <i onClick={()=>handleClick(3)} class="fa-regular fa-star"></i>
                <i onClick={()=>handleClick(4)} class="fa-regular fa-star"></i>
                <i onClick={()=>handleClick(5)} class="fa-regular fa-star"></i>
            </div>
        );
    }else if(Rating >1.5 && Rating <= 2){
        return(
            <div class="main-div">
                <i onClick={()=>handleClick(1)} class="fa-solid fa-star"></i>
                <i onClick={()=>handleClick(2)} class="fa-solid fa-star"></i>
                <i onClick={()=>handleClick(3)} class="fa-regular fa-star"></i>
                <i onClick={()=>handleClick(4)} class="fa-regular fa-star"></i>
                <i onClick={()=>handleClick(5)} class="fa-regular fa-star"></i>
            </div>
        );
    }else if(Rating >2 && Rating <= 2.5){
        return(
            <div class="main-div">
                <i onClick={()=>handleClick(1)} class="fa-solid fa-star"></i>
                <i onClick={()=>handleClick(2)} class="fa-solid fa-star"></i>
                <i onClick={()=>handleClick(3)} class="fa-solid fa-star-half-stroke"></i>
                <i onClick={()=>handleClick(4)} class="fa-regular fa-star"></i>
                <i onClick={()=>handleClick(5)} class="fa-regular fa-star"></i>
            </div>
        );
    }else if(Rating >2.5 && Rating <= 3){
        return(
            <div class="main-div">
                <i onClick={()=>handleClick(1)} class="fa-solid fa-star"></i>
                <i onClick={()=>handleClick(2)} class="fa-solid fa-star"></i>
                <i onClick={()=>handleClick(3)} class="fa-solid fa-star"></i>
                <i onClick={()=>handleClick(4)} class="fa-regular fa-star"></i>
                <i onClick={()=>handleClick(5)} class="fa-regular fa-star"></i>
            </div>
        );
    }else if(Rating >3 && Rating <= 3.5){
        return(
            <div class="main-div">
                <i onClick={()=>handleClick(1)} class="fa-solid fa-star"></i>
                <i onClick={()=>handleClick(2)} class="fa-solid fa-star"></i>
                <i onClick={()=>handleClick(3)} class="fa-solid fa-star"></i>
                <i onClick={()=>handleClick(4)} class="fa-solid fa-star-half-stroke"></i>
                <i onClick={()=>handleClick(5)} class="fa-regular fa-star"></i>
            </div>
        );
    }else if(Rating >3.5 && Rating <= 4){
        return(
            <div class="main-div">
                <i onClick={()=>handleClick(1)} class="fa-solid fa-star"></i>
                <i onClick={()=>handleClick(2)} class="fa-solid fa-star"></i>
                <i onClick={()=>handleClick(3)} class="fa-solid fa-star"></i>
                <i onClick={()=>handleClick(4)} class="fa-solid fa-star"></i>
                <i onClick={()=>handleClick(5)} class="fa-regular fa-star"></i>
            </div>
        );
    }else if(Rating >4 && Rating <= 4.5){
        return(
            <div class="main-div">
                <i onClick={()=>handleClick(1)} class="fa-solid fa-star"></i>
                <i onClick={()=>handleClick(2)} class="fa-solid fa-star"></i>
                <i onClick={()=>handleClick(3)} class="fa-solid fa-star"></i>
                <i onClick={()=>handleClick(4)} class="fa-solid fa-star"></i>
                <i onClick={()=>handleClick(5)} class="fa-solid fa-star-half-stroke"></i>
            </div>
        );
    }else{
        return(
            <div class="main-div">
                <i onClick={()=>handleClick(1)} class="fa-solid fa-star"></i>
                <i onClick={()=>handleClick(2)} class="fa-solid fa-star"></i>
                <i onClick={()=>handleClick(3)} class="fa-solid fa-star"></i>
                <i onClick={()=>handleClick(4)} class="fa-solid fa-star"></i>
                <i onClick={()=>handleClick(5)} class="fa-solid fa-star"></i>
            </div>
        );
    }
}