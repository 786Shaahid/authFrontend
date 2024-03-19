import { useSelector } from "react-redux";


export const Skeleton=({message})=>{
    const pendingFriend = useSelector(state => state.friendReducer.pending);
    const loadingUser = useSelector(state => state.authReducer.loading);
    const loading= pendingFriend|| loadingUser
    const dummyArr=['a','b','c','d','e','f']
    return(

        <>
         <div className="suggestion_box" style={{backgroundColor:"rgb(255, 179, 179,0.3)"}}>
               {
             loading ?  dummyArr.map((item,index)=>(<div className='suggestion_friend_box' style={{backgroundColor:"rgb(255, 51,135,0.8)"}} key={index}>
                  
             </div>)):(<h2 style={{textAlign:"center"}}>{message}</h2>)}
         </div>
          </>
    )
}