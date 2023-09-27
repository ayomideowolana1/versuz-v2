import React from "react";
import { NewGameNav } from "../components/Navbar";
import "../styles/searchbar.css";
import "../styles/new-game.css";
import swords from "../images/1v1-swords.svg";
import stadium from "../images/stadium.svg";
import cup from "../images/cup.svg";
import { Link } from "react-router-dom";

function SearchBar() {
  return (
    <div className="searchbar">
      <input type="text" placeholder="Enter Bet Code" />
      <button>JOIN GAME</button>
    </div>
  );
}

function Text(props) {
  const { mainText, subText } = props;

  return (
    <div className="text">
      <h1>{mainText}</h1>
      <p>{subText}</p>
    </div>
  );
}

export default function NewGame() {
  return (
    <div className="new-game">
      <NewGameNav />
      {/* <SearchBar /> */}
      <section>
        <h3>Create Game</h3>
        <div className="choices">
          <Link to="/select/new-1v1">
            <div className="choice onevone">
              <Text
                mainText={"1v1"}
                subText={"Connect with a friend or pair with someone"}
              />
              <img src={swords} alt="" />
            </div>
          </Link>

          <Link to="/select/new-pool">
            <div className="choice pool">
              <Text
                mainText={"Pool"}
                subText={"Connect with a friend or pair with someone"}
              />
              <img src={stadium} alt="" />
            </div>
          </Link>

          <Link to="/select/new-tournament">
            <div className="choice tournament">
              <Text
                mainText={"Tournament"}
                subText={"Connect with a friend or pair with someone"}
              />
              <img className="cup" src={cup} alt="" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
