import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


function CreateNew() {
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateNewGameClick = () => {
    isLoggedIn ? 
    navigate("/new-game")
    : 
    navigate("/login")
  };
  return (
    <button
      onClick={handleCreateNewGameClick}
      style={{ boxShadow: "0px 0px 5px 2px #424242" }}
    >
      <svg
        width="25"
        height="26"
        viewBox="0 0 25 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.3392 14.4008H14.0693V22.6707H11.3126V14.4008H3.04272V11.6442H11.3126V3.37427H14.0693V11.6442H22.3392V14.4008Z"
          fill="white"
        />
      </svg>
    </button>
  );
}

export default function BottomNav(props) {
  return (
    <div className="bottom-nav">
      <CreateNew />
    </div>
  );
}
