import "./App.css";
import { Home } from "./components/home";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { SingUpPage } from "./components/signUP";
import { SignInPage } from "./components/signIn";
import { SignInWithEmail } from "./components/signinWithEmail";
import { Navbar } from "./components/navbar";
import { FriendRequest } from "./components/friendRequest.js";
import { FriendList } from "./components/friendlist.js";
import { ProtectedRoute } from "./components/ProtectedRoute.js";
import { useSelector } from "react-redux";
import { Loader } from "./utility/Loder/loader.js";
import { ShowResponse } from "./utility/messages/responseMessage.js";
import { ErrorMessageShow } from "./utility/messages/errorMessage.js";
// import { logoutUser } from "./redux/reducers/userReducer.js";

function App() {
  const userData = useSelector((state) => state.authReducer.userData);
  console.log(userData);
  const loadingUser=useSelector(state=>state.authReducer.loading);
  const error = useSelector(state => state.authReducer.error);

  const pending=useSelector(state=>state.friendReducer.pending)
  return (
    <>
       {
         (loadingUser || pending )&&( <Loader/>)
      }
    { error && <ErrorMessageShow/>}
      <ShowResponse/>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SingUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signinbyemail" element={<SignInWithEmail />} />
          <Route element={<ProtectedRoute userData={userData}/>}>
          <Route path="/" element={<Navbar/>}>
            <Route index element={<Home/>}/>
            <Route path="/friendlist" element={<FriendList/>}/>
            <Route path="/friendRequest" element={<FriendRequest/>}/>
          </Route>
          </Route>
          <Route path="/*" element={<h2 >404 page</h2>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
