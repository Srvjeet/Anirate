import React from 'react';

export default function Heart ({isfav}){
    if(isfav){
        return (
            <i class="fa-solid fa-heart"></i>
        );
    }else{
        return(
            <i class="fa-regular fa-heart"></i>
        );
    }
}