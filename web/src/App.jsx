import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import { AlertProvider } from './contexts/alert.context';
import Community from './pages/community/Community';
import Navbar from './components/UI/Navbar/Navbar';
import Footer from './components/UI/Footer/Footer';
import Restaurants from './pages/restaurants/Restaurants';
import { LocationProvider } from './contexts/location.context';

function App() {

  return (
    <>
    <Navbar/>
      <AlertProvider>
      <LocationProvider>
        <Routes>
          
            <Route path="/" element={<Home/>} />
            <Route path="/register" element={ <Register/>} />
            <Route path="/login" element={ <Login/>} />
            <Route path="/community" element={ <Community/>} />
            <Route path="/restaurants" element={ <Restaurants/>} />
          
        </Routes>
        </LocationProvider>
      </AlertProvider>
      
    </>
  )
}

export default App
