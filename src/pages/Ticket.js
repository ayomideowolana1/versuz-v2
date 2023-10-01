import React, { useEffect, useState } from "react";
import "../styles/ticket.css";
import { useParams } from "react-router-dom";

export default function Ticket() {
  const [games, setGames] = useState([]);
  const { id } = useParams();

  const getGames = async () => {
    const url = `https://www.backend.versuz.co/betcode/${id}`;

    const config = {
      method: "GET",
      headers: {
        reactkey: process.env.REACT_APP_AUTH_KEY,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, config).then((data) => data.json());
    // .catch((err) => setredirect({...redirect,status:true}));

    console.log(response);

    if (response.success) {
      setGames(response.data.fixtures);
      //   setUser(response.data.user);
      //   setStake(response.data.stake);
      //   setShow(true);
      //   setLoading(false)
    } else {
      //   // setLoginErr(true);
      //   setLoading(false)
    }
  };

  useEffect(() => {
    getGames();
  }, []);
  return (
    <>
      <div className="ticket-cont">
        <div className="ticket">
          <div className="ticket-header">

            <div className="paired">
              <svg
                width="24"
                height="15"
                viewBox="0 0 24 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.9247 4.74481L23.7558 0.0407715L12.3081 4.47648L0.85498 0.0407715L1.69154 4.74481L8.69222 7.65266L2.65468 10.21L3.46923 14.7991L12.3081 11.3436L21.1416 14.7991L21.9561 10.21L15.9241 7.65266L22.9247 4.74481Z"
                  fill="black"
                />
              </svg>{" "}
              <img src="" alt="" /> <span>Username</span>
            </div>

            <div className="text">
              <span>Your Picks</span>
              <span>1 v 1</span>
            </div>
          </div>

          <div className="ticket-body">
            {games.map((game) => {
              return (
                <div className="ticket-selection">
                  <div className="teams">
                    <div className="team">
                      <img src={`https://www.backend.versuz.co/${game.fixture.home_team_crest}`} alt="" /> 
                      <span>{game.fixture.home_team}</span>
                      </div>
                      <div className="team">
                      <img src={`https://www.backend.versuz.co/${game.fixture.away_team_crest}`}  alt="" /> 
                      <span>{game.fixture.away_team}</span>
                      </div>
                  </div>
                  <div className="odds">
                    <span className="choice">Home</span>
                    <span>1.5</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <button className="action">
          View Match{" "}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 17L14 12L10 7"
              stroke="#FCFDFD"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>{" "}
        </button>
      </div>
    </>
  );
}
