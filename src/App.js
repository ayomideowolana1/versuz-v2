import React, { useEffect,  } from "react";
import {  Routes, Route } from "react-router";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PasswordReset, {
  PasswordResetLink,
  VerifyAccount,
} from "./components/PasswordReset";
import { Navigate } from "react-router-dom";

import Explore from "./pages/Explore";
import NewGame from "./pages/NewGame";
import Games from "./pages/Games";
import GameDetails from "./pages/GameDetails";
import Join from "./pages/Join";
import Selections from "./pages/Selections";
import Select from "./pages/Select";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";
import Wallet from "./pages/Wallet";
import { useNavigate } from "react-router-dom";
import Ticket from "./pages/Ticket";
import Deposit from "./pages/Deposit";

import logo from "./images/versuz-icon.svg"
import "./styles/loading.css"

export const Loading =()=>{
  return (
      
    <div className="loading">

      <img src={logo} alt="" />

      {/* <h3>Loading... </h3> */}
      </div>
    
  )
}

function App() {
  const authenticated = useSelector((state)=> state.auth.authenticated);
  const navigate = useNavigate()

  useEffect(()=>{
    if(!sessionStorage.getItem("vsrz")){
      sessionStorage.setItem("vsrz","")
    }
    
    if(!authenticated){
      setTimeout(()=>{navigate("/login")},100)
    } 
  },[])
  return (
    <div className="App" style={{ position: "relative",height: "100dvh" }}>
      <Routes>
        <Route path="*" element={<Navigate to={"/login"} />} />
        <Route path="/" element={<Navigate to={"/login"} />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="reset-password" element={<PasswordReset />} />
        <Route path="reset-password/:id" element={<PasswordResetLink />} />
        <Route path="verify-account" element={<VerifyAccount />} />
        <Route path="join/:id" element={ <Join />} />
        <Route path="ticket/:id" element={ <Ticket />} />
        
          <Route path="explore" element={<Explore />} />
          <Route path="games" element={<Games />} />
          <Route path="game/:id" element={<GameDetails />} />
          <Route path="new-game" element={<NewGame />} />
          <Route path="selections" element={<Selections />} />
          <Route path="select" element={<Select />} />
          <Route path="select/:id" element={<Select />} />
          <Route path="profile" element={<Profile />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="deposit" element={<Deposit />} />
          <Route path="loading" element={<Loading />} />
          
        
        
      </Routes>
    </div>
  );
}

export default App;
