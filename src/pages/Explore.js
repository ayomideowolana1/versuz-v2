import React from "react";
import Navbar from "../components/Navbar";
import "../styles/tabs.css";
import "../styles/explore.css";
import filterIcon from "../images/dark-icon-wrapper.svg";


import { OneVOneCard } from "../components/cards";


function NewGameButton() {
  return (
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
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  );
}

export default function Explore() {
  const data = ["", "", "", "", "", "", "", "", ""];
  return (
    <div className="explore">
      <Navbar hasBackButton={false} />
      <ul className="nav nav-pills mb-3 tabs" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
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
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link "
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
      <div className="tab-content tabs-body container-fluid" id="pills-tabContent">
        <div
          className="tab-pane fade show active row"
          id="pills-all"
          role="tabpanel"
          aria-labelledby="pills-all-tab"
        >
          All
        </div>

        <div
          className="tab-pane fade show row "
          id="pills-1v1"
          role="tabpanel"
          aria-labelledby="pills-1v1-tab"
        >
          <div className="cards">
            {data.map((item, index) => {
              return <OneVOneCard paired={false} key={index} />;
            })}
          </div>
        </div>

        <div
          className="tab-pane fade row"
          id="pills-pool"
          role="tabpanel"
          aria-labelledby="pills-pool-tab"
        >
          Pool
        </div>

        <div
          className="tab-pane fade row"
          id="pills-tournament"
          role="tabpanel"
          aria-labelledby="pills-tournament-tab"
        >
          Tournament
        </div>

        <div
          className="tab-pane fade row"
          id="pills-filter"
          role="tabpanel"
          aria-labelledby="pills-filter-tab"
        >
          Filter
        </div>
      </div>
      <NewGameButton />
    </div>
  );
}
