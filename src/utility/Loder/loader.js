import { useSelector } from 'react-redux';
import  './loader.css';
import { useEffect, useState } from 'react';

export const Loader=()=>{
const loadingUser=useSelector(state=>state.authReducer.loading);
const pending=useSelector(state=>state.friendReducer.pending);    
const [progress,setProgress]=useState(20);

useEffect(()=>{
   if(loadingUser || pending){
        setInterval(()=>{
             if(progress<100){
                setProgress(progress=>progress+20);
             }else{
                setProgress(20);
             }
        },800)
   }

},[loadingUser,pending,progress]);

    return (
        <>
        {
            (loadingUser || pending) && (<hr className="loader_container" style={{width:`${progress}%`}}></hr>)
        }
        </>
    )
 }