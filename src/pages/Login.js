// LOGIN & SIGN UP PAGE

import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginAsync } from "../redux/slices/authSlice";
import PageTitle from "../components/PageTitle";

import logo from "../images/versuz-text-logo-white.svg";
import "../styles/auth.css";

const Auth = () => {
  // const [action, setAction] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const navigate = useNavigate("");
  const dispatch = useDispatch();

  const {
    isLoading,
    isErr,
    loggedIn,
    authenticationError, errMessage,} = useSelector((state) => state.auth);

  const handleInputChange = (e) => {
    const id = e.target.id;
    switch (id) {
      case "username":
        let input = e.target.value;
        setUsername(input);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
    }
  };

  const handleSubmit = () => {
    if (username) {
      if (password) {
        dispatch(loginAsync({ username, password }));
      } else {
        setErr("Please enter your password");
      }
    } else {
      setErr("Please enter your phone number");
    }
  };

  useEffect(() => {
    if (authenticationError) {
      setErr(errMessage);
    }

    if (loggedIn) {
      navigate("/explore");
    }
  }, [isErr,authenticationError, loggedIn]);

  return (
    <>
      <PageTitle title="Versuz - Login" />
      <main className="auth">
        <section className="cover-image"></section>

        <section>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Link to="/explore">
              <img className="logo" src={logo} alt="versuz-logo" />
            </Link>
            <h3>Log in to your account</h3>
            <div className="input-group">
              <p style={{textAlign:"center"}} className="err">{errMessage}</p>
            </div>
            <div className="input-group">
              <label htmlFor="phone">Username</label>
              <input
                type="text"
                placeholder="Odogwu"
                // pattern="[0-9]+"
                id="username"
                value={username}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="**********"
                id="password"
                value={password}
                onChange={handleInputChange}
              />
            </div>
            {/* <div className="input-group">
              <input type="checkbox" name="remember" id="" /> Remember me
            </div> */}
            <div className="input-group">
              {isLoading ? (
                <button className="btn btn-primary" type="button" disabled>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span style={{ paddingLeft: "15px" }}>Checking details</span>
                </button>
              ) : (
                <input
                  type="submit"
                  value="Start Playin'"
                  onClick={handleSubmit}
                />
              )}
            </div>
            <div className="input-group">
              <p>
                Don't have an account? <a href="./signup.html">Sign up</a>
              </p>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default Auth;
