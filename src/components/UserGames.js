import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../styles/user-games.css";
import { getUnpairedGamesAsync } from "../redux/slices/gamesSlice";

function getGreaterDate(userDate,oppDate){
  const dateStr1 = userDate;
const dateStr2 = oppDate;

// Convert date strings to Date objects
const date1 = new Date(userDate);
const date2 = new Date(oppDate);

// Compare the two dates
if (date1 < date2) {
  return dateStr2
} else if (date1 > date2) {
  return dateStr1
  
} else {
  return dateStr1
}
}

function formatDateToYYYYMMDDHHMMSS(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}




export default function UserGames() {
  const games = useSelector((state) => state.games.userGames);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreateNewGameClick = () => {
    navigate("/new-game");
  };

  const showGameDetails = () => {
    navigate("/new-game");
  };

  useEffect(() => {
    dispatch(getUnpairedGamesAsync());
  }, []);

  return (
    <>
      <div className="user-games" id="my-games">
        <div className="top">
          <h2>Your games </h2>
          <button onClick={handleCreateNewGameClick}>
            <svg
              width="25"
              height="26"
              viewBox="0 0 25 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.3392 14.4008H14.0693V22.6707H11.3126V14.4008H3.04272V11.6442H11.3126V3.37427H14.0693V11.6442H22.3392V14.4008Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
        <div className="games">
          {games.map((game) => {
            let status = ""
            let endDate = getGreaterDate(game.end_date,game.opponent[0].end_date)
            let now = formatDateToYYYYMMDDHHMMSS(new Date())
            let lastDate = getGreaterDate(now,endDate)
            if(lastDate != now){
              status="ENDED"
            }else{
              status="ON-GOING"
            }
            
            return (
              <Link key={game.id} to={`/match/${game.pair_code}`}>
                <div  id={game.id} className="paired-game">
                  <div className="section">
                    <div className="score">
                      <img src="" alt="" />
                      <span>
                        {game.number_of_wins}- {game.opponent[0].number_of_wins}
                      </span>
                      <img src="" alt="" />
                    </div>
                    <div className="payout">
                      <h3>₦{game.stake * 2}</h3>
                      <p>Potential Payout</p>
                    </div>
                  </div>
                  <div className="section two">
                    <div>
                      <h3>{game.end_date.split("T")[1]}</h3>
                      <p>
                        {game.number_of_games -
                          game.played +
                          (game.number_of_games - game.opponent[0].played)}{" "}
                        games left
                      </p>
                    </div>

                    <div>
                      <p>status</p>
                      <span className="ongoing">{status}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
