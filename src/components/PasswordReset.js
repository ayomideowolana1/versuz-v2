import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import versuz from "../images/full-logo-dark.svg";
import mailSent from "../images/mail-sent.svg";
import closedEye from "../images/closed-eye.svg";
import openEye from "../images/open-eye.svg";
import { useLocation } from 'react-router-dom';

import "../styles/login.css";

export default function PasswordReset() {
  const [view, setView] = useState("one");
  const [emailSent, setEmailSent] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [emailNotRegistered, setEmailNotRegistered] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const [accountNotFound, setAccountNotFound] = useState(false);

  const [email, setEmail] = useState("");
  const emailRef = useRef(null);

  const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEmail(value);
    emailRegex.test(value) ? setEmailValid(true) : setEmailValid(false);
  };

  const submit = async () => {
    // https://www.backend.versuz.co/accounts/find_account/${email}

    const url = `https://www.backend.versuz.co/accounts/find_account/${email}`;
    const config = {
      method: "GET",
      headers: {
        reactkey: process.env.REACT_APP_AUTH_KEY,
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({email:email}),
    };

    const response = await fetch(url, config)
      .then((data) => data.json())
      .catch((err) => err);

    console.log(response);

    if (response.success) {
      setView("two");
      // navigate to verify
      // navigate("/verify-account")
    } else {
      // show error
      setErrMessage(response.message);
      setEmailNotRegistered(true);
      // setView("one")
    }
  };

  useEffect(() => {});
  return (
    <div className="login container-fluid min-vh-100">
      <img className="home-image" src={versuz} alt="" />

      {view == "one" && (
        <div className="auth-card default">
          <h1 className=" left">Find your Versuz Account</h1>
          <p className="left dark" style={{ fontSize: "16px" }}>
            Enter the email address associated with your account to change your
            password
          </p>
          <form action="">
            <div className=" col-12 ">
              {/* <label htmlFor="exampleFormControlInput1" className="form-label">
            Username
          </label> */}
              <div
                className="input-cont"
                onClick={() => {
                  emailRef.current.focus();
                }}
              >
                <input
                  type="text"
                  placeholder="azaman@cashout.co"
                  value={email}
                  id="email"
                  onChange={handleChange}
                  ref={emailRef}
                  autoFocus={false}
                />
              </div>
            </div>
            {emailNotRegistered && (
              <p style={{ textAlign: "left", color: "#F8333D", margin: "0px" }}>
                {errMessage}
              </p>
            )}
          </form>
          <br />
          <button
            className={`signup ${emailValid ? "" : "disabled"}`}
            disabled={emailValid ? false : true}
            onClick={submit}
          >
            {/* {login.loading && "Checking..." || "Start playin'"} */}
            Continue
          </button>
        </div>
      )}

      {view == "two" && (
        <div className="auth-card default">
          <img className="main-img" src={mailSent} alt="" />
          <h1 className="sm left">Reset Password Link</h1>
          <p className="left dark" style={{ fontSize: "14px" }}>
            We have sent a reset password link to the email address associated
            with your account, click the link and set a new password
          </p>
          <form action="">
            <div className=" col-12 ">
              {/* <label htmlFor="exampleFormControlInput1" className="form-label">
            Username
          </label> */}
              {/* <div
                className="input-cont"
                onClick={() => {
                  emailRef.current.focus();
                }}
              >
                <input
                  type="text"
                  placeholder="azaman@cashout.co"
                  value={email}
                  // id="username"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  ref={emailRef}
                  autoFocus={false}
                />
              </div> */}
            </div>
          </form>
          <Link to="/login">
            <button
              className={`signup ${true ? "" : "disabled"}`}
              // disabled={true ? false : true}
              onClick={() => {
                // setView("two");
              }}
            >
              {/* {login.loading && "Checking..." || "Start playin'"} */}
              Login
            </button>
          </Link>

          <p className="">
            Didn't receive the link?{" "}
            <Link className="purple" to={"/login"}>
              Resend
            </Link>{" "}
          </p>
        </div>
      )}
    </div>
  );
}

