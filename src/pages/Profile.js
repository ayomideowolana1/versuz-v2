import React, { useEffect, useState } from "react";
import { ProfileNav } from "../components/Navbar";
import "../styles/profile.css";
import { Link, useNavigate } from "react-router-dom";

function LogoutModal(){
  const navigate= useNavigate()
  return (
    <div class="modal  fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      {/* <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">New message</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div> */}
      <div class="modal-body">
        <h1>Are you sure you want to logout?</h1>
        <button  type="button" data-bs-dismiss="modal" onClick={()=>{
            localStorage.setItem("vsrz","")
              navigate("login")
        }}>Continue</button>
        <button type="button" data-bs-dismiss="modal" className="white"> Cancel</button>
        
      </div>
      {/* <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Send message</button>
      </div> */}
    </div>
  </div>
</div>
  )
}

export default function Profile() {
const [user,setUser] = useState({})

const getProfileData= async ()=>{
  const url = `https://www.backend.versuz.co//accounts/user_profile`;
    
    const config = {
      method: "GET",
      headers: {
        reactkey: process.env.REACT_APP_AUTH_KEY,
        "Content-Type": "application/json",
        "Authorization" : `Token ${JSON.parse(sessionStorage.getItem("vsrz")).token}`
      },
      // body: JSON.stringify(user),
    };

    const response = await fetch(url, config)
      .then((data) => data.json())
      .catch((err) => err);

    setUser(response.data);

    

    // if (response.success) {
    //   setGames(response.data.fixtures)
    //   setUser(response.data.user)
    //   setStake(response.data.stake)
    //   setShow(true)
      
    // } else {
      
    //   // setLoginErr(true);
    // }
    // {"success":true,"data":{"username":"core","profile_pic":"blank.jpg","money_balance":3153,"games_played":22,"win_percentage":0.0,"odds_won":0.0,"current_streak":0,"longest_streak":0}}
}

useEffect(()=>{
  getProfileData()
},[])

if(user != {}){
  return (
    <div className="profile">
      <ProfileNav />
      <div className="profile-body">
        <div className="user">
        <img src={`https://www.backend.versuz.co/${user.profile_pic}`} alt="" />
          <span>@{user.username}</span>
          <button>Edit Profile</button>
        </div>
        <Link to="/wallet">
          <div className="wallet">
            <h3>Wallet</h3>
            <div className="amount">
              <svg
                width="21"
                height="18"
                viewBox="0 0 21 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.1 5.004C19.045 5 18.984 5 18.92 5H16.395C14.327 5 12.558 6.628 12.558 8.75C12.558 10.872 14.328 12.5 16.395 12.5H18.92C18.984 12.5 19.045 12.5 19.102 12.496C19.527 12.4704 19.9282 12.2911 20.2309 11.9916C20.5335 11.6921 20.717 11.2927 20.747 10.868C20.751 10.808 20.751 10.743 20.751 10.683V6.817C20.751 6.757 20.751 6.692 20.747 6.632C20.717 6.20726 20.5335 5.80793 20.2309 5.50842C19.9282 5.2089 19.527 5.02963 19.102 5.004H19.1ZM16.172 9.75C16.704 9.75 17.135 9.302 17.135 8.75C17.135 8.198 16.704 7.75 16.172 7.75C15.639 7.75 15.208 8.198 15.208 8.75C15.208 9.302 15.639 9.75 16.172 9.75Z"
                  fill="black"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.918 14C18.9526 13.9986 18.987 14.0054 19.0184 14.0198C19.0499 14.0342 19.0775 14.0558 19.099 14.0829C19.1206 14.11 19.1354 14.1418 19.1424 14.1757C19.1493 14.2096 19.1481 14.2446 19.139 14.278C18.939 14.99 18.62 15.598 18.109 16.108C17.36 16.858 16.411 17.189 15.239 17.347C14.099 17.5 12.644 17.5 10.806 17.5H8.694C6.856 17.5 5.4 17.5 4.261 17.347C3.089 17.189 2.14 16.857 1.391 16.109C0.643 15.36 0.311 14.411 0.153 13.239C1.19209e-07 12.099 0 10.644 0 8.806V8.694C0 6.856 1.19209e-07 5.4 0.153 4.26C0.311 3.088 0.643 2.139 1.391 1.39C2.14 0.642 3.089 0.31 4.261 0.152C5.401 -4.47035e-08 6.856 0 8.694 0H10.806C12.644 0 14.1 1.19209e-07 15.239 0.153C16.411 0.311 17.36 0.643 18.109 1.391C18.62 1.903 18.939 2.51 19.139 3.222C19.1481 3.25537 19.1493 3.29042 19.1424 3.32432C19.1354 3.35822 19.1206 3.39 19.099 3.41708C19.0775 3.44417 19.0499 3.46579 19.0184 3.4802C18.987 3.4946 18.9526 3.50139 18.918 3.5H16.394C13.557 3.5 11.057 5.74 11.057 8.75C11.057 11.76 13.557 14 16.394 14H18.918ZM3.75 4C3.55109 4 3.36032 4.07902 3.21967 4.21967C3.07902 4.36032 3 4.55109 3 4.75C3 4.94891 3.07902 5.13968 3.21967 5.28033C3.36032 5.42098 3.55109 5.5 3.75 5.5H7.75C7.94891 5.5 8.13968 5.42098 8.28033 5.28033C8.42098 5.13968 8.5 4.94891 8.5 4.75C8.5 4.55109 8.42098 4.36032 8.28033 4.21967C8.13968 4.07902 7.94891 4 7.75 4H3.75Z"
                  fill="black"
                />
              </svg>
              <span style={{ fontSize: "20px" }}>N {Number(user.money_balance).toLocaleString()}</span>
            </div>
          </div>
        </Link>
        <div className="stats">
          <h3>Stats</h3>
  
          <div className="cards">
            <div className="dual">
              <div className="card" style={{background:"#CDCBFB"}}>
                <span>Matches</span>
                <h1>{user.games_played}</h1>
              </div>
              <div className="card" style={{background:"#8AEDB1"}}> 
                <span>Win Percentage</span>
                <h1>{user.win_percentage}%</h1>
              </div>
            </div>
  
            <div className="card" style={{background:"#EBFFB2"}}> 
              <span>Total Odds Won</span>
              <h1>{user.odds_won}</h1>
            </div>
  
            <div className="dual" >
              <div className="card" style={{background:"#FA767D"}}>
                <span>Current Streak</span>
                <h1>{user.current_streak}</h1>
              </div>
              <div className="card" style={{background:"#FFAEA7"}}>
                <span>Longest Winning Streak</span>
                <h1>{user.longest_streak}</h1>
              </div>
            </div>
  
            <div className="links">
              <div className="link">
                <h1>Game <span>{">"}</span></h1>
              </div>
              <div className="link">
                <h1>History <span>{">"}</span></h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LogoutModal />
    </div>
  );

}

}
