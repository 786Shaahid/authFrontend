let BASE_URL;
if(process.env.NODE_ENV==="production"){
    BASE_URL=process.env.REACT_APP_BASE_URL
}else{
    BASE_URL=process.env.REACT_APP_LOCAL_URL
}

export default BASE_URL;