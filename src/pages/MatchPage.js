import React, { useEffect, useState } from "react";
import { getMatchAsync } from "../redux/slices/gamesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import "../styles/matchPage.css";

function formatDate(inputDate) {
  const parts = inputDate.split(' ');
  const datePart = parts[0];
  const timePart = parts[1];

  const [year, month, day] = datePart.split('-');
  let [hours, minutes, seconds] = timePart.split(':');

  const meridiem = hours >= 12 ? 'PM' : 'AM';

  // Convert 24-hour format to 12-hour format
  hours = hours % 12 || 12;

  const formattedDate = `${day}/${month}/${year} - ${hours}:${minutes} ${meridiem}`;

  return formattedDate;
}

function ForeCast(props){
  const {data} = props
  console.log(data)
  return(
    <div className="forecast">
      <div className="top">
        <span className="comp">{data.fixture.competition}</span>
        <span className="comp">{formatDate(data.fixture.date)}</span>
        
      </div>
      <div className="teams">
        <div className="team">
          
          <img 
          src={`${process.env.REACT_APP_BASE_URL}${data.fixture.home_team_crest}`}
           alt=""
            />
          <span className="name">{data.fixture.home_team}</span>

          <span className="score">{data.fixture.home_goals}</span>
          
        </div>
        <div className="team">
          <img 
          src={`${process.env.REACT_APP_BASE_URL}${data.fixture.away_team_crest}`}
           alt=""
            />
          <span className="name">{data.fixture.away_team}</span>
          <span className="score">{data.fixture.away_goals}</span>
          
        </div>

        <div className="end">
          <span className="selection">{data.forecast}</span>
          <span className="status">On-going</span>
        </div>
      </div>
    </div>
  )
}

const GameView = (props) => {
  const [active, setActive] = useState("stats");

  const handleChange = (e) => {
    setActive(e.target.id);
  };

  const { data } = props;

  const [gamesPlayedTotal, setGamesPlayedTotal] = useState(10);
  const [oddsTotal, setOddsTotal] = useState(data.user.odds + data.opponent.odds);
  const [gamesWonTotal, setGamesWonTotal] = useState(
    data.opponent.number_of_wins + data.user.number_of_wins
  );

  return (
    <>
      <div className="page-header">
        <h1>₦{data.user.potential_win}</h1>
        <div className="score-board">
          <div className="user">
            <img
              src={`${process.env.REACT_APP_BASE_URL}${data.user.user.profile_pic}`}
              alt=""
            />
            <span className="name">{data.user.user.username}</span>
            <span className="games-left">
              {" "}
              {10 - data.user.played} games left
            </span>
          </div>
          <div className="score">
            <h1>
              {data.user.number_of_wins} - {data.opponent.number_of_wins}
            </h1>
          </div>
          <div className="user">
            <img
              src={`${process.env.REACT_APP_BASE_URL}${data.opponent.user.profile_pic}`}
              alt=""
            />
            <span className="name">{data.opponent.user.username}</span>
            <span className="games-left">
              {10 - data.opponent.played} games left
            </span>
          </div>
        </div>
      </div>


      <div className="body">
        <div className="tabs">
          <span
            onClick={handleChange}
            id={`stats`}
            className={active == "stats" ? "active" : ""}
          >
            Stats
          </span>
          <span
            onClick={handleChange}
            id={`games`}
            className={active == "games" ? "active" : ""}
          >
            Games
          </span>
        </div>
        
        {active == "stats" && 
        <div className="main">
          <div className="stat ">
            <p>
              <span>{data.user.played}</span>
              <span>Games played</span>
              <span>{data.opponent.played}</span>
            </p>
            <div className="line">
              <div
                style={{
                  width: `${(data.user.played / gamesPlayedTotal) * 100}%`,
                }}
                className="a"
              ></div>
              <div
                style={{
                  width: `${(data.opponent.played / gamesPlayedTotal) * 100}%`,
                }}
                className="b"
              ></div>
            </div>
          </div>

          <div className="stat ">
            <p>
              <span>{data.user.number_of_wins}</span>
              <span>Games won</span>
              <span>{data.opponent.number_of_wins}</span>
            </p>
            <div className="line">
              <div
                style={{
                  width: `${
                    (data.user.number_of_wins / gamesWonTotal) * 100
                  }%`,
                }}
                className="a"
              ></div>
              <div
                style={{
                  width: `${
                    (data.opponent.number_of_wins / gamesWonTotal) * 100
                  }%`,
                }}
                className="b"
              ></div>
            </div>
          </div>
          {/* <div className="stat mt-3">
            <p>
              <span>3</span>
              <span>Games lost</span>
              <span>12</span>
            </p>
            <div className="line">
              <div
                style={{ width: `${(3 / gamesPlayedTotal) * 100}%` }}
                className="a"
              ></div>
              <div
                style={{ width: `${(12 / gamesPlayedTotal) * 100}%` }}
                className="b"
              ></div>
            </div>
          </div> */}

          <div className="stat ">
            <p>
              <span>{data.user.odds / 1000}</span>
              <span>Odds won</span>
              <span>{data.opponent.odds / 1000 }</span>
            </p>
            <div className="line">
              <div
                style={{ width: `${(data.user.odds / oddsTotal) * 100}%` }}
                className="a"
              ></div>
              <div
                style={{ width: `${(data.opponent.odds / oddsTotal) * 100}%` }}
                className="b"
              ></div>
            </div>
          </div>
        </div>
        }
        {active == "games" && 
          <div className="main">
            <h4>{data.user.user.username}'s games</h4>
            <div className="forecasts">
              {data.user.forecasts.map((item,index) =>{
                return (
                  <ForeCast key={index} data={item}/>
                )
              })}
            </div>
            <h4>{data.opponent.user.username}'s games</h4>
            <div className="forecasts">
              {data.opponent.forecasts.map((item,index) =>{
                return (
                  <ForeCast key={index} data={item}/>
                )
              })}
            </div>
          </div>
         }
      </div>
    </>
  );
};

export default function MatchPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.games.matchData);

  useEffect(() => {
    dispatch(getMatchAsync(id));
  }, []);

  return (
    <>
      <Nav />
      {JSON.stringify(data) !== "{}" && <GameView data={data} />}
    </>
  );
}