export function PasswordResetLink() {
  const { id } = useParams();

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);
  const [tokenInvalid, setTokenInvalid] = useState(false);

  const getTokenValidity = async () => {
    setLoading(true);
    const url = `https://www.backend.versuz.co/accounts/reset-password/${id}`;
    const config = {
      method: "GET",
      headers: {
        reactkey: process.env.REACT_APP_AUTH_KEY,
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({email:email}),
    };

    const response = await fetch(url, config)
      .then((data) => data.json())
      .catch((err) => err);

      setLoading(false);
      
      console.log(response);
      if (response.success) {
      setTokenValid(true);
      setUsername(response.username);
    } else {
      setTokenInvalid(true);
      setUsername("");
    }
  };

  useEffect(() => {
    getTokenValidity();
    // bukv2z-6c4ae806c833c4583d9ef8535c22520f
  }, []);

  useEffect(() => {
    if (tokenValid) {
    }
  }, [tokenValid]);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])([A-Za-z\d@$!%*?&.]){8,}$/;

  const [passwordMatch, setPasswordMatch] = useState(false);
  const [passwordStrong, setPasswordStrong] = useState(false);

  const pass1Ref = useRef(null);
  const pass2Ref = useRef(null);

  const [viewPassword, setViewPassword] = useState({
    pass1: false,
    pass2: false,
  });

  const [user, setUser] = useState({
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "pass1":
        passwordRegex.test(value)
          ? setPasswordStrong(true)
          : setPasswordStrong(false);

        setUser({ ...user, password: value });
        break;
      case "pass2":
        user.password == value ? setPasswordMatch(true) :  setPasswordMatch(false)
        setUser({ ...user, password2: value });
        break;
    }
  };

  const reset = async () => {
    // setLoading(true);
    const url = `https://www.backend.versuz.co/accounts/reset-password/${id}`;
    const config = {
      method: "POST",
      headers: {
        reactkey: process.env.REACT_APP_AUTH_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({new_password:user.password}),
    };

    const response = await fetch(url, config)
      .then((data) => data.json())
      .catch((err) => err);

      // setLoading(false);
      
      console.log(response);
    //   if (response.success) {
    //   setTokenValid(true);
    //   setUsername(response.username);
    // } else {
    //   setTokenInvalid(true);
    //   setUsername("");
    // }
  }

  return (
    <div className="login container-fluid min-vh-100">
      <img className="home-image" src={versuz} alt="" />
      {username}
      {tokenValid && (
        <div className="auth-card default">
          <h1 className=" sm left">Enter new password</h1>

          <form action="">
            <div className=" col-12 ">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                New Password
              </label>
              <div
                className={`input-cont ${!passwordStrong && "err"}`}
                onClick={() => {
                  pass1Ref.current.focus();
                }}
              >
                <input
                  type={(viewPassword.pass1 && "text") || "password"}
                  placeholder="********"
                  value={user.password}
                  id="pass1"
                  onChange={handleChange}
                  ref={pass1Ref}
                  autoFocus={false}
                />

                <img
                  src={(!viewPassword.pass1 && closedEye) || openEye}
                  onClick={() => {
                    setViewPassword({
                      ...viewPassword,
                      pass1: !viewPassword.pass1,
                    });
                  }}
                  alt=""
                />
              </div>
              {!passwordStrong && (
                <p className="err-message">Enter a stronger password</p>
              )}
            </div>

            <div className=" col-12 ">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Confirm New Password
              </label>
              <div
                className={`input-cont ${!passwordMatch && "err"}`}
                onClick={() => {
                  pass2Ref.current.focus();
                }}
              >
                <input
                  type={(viewPassword.pass2 && "text") || "password"}
                  placeholder="********"
                  value={user.password2}
                  id="pass2"
                  onChange={handleChange}
                  ref={pass2Ref}
                  autoFocus={false}
                />

                <img
                  src={(!viewPassword.pass2 && closedEye) || openEye}
                  onClick={() => {
                    setViewPassword({
                      ...viewPassword,
                      pass2: !viewPassword.pass2,
                    });
                  }}
                  alt=""
                />
              </div>
              {!passwordMatch && (
                <p className="err-message">Passwords do not match</p>
              )}
            </div>
          </form>
          <br />
                
          <button
            className={`signup ${ passwordStrong && passwordMatch ? "" : "disabled" }`}
            disabled={!passwordMatch ? false : true}
            onClick={reset}
          >
            {/* {login.loading && "Checking..." || "Start playin'"} */}
            Done
          </button>

          <p className="">
            <Link
              to="/login"
              className="purple"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                fontWeight: "normal",
              }}
            >
              Go to login
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.0316 18.2651C9.70812 18.0063 9.65568 17.5343 9.91444 17.2109L13.5396 12.6794L9.91444 8.14794C9.65568 7.82449 9.70812 7.35252 10.0316 7.09376C10.355 6.83501 10.827 6.88745 11.0857 7.21089L15.0857 12.2109C15.3049 12.4848 15.3049 12.874 15.0857 13.1479L11.0857 18.1479C10.827 18.4714 10.355 18.5238 10.0316 18.2651Z"
                  fill="#5E57F2"
                />
              </svg>
            </Link>
          </p>
        </div>
      )}
      { tokenInvalid && (
        <div className="auth-card default">
          <h1 className=" sm left">Invalid Token</h1>
          <p style={{textAlign:"left", fontSize:"16px",marginLeft:"0px"}}>The token is either invalid or it has expired </p>
          <Link to="/reset-password">
            <button
              className={`signup ${true ? "" : "disabled"}`}
              disabled={true ? false : true}
              onClick={() => {
                // setView("two");
              }}
            >
              {/* {login.loading && "Checking..." || "Start playin'"} */}
              Get New token
            </button>
          </Link>

          <p className="">
            <Link
              to="/login"
              className="purple"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                fontWeight: "normal",
              }}
            >
              Go to login
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.0316 18.2651C9.70812 18.0063 9.65568 17.5343 9.91444 17.2109L13.5396 12.6794L9.91444 8.14794C9.65568 7.82449 9.70812 7.35252 10.0316 7.09376C10.355 6.83501 10.827 6.88745 11.0857 7.21089L15.0857 12.2109C15.3049 12.4848 15.3049 12.874 15.0857 13.1479L11.0857 18.1479C10.827 18.4714 10.355 18.5238 10.0316 18.2651Z"
                  fill="#5E57F2"
                />
              </svg>
            </Link>
            </p>

        </div>
        
        

        
      )}

      {loading && (
        <div className="auth-card default">
          <h1 className=" sm left">Validating Token...</h1>
        </div>
      )}
    </div>
  );
}

