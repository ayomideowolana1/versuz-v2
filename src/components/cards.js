import React, { useState } from "react";
import oneVoneIcon from "../images/1v1-icon.svg";
import userIcon from "../images/user-icon.png";
import { Link } from "react-router-dom";
import CountdownTimer from "../components/CountDown";
import { useNavigate } from "react-router-dom";
import { setPairDetails } from "../redux/slices/ticketSlice";
import { useDispatch } from "react-redux";
import "../styles/cards.css";

export function OneVOneCard(props) {
  const { paired, userCard, index, data } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const pair = () => {
    navigate(`/join/${data.id}`);
    console.log(data);
    // dispatch(setPairDetails({id:data.id,stake:data.stake,number_of_games:data.number_of_games}))
  };

  if (paired) {
    return (
      <Link to={`/game/${data.pair_code}`}>
        <div className="onevone card-cont">
          <div className="card-main paired border">
            <div className="top">
              <img src={oneVoneIcon} alt="" />
              <span className="amount">₦{Number(data.potential_win)}</span>
            </div>
            <div className="center ">
              <img className="userIcon" src={userIcon} alt="" />
              <span>
                {data.number_of_wins} - {data.opponent[0].number_of_wins}
              </span>
              <img className="userIcon" src={userIcon} alt="" />
            </div>
            <div className="bottom">
              <div className="amount">
                <span className="value">
                  <CountdownTimer date={data.end_date} />
                </span>
                <span className="title">*6 games left</span>
              </div>
              <div className="other">
                {/* <span className="lost">Lost</span> */}
                <span className="won">{data.ongoing ? "On-going" : "Won"}</span>
                {/* <span className="on-going">On-Going</span> */}
              </div>
            </div>
          </div>

          <div className="card-info">
            <span>
              <b>Games 10</b>
            </span>
            <span>*Time left to join 05:06:15</span>
          </div>
        </div>
      </Link>
    );
  } else if (!paired && !userCard) {
    return (
      <div className="onevone card-cont">
        <div className="card-main border">
          <div className="top">
            <img src={oneVoneIcon} alt="" />
            <span className="amount">₦{data.stake * 2}</span>
          </div>
          {(userCard && (
            <div className="center">
              <span className="name">Waiting to pair...</span>
            </div>
          )) || (
            <div className="center">
              {/* <img className="userIcon" src={userIcon} alt="" /> */}
              {data.profile_pic}
              {data.profile_pic ? (
                <img
                  className="userIcon"
                  style={{ borderRadius: "50%" }}
                  src={` ${data.profile_pic}`}
                />
              ) : (
                <img
                  className="userIcon"
                  src={`https://www.backend.versuz.co/media/blank.jpg`}
                />
              )}
              <span className="name">{data.user.username}</span>
            </div>
          )}
          <div className="bottom">
            <div className="amount">
              <span className="title">Stake Amount</span>
              <span className="value">₦{data.stake}</span>
            </div>

            <div className="button" onClick={pair}>
              {(userCard && <button>VIEW</button>) || <button>JOIN </button>}
            </div>
          </div>
        </div>

        <div className="card-info">
          <span>
            <b>Games {data.number_of_games}</b>
          </span>
          <span style={{ display: "flex", gap: "5px" }}>
            *Time left to join <CountdownTimer date={data.end_date} />{" "}
          </span>
        </div>
      </div>
    );
  } else if (!paired && userCard) {
    return (
      <div className="onevone card-cont">
        <div className="card-main border">
          <div className="top">
            <img src={oneVoneIcon} alt="" />
            <span className="amount">₦{data.stake * 2}</span>
          </div>
          {(userCard && (
            <div className="center">
              <span className="name">Waiting to pair...</span>
            </div>
          )) || (
            <div className="center">
              <img className="userIcon" src={userIcon} alt="" />
              <span className="name">{"dummy amount"}</span>
            </div>
          )}
          <div className="bottom">
            <div className="amount">
              <span className="title">Stake Amount</span>
              <span className="value">₦{data.stake}</span>
            </div>

            <div className="button">
              {(userCard && <button>REVIEW</button>) || (
                <button onClick={pair}>JOIN </button>
              )}
            </div>
          </div>
        </div>

        <div className="card-info">
          <span>
            <b>Games {data.number_of_games}</b>
          </span>
          <span style={{ display: "flex", gap: "5px" }}>
            *Time left to join <CountdownTimer date={data.end_date} />{" "}
          </span>
        </div>
      </div>
    );
  }
}
