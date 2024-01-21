import "./App.css";
import { Home } from "./components/home";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { SingUpPage } from "./components/signUP";
import { SignInPage } from "./components/signIn";
import { SignInWithEmail } from "./components/signinWithEmail";
import { Navbar } from "./components/navbar";
// import { Chat } from "./components/chat";
import { FriendRequest } from "./components/friendRequest.js";
import { FriendList } from "./components/friendlist.js";
// import { useSelector } from "react-redux";
function App() {
  // const isChatToFriend=useSelector(state=>state.chatReducer.isChatToFriend);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SingUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signinbyemail" element={<SignInWithEmail />} />
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            {/* <Route path="/chat"  element={<Chat />} /> */}
            <Route path="/friendlist" element={<FriendList />} />
            <Route path="/friendRequest" element={<FriendRequest />} />
          </Route>
        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
// <Route index element={<SingUpPage/>}/>

//              </Route>
