import React, { useState } from "react";
import oneVoneIcon from "../images/1v1-icon.svg";
import userIcon from "../images/user-icon.png";
import "../styles/cards.css";

export function OneVOneCard(props) {
  
  const {paired,userCard} = props

  if (paired) {
    return (
      <div className="onevone card-cont">
        <div className="card-main paired border">
          <div className="top">
            <img src={oneVoneIcon} alt="" />
            <span className="amount">₦145,000</span>
          </div>
          <div className="center ">
            <img className="userIcon" src={userIcon} alt="" />
              <span>5 - 7</span>
            <img className="userIcon" src={userIcon} alt="" />
            
          </div>
          <div className="bottom">
            <div className="amount">
              <span className="value">05:06:20</span>
              <span className="title">*6 games left</span>
            </div>
            <div className="other">

            {/* <span className="lost">Lost</span> */}
            <span className="won">Won</span>
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
    );
  } else {
    return (
      <div className="onevone card-cont">
        <div className="card-main border">
          <div className="top">
            <img src={oneVoneIcon} alt="" />
            <span className="amount">₦145,000</span>
          </div>
          {
            userCard 
            && 
              <div className="center">
              
              <span className="name">Waiting to pair...</span>
            </div>  
          ||
            <div className="center">
              <img className="userIcon" src={userIcon} alt="" />
              <span className="name">Starboy</span>
            </div>
          }
          <div className="bottom">
            <div className="amount">
              <span className="title">Stake Amount</span>
              <span className="value">₦74,000</span>
            </div>
            <div className="button">
            {
            userCard 
            &&
            <button>VIEW</button>
            || 
            <button>JOIN GAME</button>
            }

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
    );
  }
}
