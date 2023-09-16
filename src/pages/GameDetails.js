import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { GameDetailsNav } from "../components/Navbar";
import userIcon from "../images/user-icon.png";
import "../styles/game-details.css";

function capitalize(string) {
  // Check if the input string is empty
  if (string.length === 0) {
    return "";
  }

  // Capitalize the first letter and concatenate it with the rest of the string
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function convertTo12HourFormat(time24) {
  // Split the input time string into hours, minutes, and seconds
  const [hours, minutes] = time24.split(":").map(Number);

  // Determine whether it's AM or PM
  const period = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format and handle midnight (12:00 AM) and noon (12:00 PM)
  const hours12 = hours % 12 || 12;

  // Create the formatted 12-hour time string
  const time12 = `${hours12}:${String(minutes).padStart(2, "0")}${period}`;

  return time12;
}

function User({ data, played }) {
  return (
    <div className="user">
      <img src={userIcon} alt="" />
      <h3>{capitalize(data.username)}</h3>
      <span>*{10 - played} games left</span>
    </div>
  );
}

function Badge(props) {
  const { status } = props;
  return <span className={`badge ${status}`}>{status}</span>;
}

function formatDate(inputDate) {
  const parts = inputDate.split(" ");
  const datePart = parts[0];
  const timePart = parts[1];

  const [year, month, day] = datePart.split("-");
  let [hours, minutes, seconds] = timePart.split(":");

  const meridiem = hours >= 12 ? "PM" : "AM";

  // Convert 24-hour format to 12-hour format
  hours = hours % 12 || 12;

  const formattedDate = `${day}/${month}/${year} - ${hours}:${minutes} ${meridiem}`;

  return formattedDate;
}

function ForeCast(props) {
  const { data } = props;
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (data.has_started && !data.open) {
      setStatus("ended");
    } else if (data.has_started && data.open) {
      setStatus("live");
    } else {
      setStatus(
        `${data.fixture.date.split(" ")[0]} / ${convertTo12HourFormat(
          data.fixture.date.split(" ")[1]
        )}`
      );
    }
  }, []);
  return (
    <div className="forecast">
      <div className="top">
        <span className="comp">{data.fixture.competition}</span>
        <span
          className={`badge ${status != "ended" || "live" ? "date" : status}`}
        >
          {status}
        </span>
        {/* <span className="comp">{formatDate(data.fixture.date)}</span> */}
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
          <span className={`status badge ${status != "ended" || "live" ? "date" : status}`}>
          
          {data.has_started && data.open ?  "On-going" : "" }
          {!data.has_started && !data.open ?  "Ended" : "" }
          {data.has_started && !data.open ?  "Not started" : "" }
            
            </span>
        </div>
      </div>
    </div>
  );
}

export default function Game() {
  const { id } = useParams();
  const navigate = useNavigate();
  // validate game ID

  const [active, setActive] = useState("stats");
  const [idValid, setIdValid] = useState(false);

  const handleChange = (e) => {
    setActive(e.target.id);
  };

  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [opp, setOpp] = useState(null);

  // const [gamesPlayedTotal, setGamesPlayedTotal] = useState(10);
  // const [oddsTotal, setOddsTotal] = useState(
  //   data.user.odds + data.opponent.odds
  // );
  // const [gamesWonTotal, setGamesWonTotal] = useState(
  //   data.opponent.number_of_wins + data.user.number_of_wins
  // );

  const getGameData = async () => {
    const url = `https://www.versuz.co/match/${id}`;
    const config = {
      method: "GET",
      headers: {
        reactkey: process.env.REACT_APP_AUTH_KEY,
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({email:email}),
    };

    const response = await fetch(url, config)
      .then((data) => data.json())
      .catch((err) => err);

    if (response.success) {
      setIdValid(true);
      setData(response);
      setUser(response.user);
      setOpp(response.opponent);
      // console.log(data)
    } else {
      setTimeout(() => {
        navigate("/explore");
      }, 1000);
    }

    // console.log(JSON.stringify(response));
  };

  useEffect(() => {
    getGameData();
  }, []);

  return (
    <>
      {idValid && (
        <div className="game-id">
          <header>
            <GameDetailsNav />
            <div className="header-body">
              <div className="win">
                <p>*Potential Win</p>
                <h1>₦{user.potential_win}</h1>
              </div>

              <div className="users">
                <User data={user.user} played={user.played} />
                <div className="info">
                  <div className="text">
                    <h1>
                      {user.number_of_wins} - {opp.number_of_wins}
                    </h1>
                    <p>00 : 00 : 00</p>
                  </div>
                  <div className="badge-cont">
                    <Badge status="won" />
                  </div>
                </div>
                <User data={opp.user} played={opp.played} />
              </div>
            </div>
          </header>
          <main>
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

            {active == "stats" && (
              <div className="main">
                <div className="stat ">
                  <p>
                    <span>{user.played}</span>
                    <span className="center">Games played</span>
                    <span>{opp.played}</span>
                  </p>
                  <div className="line">
                    <div
                      style={{
                        width: `${
                          (user.played / (opp.played + user.played)) * 100
                        }%`,
                      }}
                      className="a"
                    ></div>
                    <div
                      style={{
                        width: `${
                          (opp.played / (opp.played + user.played)) * 100
                        }%`,
                      }}
                      className="b"
                    ></div>
                  </div>
                </div>

                <div className="stat ">
                  <p>
                    <span>{user.number_of_wins}</span>
                    <span className="center">Games won</span>
                    <span>{opp.number_of_wins}</span>
                  </p>
                  <div className="line">
                    <div
                      style={{
                        width: `${
                          (user.number_of_wins /
                            (user.number_of_wins + opp.number_of_wins)) *
                          100
                        }%`,
                      }}
                      className="a"
                    ></div>
                    <div
                      style={{
                        width: `${
                          (opp.number_of_wins /
                            (user.number_of_wins + opp.number_of_wins)) *
                          100
                        }%`,
                      }}
                      className="b"
                    ></div>
                  </div>
                </div>

                <div className="stat ">
                  <p>
                    <span>{user.odds_won}</span>
                    <span className="center">Odds won</span>
                    <span>{opp.odds_won}</span>
                  </p>
                  <div className="line">
                    <div
                      style={{
                        width: `${
                          (user.odds_won / (opp.odds_won + user.odds_won)) * 100
                        }%`,
                      }}
                      className="a"
                    ></div>
                    <div
                      style={{
                        width: `${
                          (opp.odds_won / (opp.odds_won + user.odds_won)) * 100
                        }%`,
                      }}
                      className="b"
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {active == "games" && (
              <div className="main">
                <p>{capitalize(user.user.username)}'s games</p>
                <div className="forecasts">
                  {user.forecasts.map((item, index) => {
                    return <ForeCast key={index} data={item} />;
                  })}
                </div>
                <p>{capitalize(opp.user.username)}'s games</p>
                <div className="forecasts">
                  {opp.forecasts.map((item, index) => {
                    return <ForeCast key={index} data={item} />;
                  })}
                </div>
              </div>
            )}
          </main>
        </div>
      )}
    </>
  );
}
