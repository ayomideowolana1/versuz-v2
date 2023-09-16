import React, { useState } from "react";
import { Router, Routes, Route } from "react-router";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PasswordReset, {
  PasswordResetLink,
  VerifyAccount,
} from "./components/PasswordReset";
import Navbar from "./components/Navbar";
import Explore from "./pages/Explore";
import NewGame from "./pages/NewGame";
import Games from "./pages/Games";
import GameDetails from "./pages/GameDetails";


function App() {
  return (
    <div className="App" style={{ position: "relative" }}>
      <Routes>
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/" element={<h1>Versuz Landing Page</h1>} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="reset-password" element={<PasswordReset />} />
        <Route path="reset-password/:id" element={<PasswordResetLink />} />
        <Route path="verify-account/:id" element={<VerifyAccount />} />
        <Route path="explore" element={<Explore />} />
        <Route path="games" element={<Games />} />
        <Route path="game/:id" element={<GameDetails />} />
        <Route path="new-game" element={<NewGame />} />
        <Route path="join/:id" element={<h1>Join</h1>} />
        <Route path="select" element={<h1>Select Games</h1>} />
        <Route path="profile" element={<h1>Your Profile</h1>} />
        <Route path="match/:id" element={<h1>Match</h1>} />
        <Route path="pair/:id" element={<h1>Pair </h1>} />
      </Routes>
    </div>
  );
}

export default App;
