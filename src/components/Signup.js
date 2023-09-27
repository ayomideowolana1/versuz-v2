import React, { useState, useEffect, useRef } from "react";
import { Link,useNavigate } from "react-router-dom";
import versuz from "../images/full-logo-dark.svg";
import "../styles/login.css";
import openEye from "../images/open-eye.svg";
import closedEye from "../images/closed-eye.svg";
import upload from "../images/image-upload.svg";
import { useDispatch, useSelector } from "react-redux";
import { signUpAsync } from "../redux/slices/authSlice";
import { Dots } from "./Login";

const getNumbers = (string) => {
  return string.replace(/[^0-9]/g, "");
};

function validatePassword(password) {
  const errors = [];

  // Check for at least 1 uppercase letter
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least 1 uppercase letter.");
  }

  // Check for at least 1 lowercase letter
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least 1 lowercase letter.");
  }

  // Check for at least 1 special character that isn't <, >, or /
  if (!/[@$!%*?&^]/.test(password)) {
    errors.push("Password must contain at least 1 special character (@, $, !, %, *, ?, &, or ^).");
  }

  // Check for a minimum length of 8 characters
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }

  return errors;
}

export default function Signup() {
  const dispatch = useDispatch()
  // const {loading,isErr} = useSelector(state => state.auth.signup)
  const navigate = useNavigate()
  // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])([A-Za-z\d@$!%*?&.]){8,}$/;
  const passwordRegex = /^([A-Za-z\d@$!%*?&.]){8,}$/;
  const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

  const [viewPassword, setViewPassword] = useState({
    pass1: false,
    pass2: false,
  });
  const [view, setView] = useState("one");
  const [emailValid, setEmailValid] = useState(false);
  const [emailRegistered, setEmailRegistered] = useState(false);
  const [usernameRegistered, setUsernameRegistered] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [phoneComplete, setPhoneComplete] = useState(false);
  const [form1Complete, setForm1Complete] = useState(false);
  const [form2Complete, setForm2Complete] = useState(false);

  const [loading, setLoading] = useState(false);

  const [base64Image, setBase64Image] = useState("");
  const [fullname, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");

  const uploadRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const pass1Ref = useRef(null);
  const pass2Ref = useRef(null);
  const fullNameRef = useRef(null);
  const usernameRef = useRef(null);
  const dobRef = useRef(null);

  // email, phone, password, profile_photo, full, name, user_name, dob

  const [user, setUser] = useState({
    email: "",
    phone_number: "",
    password: "",
    password2: "",
    profile_photo: "",
    full_name: "",
    name: "",
    username: "",
    dob: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    switch (id) {
      case "email":
        emailRegex.test(value) ? setEmailValid(true) : setEmailValid(false);
        setEmailRegistered(false)
        setUser({ ...user, email: value });
        break;
      case "phone":
        value.split("").length == 11
          ? setPhoneComplete(true)
          : setPhoneComplete(false);
        setUser({ ...user, phone_number: getNumbers(value) });
        break;
      case "pass1":
      setPasswordErrors([])  
      let errors = validatePassword(value)
      setUser({ ...user, password: value });
      setPasswordErrors(errors)  
        
        // passwordRegex.test(value)
        //   ? setPasswordStrong(true)
        //   : setPasswordStrong(false);
        
        break;
      case "pass2":
        setUser({ ...user, password2: value });
        break;
      case "fullname":
        setFullName(value)
        setUser({ ...user, full_name: value });
        break;
        case "username":
          setUsernameRegistered(false)
          const modifiedString = value.replace(/ /g, "_");
          setUsername(modifiedString)
        setUser({ ...user, username: modifiedString.toLowerCase() });
        break;
        case "dob":
          setDob(value)
        setUser({ ...user, dob: value });
        break;
    }
  };

  const convertImage = (e) => {
    let base64String = "";

    let file = document.querySelector("input[type=file]")["files"][0];

    let reader = new FileReader();

    reader.onload = function () {
      base64String = reader.result;

      // let imageBase64Stringsep = base64String;
      // alert(imageBase64Stringsep);

      setBase64Image(base64String);
      setUser({ ...user, profile_photo: base64String });
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    user.password == user.password2
      ? setPasswordMatch(true)
      : setPasswordMatch(false);
  }, [user]);

  useEffect(() => {
    if ((emailValid && user.password && passwordErrors.length == 0 && user.phone_number && passwordMatch)) {
      setForm1Complete(true);
    } else {
      setForm1Complete(false);
    }
  }, [user, passwordMatch, emailValid, phoneComplete, passwordMatch]);

  useEffect(()=>{
    if(base64Image && fullname && username && dob){
      setForm2Complete(true)
    }
    // console.log(user)
  },[base64Image,fullname,username,dob])

  const signup = async ()=>{

    setLoading(true)

  const url = process.env.REACT_APP_AUTH_ENDPOINT_REGISTER;
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
  
  console.log(response)
  
  setLoading(false)
  if(response.success){
      // navigate to verify
      navigate(`/verify-account`)
    }else{
      // show error { success: false, message: "Username already exists" }
      if(response.message == "Username already exists"){
        setUsernameRegistered(true)
      }else{
        setEmailRegistered(true)
        setView("one")
      }
      
    }

    // dispatch(signUpAsync(user))
  }

  return (
    <div className="login container-fluid min-vh-100">
      <img className="home-image" src={versuz} alt="" />

      <div className="auth-card signup">
        <h1 className="sm">Create Account</h1>
        <div className="blocks">
          <div className="block active"></div>
          <div className={`block ${view != "one" && "active"}`}></div>
        </div>
        {(view == "one" && (
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className=" col-12 ">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Email address
              </label>
              <div
                className={`input-cont ${!emailValid && "err"} ${emailRegistered && "err"}`}
                onClick={() => {
                  emailRef.current.focus();
                }}
              >
                <input
                  type="email"
                  placeholder="Odogwu@money.com"
                  value={user.email}
                  id="email"
                  onChange={handleChange}
                  ref={emailRef}
                  autoFocus={false}
                />
              </div>
              {!emailValid || emailRegistered && (
                <p className="err-message">{emailRegistered ? "Email belongs to another user" : "Enter a valid email"}</p>
              )}
            </div>

            <div className=" col-12 ">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Phone number
              </label>
              <div
                className={`input-cont ${!phoneComplete && "err"}`}
                onClick={() => {
                  phoneRef.current.focus();
                }}
              >
                <input
                  type="tel"
                  placeholder="09011346539"
                  maxLength="11"
                  value={user.phone_number}
                  id="phone"
                  onChange={handleChange}
                  ref={phoneRef}
                  autoFocus={false}
                />
              </div>
              {!phoneComplete && (
                <p className="err-message">Phone number must be 11 digits</p>
              )}
            </div>

            <div className=" col-12 ">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Password
              </label>
              <div
                className={`input-cont ${passwordErrors.length > 0 && "err"}`}
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
              {passwordErrors.map((err,index)=>{
                return <p key={index} className="err-message">{err}</p>
              })}
            </div>

            <div className=" col-12 ">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Confirm password
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

            <div className="form-check">
              <input
                className="form-check-input"
                checked
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                I have read the{" "}
                <Link className="purple">rules and regulations</Link> and I
                consent to the all the{" "}
                <Link className="purple">versuz terms and conditions</Link>.
              </label>
            </div>

            <button
              className={`signup ${form1Complete ? "" : "disabled"}`}
              disabled={form1Complete ? false : true}
              onClick={() => {
                setView("two");
              }}
            >
              {/* {login.loading && "Checking..." || "Start playin'"} */}
              Continue
            </button>

            <p className="purple">
              Already have an account?{" "}
              <Link className="purple" to={"/login"}>
                Login
              </Link>{" "}
            </p>
          </form>
        )) }

        {
          view =="two" &&  (
          <form
            className="form2"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="img-cont">
              <input
                type="file"
                onChange={convertImage}
                accept="image/*"
                style={{ visibility: "hidden", position: "absolute" }}
                ref={uploadRef}
              />
              <img
                src={base64Image == "" ? upload : base64Image}
                alt=""
                onClick={() => {
                  uploadRef.current.click();
                }}
              />
              <h3
                onClick={() => {
                  uploadRef.current.click();
                }}
              >
                {base64Image == "" ? "Set a" : "Update"} profile photo
              </h3>
              {/* <p>{base64Image}</p> */}
            </div>

            <div className=" col-12 ">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Full Name
              </label>
              <div
                className="input-cont"
                onClick={() => {
                  fullNameRef.current.focus();
                }}
              >
                <input
                  type="text"
                  placeholder="Odogwu Spender aka Spend it!"
                  value={user.full_name}
                  id="fullname"
                  onChange={handleChange}
                  ref={fullNameRef}
                  autoFocus={false}
                />
              </div>
            </div>

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
                  placeholder="odogwu_malay"
                  value={user.username}
                  id="username"
                  onChange={handleChange}
                  ref={usernameRef}
                  autoFocus={false}
                />
              </div>
              {usernameRegistered && (
                <p className="err-message">Sorry this username has already been taken</p>
              )}
            </div>

            <div className=" col-12 ">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Date of Birth
              </label>
              <div
                className="input-cont"
                onClick={() => {
                  dobRef.current.focus();
                }}
              >
                <input
                  type="date"
                  placeholder="odogwu_malay"
                  value={user.dob}
                  id="dob"
                  onChange={handleChange}
                  ref={dobRef}
                  autoFocus={false}
                />
              </div>
            </div>

            <button 
            onClick={signup} 
            className={`signup ${form2Complete ? "" : "disabled"} ${loading ? "disabled" : ""}`}
              disabled={form2Complete || loading ? false : true}
            >{loading ? <Dots text="Creating account" /> : "Start Playin'"}</button>
          </form>
        )
        }
      </div>
    </div>
  );
}
