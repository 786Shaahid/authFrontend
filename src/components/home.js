import { useEffect } from "react"

export const Home=()=>{
    useEffect(()=>{
        fetch("http://localhost:8080/api/users/getdata",{
            method:"GET",
            headers:{
                "content-type":"application/json"
            }
        }).then((data)=>{
            console.log("data",data);
        }).catch((err)=>{
            console.log("err",err);
        })
    },[])
    return(
        <>
        <h1>This is home page</h1>
        </>
    )
}