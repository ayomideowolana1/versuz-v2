import React, { useState } from "react";
import { GamesNav } from "../components/Navbar";
import "../styles/games.css";
import "../styles/tabs.css";
import image from "../images/games-empty.svg";

import { OneVOneCard } from "../components/cards";

function GamesEmpty() {
  return (
    <div className="games-empty">
      <img src={image} alt="" style={{ margin: "auto" }} />
      <h3>You don't have any games</h3>
      <button>Create new game</button>
    </div>
  );
}

function GamesNotEmpty() {
  const [pairedGames, setPairedGames] = useState(["", "", "", ""]);
  const [unpairedGames, setUnpairedGames] = useState(["", "", "", ""]);

  return (
    <div className="games-not-empty">
      <ul className="nav nav-pills mb-3 tabs" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-home"
            type="button"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
          >
            Paired
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="pills-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-profile"
            type="button"
            role="tab"
            aria-controls="pills-profile"
            aria-selected="false"
          >
            Unpaired
          </button>
        </li>
      </ul>
      <div className="tab-content tabs-body" id="pills-tabContent">
        <div
          className="tab-pane fade show active "
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab "
        >
            <div className="cards">

            {pairedGames.map((game, index) => {
                return <OneVOneCard key={index} paired={true} />;
            })}
            </div>
        </div>
        <div
          className="tab-pane fade"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
        >
            <div className="cards">
            {pairedGames.map((game, index) => {
                return <OneVOneCard key={index} paired={false} userCard={true} />;
            })}
            </div>
        </div>
      </div>
    </div>
  );
}

export default function Games() {
  const [games, setGames] = useState(["", "", "", ""]);
  return (
    <div className="games">
      <GamesNav />

      {(games.length > 0 && <GamesNotEmpty />) || <GamesEmpty />}
    </div>
  );
}
