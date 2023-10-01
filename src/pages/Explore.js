import React,{useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import "../styles/tabs.css";
import "../styles/explore.css";
import filterIcon from "../images/dark-icon-wrapper.svg";
import { Link } from "react-router-dom";
import { OneVOneCard } from "../components/cards";
import { getAvailableGamesAsync } from "../redux/slices/exploreSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../App";



function NewGameButton() {
  return (
    <Link to="/new-game">
      <button className="new-game">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 6V18M18 12L6 12"
            stroke="#FCFDFD"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </Link>
  );
}

export default function Explore() {
  const dispatch = useDispatch()
  const unpaired_games = useSelector(state => state.explore.games)
  
  const data = ["", "", "", "", "", "", "", "", ""];
  const loading = useSelector(state => state.explore.loading)
  
  
  useEffect(()=>{
    dispatch(getAvailableGamesAsync())
  },[])
  return (
    <>
      <Navbar hasBackButton={false} />
      <div className="explore">
        <ul className="nav nav-pills mb-3 tabs" id="pills-tab" role="tablist">
          {/* <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="pills-all-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-all"
              type="button"
              role="tab"
              aria-controls="pills-all"
              aria-selected="true"
            >
              All
            </button>
          </li> */}
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="pills-1v1-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-1v1"
              type="button"
              role="tab"
              aria-controls="pills-1v1"
              aria-selected="true"
            >
              1v1
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-pool-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-pool"
              type="button"
              role="tab"
              aria-controls="pills-pool"
              aria-selected="false"
            >
              Pool
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-tournament-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-tournament"
              type="button"
              role="tab"
              aria-controls="pills-tournament"
              aria-selected="false"
            >
              Tournaments
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-filter-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-filter"
              type="button"
              role="tab"
              aria-controls="pills-filter"
              aria-selected="false"
            >
              <img src={filterIcon} alt="" />
            </button>
          </li>
        </ul>

        {loading ? 
        <Loading />
        :
        <div
          className="tab-content tabs-body container-fluid"
          id="pills-tabContent"
        >
          

          <div
            className="tab-pane fade show active"
            id="pills-1v1"
            role="tabpanel"
            aria-labelledby="pills-1v1-tab"
          >
            <div className="cards">
              {unpaired_games.map((item, index) => {
                return (
                  <OneVOneCard key={index} data={item} index={index} paired={false}  />
                );
              })}
            </div>
          </div>

          <div
            className="tab-pane fade "
            id="pills-pool"
            role="tabpanel"
            aria-labelledby="pills-pool-tab"
          >
            <div className="cards">Pool</div>
          </div>

          <div
            className="tab-pane fade "
            id="pills-tournament"
            role="tabpanel"
            aria-labelledby="pills-tournament-tab"
          >
            <div className="cards">Tournament</div>
          </div>

          <div
            className="tab-pane fade "
            id="pills-filter"
            role="tabpanel"
            aria-labelledby="pills-filter-tab"
          >
            <div className="cards">Filter</div>
          </div>
        </div>
      }

        <NewGameButton />
      </div>
    </>
  );
}