export function VerifyAccount() {
  const pinRef = useRef(null);
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [pinInvalid, setPinInvalid] = useState(false);
  const { id } = useParams();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('data');

  const validate = async() => {
    const url = `https://www.backend.versuz.co/accounts/verify_email/${pin}`;
    const config = {
      method: "GET",
      headers: {
        reactkey: process.env.REACT_APP_AUTH_KEY,
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({pin:pin}),
    };

    const response = await fetch(url, config)
      .then((data) => data.json())
      .catch((err) => err);

    console.log(response);

    if (response.success) {
      // setView("two");
      // navigate to verify
      navigate("/explore")
    } else {
      // show error
      setPinInvalid(true);
      // setView("one")
    }
  }
  return (
    <div className="login container-fluid min-vh-100">
      <img className="home-image" src={versuz} alt="" />
      <div className="auth-card default">
        <img className="main-img" src={mailSent} alt="" />
        <h1 className="sm left">Verify your account</h1>
        {!pinInvalid && <p
          className="left dark"
          style={{ fontSize: "16px", textAlign: "left" }}
        >
          Enter the verification code sent to your email
        </p>}

        {
          pinInvalid && <p
          className="left"
          style={{ fontSize: "16px", textAlign: "left",color:"red" }}
        >
          Invalid Pin! Try again
        </p>
        }
        <form action="">
          <div
            className="input-cont"
            onClick={() => {
              pinRef.current.focus();
            }}
          >
            <input
              type="text"
              placeholder="Enter verification code"
              value={pin}
              // id="username"
              onChange={(e) => {
                setPin(e.target.value);
              }}
              ref={pinRef}
              autoFocus={false}
            />
          </div>
        </form>
        <p>
          Didn't receive the code?{" "}
          <a href="" className="purple">
            Resend
          </a>
        </p>

        <div className="btn-cont container-fluid">
          <div className="row">
            <div className="col-6">
              <button className="white">Cancel</button>
            </div>
            <div className="col-6">
              <button onClick={validate}>Verify</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
