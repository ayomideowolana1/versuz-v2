import React from "react";
import oppIcon from "../images/opponent-icon.png";
import Countdown from "./CountDown";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import poolIcon from "../images/pool-icon.svg";
import _1v1Icon from "../images/1v1-icon.svg";
import tournamentIcon from "../images/tournament-icon.svg";

export default function Game(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { time, stake, id, code, user,type,number_of_games } = props.data;

  const targetTime = new Date(time).getTime();
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  const pair = (e) => {
    navigate(`/select/${id}`);
  };

  return (
    <>
      <div className="game" onClick={pair}>
        <div className="inner">
          <div className="cont top">
            <span>Games: {number_of_games}</span>
            <span>BET CODE: {code}</span>
          </div>
          <div className="cont center">
            <div className="user">
              <img
                className="user-image"
                src={`${process.env.REACT_APP_BASE_URL}${user.profile_pic}`}
                alt=""
              />

              {/* stats */}
              <div className="stats">
                <h1>{user.username}</h1>
                <div className="comps">
                  <div className="comp">
                    <img src={_1v1Icon} alt="" />
                    <span>0</span>
                  </div>
                  <div className="comp">
                    <img src={poolIcon} alt="" />
                    <span>0</span>
                  </div>
                  <div className="comp">
                    <img src={tournamentIcon} alt="" />
                    <span>0</span>
                  </div>
                </div>
              </div>
            </div>

            {/* amount */}
            <div className="amount">
              <h1>₦{(stake * 2 * 0.95).toLocaleString("en-US")}</h1>
              <p>05:56:10</p>
              <span>Time left</span>
            </div>
          </div>
          <div className="cont">
            <div className="stake-amount">
              <p>₦{stake.toLocaleString("en-US")} </p>
              <span>Stake amount</span>
            </div>
            {loggedIn ? <a>JOIN GAME</a> : <Link to="/login">JOIN GAME </Link>}
          </div>
        </div>
      </div>
    </>
  );
}
