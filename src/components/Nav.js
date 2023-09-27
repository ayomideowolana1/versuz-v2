import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../styles/nav.css";
import logo from "../images/versuz-text-logo.png";
import userIcon from "../images/user-icon.png";
import { FaSearch } from "react-icons/fa";
import { logout } from "../redux/slices/authSlice";
import Offcanvas from "react-bootstrap/Offcanvas";

function CheckAuth() {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const loggedOut = useSelector((state) => state.auth.loggedOut);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(()=>{
      if(!loggedIn || loggedOut){
        navigate('/explore')
      }

    },500)
  },[loggedIn,loggedOut]);

  return <></>;
}

export default function () {
  const navigate = useNavigate();
  const inputRef = useRef("null");
  const handleClick = () => {
    inputRef.current.focus();
  };
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const username = useSelector((state) => state.auth.username);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <CheckAuth />
      <nav>

        <Link to="/explore">
          <img alt="versuz-logo" src={logo} className="logo" />
        </Link>
        <div className="search-cont" onClick={handleClick}>
          <FaSearch />
          <input
            ref={inputRef}
            className="search"
            type="text"
            placeholder="Search for games"
          />
        </div>
        {loggedIn ? (
          <>
            <div className="dropdown ">
              <button
                className="btn user dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span>{username}</span>
                <img src={userIcon} alt="user-icon" />
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                {/* <li><a className="dropdown-item" href="#">Balance</a></li>
                <li><a className="dropdown-item" href="#">Settings</a></li>
                <li><hr className="dropdown-divider" /></li> */}
                <li>
                  <a onClick={handleLogout} className="dropdown-item">
                    Logout
                  </a>
                </li>
                <li>
                  <Link className="dropdown-item" to={"/profile"}>
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
            <button className="hamburger" onClick={handleShow}>
              <svg
                width="35"
                height="25"
                viewBox="0 0 35 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0H35L33 5H2L0 0Z" fill="black" />
                <path d="M2 10H33V15H2V10Z" fill="black" />
                <path d="M2 20H33L35 25H0L2 20Z" fill="black" />
              </svg>
            </button>

            <Offcanvas show={show} onHide={handleClose}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title></Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Link to={"/profile"}>Profile</Link>
                <Link to={"/explore"}>Explore</Link>
                <Link to={"/new-game"}>New Game</Link>
                <Link to={"/ticket"}>My Ticket</Link>
                <a className="logout" onClick={handleLogout}>
                  Logout
                </a>
              </Offcanvas.Body>
            </Offcanvas>
          </>
        ) : (
          <div className="user">
            <Link to="/login">Login</Link>
          </div>
        )}
      </nav>
    </>
  );
}
