import React, { useState, useEffect, useRef } from "react";
import { Link,useNavigate } from "react-router-dom";
import "../styles/login.css";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../redux/slices/authSlice";
import versuz from "../images/full-logo-dark.svg";
import openEye from "../images/open-eye.svg";
import closedEye from "../images/closed-eye.svg";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const [user, setUser] = useState({ username: "", password: "" });
  const [viewPassword, setViewPassword] = useState(false);
  const [loginErr, setLoginErr] = useState(false);
  const [loadind, setLading] = useState(false);
  const login = useSelector((state) => state.auth.login);

  const handleChange = (e) => {
    const { id, value } = e.target;
    id == "username"
      ? setUser({ ...user, username: value })
      : setUser({ ...user, password: value });
  };

  const handleSubmit = async () => {
    // dispatch(loginAsync(user));
    const url = process.env.REACT_APP_AUTH_ENDPOINT_LOGIN;
    const config = {
      method: "POST",
      headers: {
        reactkey: process.env.REACT_APP_AUTH_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    const response = await fetch(url, config)
      .then((data) => data.json())
      .catch((err) => err);

    // console.log(response);

    if(response.success){
      navigate('/explore')

      const authObj = JSON.stringify({
        username: response.user.username,
        token: response.token,
      });
      sessionStorage.setItem("vsrz", authObj);
    }else{
      setLoginErr(true)
    }

  };

  useEffect(() => {
    console.log(login);
  }, [login]);

  return (
    <div className="login  container-fluid min-vh-100">
      <img className="home-image" src={versuz} alt="" />
      <div className="auth-card default">
        <h1>Login</h1>
        {loginErr && <p style={{color:"#F8333D"}}>Invalid details! try again</p> }
        <form action="">
          <div className=" col-12 ">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Username
            </label>
            <div
              className="input-cont"
              onClick={() => {
                usernameRef.current.focus();
              }}
            >
              <input
                type="text"
                placeholder="Odogwu"
                value={user.username}
                id="username"
                onChange={handleChange}
                ref={usernameRef}
                autoFocus={false}
              />
            </div>
          </div>

          <div className=" col-12 ">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Password
            </label>
            <div
              className="input-cont"
              onClick={() => {
                passwordRef.current.focus();
              }}
            >
              <input
                type={(viewPassword && "text") || "password"}
                placeholder="********"
                value={user.password}
                id="password"
                onChange={handleChange}
                ref={passwordRef}
                autoFocus={false}
              />

              <img
                src={(!viewPassword && openEye) || closedEye}
                onClick={() => {
                  setViewPassword(!viewPassword);
                }}
                alt=""
              />
            </div>
          </div>
        </form>
        <button onClick={handleSubmit}>
          {(login.loading && "Checking...") || "Start playin'"}
        </button>

        <p>
          Forgot your password?{" "}
          <Link className="purple" to={"/reset-password"}>
            Reset password
          </Link>{" "}
        </p>

        <div className="divider"></div>

        <p className="purple">
          New here?{" "}
          <Link className="purple" to={"/signup"}>
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
