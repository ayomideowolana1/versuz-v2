import React, { useState, useEffect } from "react";
import { JoinNav } from "../components/Navbar";
import userIcon from "../images/user-icon.png";
import { Link, useNavigate } from "react-router-dom";
import "../styles/join.css";
import { useParams } from "react-router-dom";
import { Loading } from "../App";
import { setPairDetails } from "../redux/slices/ticketSlice";
import { useDispatch } from "react-redux";

function convertToAmPm(time) {
  const [hourStr, minuteStr] = time.split(":");
  const hour = parseInt(hourStr, 10);

  const amPm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  const formattedTime = `${formattedHour}:${minuteStr} ${amPm}`;

  return formattedTime;
}

function Game(props) {
  const { data } = props;

  return (
    <div className="game">
      <div className="teams">
        <div className="team">
          <img
            src={`${process.env.REACT_APP_BASE_URL}${data.fixture.home_team_crest}`}
            alt=""
            className="team-image"
          />
          <span className="team-name">{data.fixture.home_team}</span>
        </div>
        <div className="team">
          <img
            src={`${process.env.REACT_APP_BASE_URL}${data.fixture.away_team_crest}`}
            alt=""
            className="team-image"
          />
          <span className="team-name">{data.fixture.away_team}</span>
        </div>
      </div>
      <div className="time">
        <div className="date">{data.fixture.date.split(" ")[0]}</div>
        <div className="time">
          {convertToAmPm(data.fixture.date.split(" ")[1])}
        </div>
      </div>
    </div>
  );
}

export default function Join() {
  const [games, setGames] = useState([]);
  const [user, setUser] = useState({});
  const [stake, setStake] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch()
  const [redirect, setredirect] = useState({
    status: false,
    location: "login",
  });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  
  const navigate = useNavigate();

  useEffect(() => {
    // if(redirect.status){navigate(redirect.location) }
    console.log(id);
  }, [redirect]);

  const getGames = async () => {
    const url = `https://www.backend.versuz.co/betcode/${id}`;

    const config = {
      method: "GET",
      headers: {
        reactkey: process.env.REACT_APP_AUTH_KEY,
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(user),
    };

    const response = await fetch(url, config).then((data) => data.json());
    // .catch((err) => setredirect({...redirect,status:true}));

    console.log(response);

    if (response.success) {
      setGames(response.data.fixtures);
      setUser(response.data.user);
      setStake(response.data.stake);
      setShow(true);
      setLoading(false)
    } else {
      // setLoginErr(true);
      setLoading(false)
    }
  };

  useEffect(() => {
    getGames();
    
  }, []);
  

  const proceed = ()=> {
    dispatch(setPairDetails({id,stake,number_of_games:games.length}));
    // console.log(id,stake)
    setTimeout(()=>{
      navigate(`/select/${id}`)
    },100)
  }

    return (
      <div className="join">
        <JoinNav />

        {loading ? <Loading /> : 
        <>
        <div className="header">
          <img src={userIcon} alt="" />
          <div className="header-text">
            <h1>{user? user.username: "User"} 's</h1>
            <h3>Picks</h3>
            <button>Stake - N{stake || "0.00"}</button>
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <>
          <div className="main">
            {games.map((game, index) => {
              return <Game key={index} data={game} />;
            })}
          </div>
        
          <button className="continue" onClick={proceed}>Continue</button>
        
          </>
        )}
        
        </>
        }
      

        </div>
    );
  }
// }
