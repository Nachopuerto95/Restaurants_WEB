import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home';
import Layout from './pages/Layout/Layout';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import { AlertProvider } from './contexts/alert.context';
import Community from './pages/community/Community';
import Navbar from './components/UI/Navbar/Navbar';

function App() {

  return (
    <>
    <Navbar/>
      <AlertProvider>
        <Routes>
          
            <Route path="/" element={<Layout> <Home/></Layout>} />
            <Route path="/register" element={ <Register/>} />
            <Route path="/login" element={ <Login/>} />
            <Route path="/Community" element={ <Community/>} />
          
        </Routes>
      </AlertProvider>
    </>
  )
}

export default App
