import React, { useEffect, useState } from "react";
import { GamesNav } from "../components/Navbar";
import "../styles/games.css";
import "../styles/tabs.css";
import image from "../images/games-empty.svg";
import { OneVOneCard } from "../components/cards";
import { setBetCodes, setLoading } from "../redux/slices/gamesSlice";


import { useDispatch, useSelector } from "react-redux";

import logo from "../images/versuz-icon.svg"
import "../styles/loading.css"

 const Loading =()=>{
  return (
      
    <div className="loading">

      <img src={logo} alt="" />

      {/* <h3>Loading... </h3> */}
      </div>
    
  )
}

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
  const pairedGames = useSelector(state => state.games.paired)
  const unpairedGames = useSelector(state => state.games.unpaired)

  useEffect(()=>{
    console.log(pairedGames,unpairedGames)
  },[])
  

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
              return <OneVOneCard key={index} paired={true} data={game} />;
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
            {unpairedGames.map((game, index) => {
              return <OneVOneCard key={index} paired={false} userCard={true}  data={game} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Games() {
  const [games, setGames] = useState(["", "", "", ""]);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.games.loading);

  const getUserGames = async () => {
    const url = `https://www.backend.versuz.co/user/betcodes`;
    dispatch(setLoading(true));

    const config = {
      method: "GET",
      headers: {
        reactkey: process.env.REACT_APP_AUTH_KEY,
        "Content-Type": "application/json",
        Authorization: `Token ${
          JSON.parse(sessionStorage.getItem("vsrz")).token
        }`,
      },
      // body: JSON.stringify(user),
    };

    const response = await fetch(url, config)
      .then((data) => data.json())
      .catch((err) => err);

    console.log(response);

    if (response.success) {
      dispatch(
        setBetCodes({
          paired: response.paired_betcodes,
          unpaired: response.unpaired_betcodes,
        })
      );
    } else {
    }
    
    dispatch(setLoading(false));
  };

  useEffect(() => {
    getUserGames();
    // console.log(JSON.stringify(sessionStorage.getItem("vsrz")))
  }, []);
  return (
    <div className="games">
      <GamesNav />

      {loading ? <Loading/>: 
      <>
      {games.length > 0  && !loading && <GamesNotEmpty /> || <GamesEmpty />}
      </>
      }
      
      

    </div>
  );
}


