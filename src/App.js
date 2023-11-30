import './App.css';
import { Home } from './components/home';
import { Route,BrowserRouter,Routes } from 'react-router-dom';
import { SingUpPage } from './components/signUP';
import { SignInPage } from './components/signIn';
import { SignInWithEmail } from './components/signinWithEmail';
import { Navbar } from './components/navbar';
function App() {
  
 return(
<>
  <BrowserRouter>
  
        <Routes>
            <Route path='/' element={<Navbar/>}>
               <Route index element={<Home/>}/>
               <Route path='/signup' element={<SingUpPage/>}/>
               <Route path='/signin' element={<SignInPage/>}/>
               <Route path='/signinbyemail' element={<SignInWithEmail/>}/>
            </Route>

        </Routes>
  
  </BrowserRouter>
</>
 )
}

export default App;
