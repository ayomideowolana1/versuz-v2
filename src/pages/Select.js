import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { JoinNav, SelectNav } from "../components/Navbar";
import "../styles/select.css";
import { Link, useParams, useNavigate, json } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
setView,
setCurrentRegion,
setCompetition,
setRegions,
setCompetitions,
setCurrentFixture,
} from "../redux/slices/selectSlice";
import { convertTo12HourFormat } from "./GameDetails";
import icon from "../images/versuz-icon.svg";
import {
updateSelectedOptions,
updateSelectedOptionsArray,
updateGames,
} from "../redux/slices/ticketSlice";
import { setDataLoading } from "../redux/slices/selectSlice";
import { Loading } from "../App";

function Arrow() {
return (
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.0316 17.5856C9.70811 17.3269 9.65567 16.8549 9.91442 16.5315L13.5396 12L9.91442 7.46849C9.65566 7.14505 9.70811 6.67308 10.0316 6.41432C10.355 6.15556 10.827 6.208 11.0857 6.53145L15.0857 11.5315C15.3049 11.8054 15.3049 12.1946 15.0857 12.4685L11.0857 17.4685C10.827 17.7919 10.355 17.8444 10.0316 17.5856Z"
      fill="#141B20"
    />
  </svg>
);
}

function Regions() {
const dispatch = useDispatch();
const regions = useSelector((state) => state.select.regions);
const loading = useSelector((state) => state.select.dataLoading);

const getRegions = async () => {
  const url = `https://www.backend.versuz.co/countries`;
  // dispatch(setDataLoading(true));

  const config = {
    method: "GET",
    headers: {
      reactkey: process.env.REACT_APP_AUTH_KEY,
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(user),
  };

  const response = await fetch(url, config)
    .then((data) => data.json())
    .catch((err) => err);

  // console.log(response);

  if (response.success) {
    dispatch(setRegions(response.data));
  } else {
    
  }
  dispatch(setDataLoading(false));
};

useEffect(() => {
  getRegions();
  
}, []);

const showCompetitons = (e) => {
  const { id } = e.target;
  const { name } = e.target.dataset;
  dispatch(setCurrentRegion({ id, name }));
  dispatch(setView("competitions"));
};

return (
  <>
    {loading ? (
      <Loading />
    ) : (
      <div className="region-cont">
        {regions.map((region, index) => {
          return (
            <div
              key={region.id}
              id={region.id}
              className="region"
              onClick={showCompetitons}
              data-name={region.country}
            >
              <div className="inner">
                <img
                  src={`${process.env.REACT_APP_BASE_URL}${region.country_flag}`}
                  alt=""
                />
                <span className="text">{region.country}</span>
              </div>
              <Arrow />
            </div>
          );
        })}
      </div>
    )}
  </>
);
}

function Competitions() {
const [comps, setComps] = useState([]);
const dispatch = useDispatch();

const country = useSelector((state) => state.select.currentRegion.name);
const id = useSelector((state) => state.select.currentRegion.id);
const storedCompetitions = useSelector((state) => state.select.competitions);
const loading = useSelector((state) => state.select.dataLoading);

const getCompetitions = async () => {
  dispatch(setDataLoading(true));
  const url = `https://www.backend.versuz.co/competitions/${id}`;

  const config = {
    method: "GET",
    headers: {
      reactkey: process.env.REACT_APP_AUTH_KEY,
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(user),
  };

  const response = await fetch(url, config)
    .then((data) => data.json())
    .catch((err) => err);

  let competitionsString = JSON.stringify(storedCompetitions);
  let competitions = JSON.parse(competitionsString);

  competitions[id] = response.data;

  dispatch(setCompetitions(competitions));

  if (response.success) {
    setComps(response.data);
    //   setUser(response.data.user)
    //   setStake(response.data.stake)
    //   setShow(true)
    
      
  } else {
    //   // setLoginErr(true);
    
  }
};

useEffect(() => {
  getCompetitions();
  dispatch(setDataLoading(false));
}, [country, id]);

const showFixtures = (e) => {
  const { id, name, emblem } = e.target.dataset;
  dispatch(setCompetition({ id, name, emblem }));
  dispatch(setView("fixtures"));
  console.log();
};

return (
  <>
  {loading ? <Loading /> :
  <div className="competitions">
    <div className="header">
      <span>{country}</span>{" "}
      <button
        onClick={() => {
          dispatch(setView("regions"));
        }}
      >
        <svg
          width="3"
          height="13"
          viewBox="0 0 3 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 1.25C0 0.559644 0.559644 0 1.25 0C1.94036 0 2.5 0.559644 2.5 1.25C2.5 1.94036 1.94036 2.5 1.25 2.5C0.559644 2.5 0 1.94036 0 1.25ZM0 6.25C0 5.55964 0.559644 5 1.25 5C1.94036 5 2.5 5.55964 2.5 6.25C2.5 6.94036 1.94036 7.5 1.25 7.5C0.559644 7.5 0 6.94036 0 6.25ZM1.25 10C0.559644 10 0 10.5596 0 11.25C0 11.9404 0.559644 12.5 1.25 12.5C1.94036 12.5 2.5 11.9404 2.5 11.25C2.5 10.5596 1.94036 10 1.25 10Z"
            fill="#141B20"
          />
        </svg>{" "}
      </button>
    </div>
    <div className="body">
      {comps.map((comp, index) => {
        return (
          // {id: 7, competition_name: 'Carabao Cup', competition_emblem: '/media/images/27.png'}
          <div
            key={index}
            data-id={comp.id}
            data-name={comp.competition_name}
            data-emblem={comp.competition_emblem}
            className="competition"
            onClick={showFixtures}
          >
            <img
              src={`${process.env.REACT_APP_BASE_URL}${comp.competition_emblem}`}
              alt=""
            />
            <span>{comp.competition_name}</span>
          </div>
        );
      })}
    </div>
  </div>
}
  </>
);
}

function Fixtures() {
const dispatch = useDispatch();
const { id, name, emblem } = useSelector((state) => state.select.competition);
const ticketSelections = useSelector((state) => state.ticket.selectedOptions);
const loading = useSelector((state) => state.ticket.dataLoading);

const [fixtures, setFixtures] = useState([]);
const [selected, setSelected] = useState(false);

const getFixtures = async () => {
  dispatch(setDataLoading(true));
  const url = `https://www.backend.versuz.co/fixtures/${id}`;

  const config = {
    method: "GET",
    headers: {
      reactkey: process.env.REACT_APP_AUTH_KEY,
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(user),
  };

  const response = await fetch(url, config)
    .then((data) => data.json())
    .catch((err) => err);

  // console.log(response);

  if (response.success) {
    setFixtures(response.data);
    // setComps(response.data);
    //   setUser(response.data.user)
    //   setStake(response.data.stake)
    //   setShow(true)
    
  } else {
    
    // setLoginErr(true);
    // dispatch(setView("game"));
    // alert("could not get fixtures")
  }
};
useEffect(() => {
  getFixtures();
  dispatch(setDataLoading(false));
}, []);

/*



*/

return (
  <>
    {loading ? <Loading /> : <div className="fixtures">
      <div className="fixtures-nav">
        <div className="row1">
          <img
            src={`https://www.backend.versuz.co/${emblem}`}
            alt=""
            className="competiton-logo"
          />

          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2 0C0.895431 0 0 0.895431 0 2V6C0 7.10457 0.895431 8 2 8H6C7.10457 8 8 7.10457 8 6V2C8 0.895431 7.10457 0 6 0H2ZM16 8C18.2091 8 20 6.20914 20 4C20 1.79086 18.2091 0 16 0C13.7909 0 12 1.79086 12 4C12 6.20914 13.7909 8 16 8ZM8 16C8 18.2091 6.20914 20 4 20C1.79086 20 0 18.2091 0 16C0 13.7909 1.79086 12 4 12C6.20914 12 8 13.7909 8 16ZM14 12C12.8954 12 12 12.8954 12 14V18C12 19.1046 12.8954 20 14 20H18C19.1046 20 20 19.1046 20 18V14C20 12.8954 19.1046 12 18 12H14Z"
              fill="#141B20"
            />
          </svg>
        </div>

        <h3>{name}</h3>
      </div>

      <div className="fixtures-body">
        {fixtures.map((fixture, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                dispatch(setCurrentFixture(fixture));
                dispatch(setView("game"));
              }}
              className={`fixture ${
                ticketSelections[fixture.id] ? "selected" : ""
              }`}
            >
              <div className="teams">
                <div className="team">
                  <img
                    src={`https://www.backend.versuz.co/${fixture.home_team_crest}`}
                    alt=""
                  />
                  <span>{fixture.home_team}</span>
                </div>
                <div className="team">
                  <img
                    src={`https://www.backend.versuz.co/${fixture.away_team_crest}`}
                    alt=""
                  />
                  <span>{fixture.away_team}</span>
                </div>
              </div>
              <div className="date">
                <span className="day">{fixture.date.split(" ")[0]}</span>
                <span className="time">
                  {convertTo12HourFormat(fixture.date.split(" ")[1])}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div> }
  </>
);
}

function OddButton(props) {
const compName = useSelector((state) => state.select.activeCompetitionName);
const compId = useSelector((state) => state.select.activeCompetitionId);
const { odd, opt } = props;
const ticketSelections = useSelector((state) => state.ticket.selectedOptions);
const [oddid, setOddID] = useState(uuidv4());

const [inTicket, setInTicket] = useState(false);
// const dispatch = useDispatch();
// const arr = oddname.split("-");
// const fixture = Number(id);

const dispatch = useDispatch();
const fixture = useSelector((state) => state.select.currentFixture);
const competition = useSelector((state) => state.select.competition);
const currentRegion = useSelector((state) => state.select.currentRegion.id);

const updateTicketAction = (e) => {
  // region id,competiton id,fixture id, selections: {name:odd}
  console.log(e.target);
  const { name, option } = e.target.dataset;

  let fixtureId = fixture.id;
  let group = name;

  const payload = { fixtureId, group, option };

  dispatch(updateSelectedOptions(payload));
  // dispatch(updateSelectedOptionsArray());
};

useEffect(() => {
  // console.log("changed");
  if (ticketSelections) {
    if (ticketSelections[fixture.id]) {
      if (ticketSelections[fixture.id][odd.name]) {
        if (ticketSelections[fixture.id][odd.name] == opt) {
          setInTicket(true);
        } else {
          setInTicket(false);
        }
      } else {
        setInTicket(false);
      }
    } else {
      setInTicket(false);
    }
  }
}, [ticketSelections]);

// };
return (
  <div className="option">
    <button
      onClick={updateTicketAction}
      // onClick={toggleInTicket}
      data-name={odd.name}
      data-option={opt}
      className={inTicket ? "in-ticket" : ""}
    >
      {opt.split("-")[0]}
    </button>
    <span style={{ pointerEvents: "none" }}>{opt.split("-")[1]}</span>
  </div>
);
}

function Game() {
const dispatch = useDispatch();
const fixture = useSelector((state) => state.select.currentFixture);
const competition = useSelector((state) => state.select.competition);
const currentRegion = useSelector((state) => state.select.currentRegion.id);
const selectedOptions = useSelector((state) => state.ticket.selectedOptions);

const updateTicketAction = (e) => {
  const { name, option } = e.target.dataset;

  let fixtureId = fixture.id;
  let group = name;

  const payload = { fixtureId, group, option };

  console.log("update from games", payload);
  dispatch(updateSelectedOptions(payload));
};

useEffect(() => {
  dispatch(
    updateGames({
      id: Number(fixture.id),
      data: {
        home_team: fixture.home_team,
        home_team_crest: fixture.home_team_crest,
        away_team: fixture.away_team,
        away_team_crest: fixture.away_team_crest,
      },
    })
  );
}, []);

return (
  <div className="game">
    <div className="teams">
      <div className="team">
        <img
          src={`https://www.backend.versuz.co/${fixture.home_team_crest}`}
          alt=""
        />
        <span>{fixture.home_team}</span>
      </div>
      <div className="x">
        <span className="league">{competition.name}</span>
        <img src={icon} alt="" />
        <span className="time">
          {convertTo12HourFormat(fixture.date.split(" ")[1])}
        </span>
      </div>
      <div className="team">
        <img
          src={`https://www.backend.versuz.co/${fixture.away_team_crest}`}
          alt=""
        />
        <span>{fixture.away_team}</span>
      </div>
    </div>
    <div className="body">
      {fixture.odds.map((odd, index) => {
        return (
          <div className="odd" key={index}>
            <p className="name">{odd.name}</p>
            <div className={`options ${odd.options.length > 2 ? "three": ""}`}>
              {odd.options.map((opt, index) => {
                return (
                  
                  <OddButton
                    key={index}
                    fixtureId={fixture.id}
                    odd={odd}
                    opt={opt}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
}

export default function Select() {
// const [view, setView] = useState("region");
const [prevView, setPrevView] = useState("");
const view = useSelector((state) => state.select.current);
const { id } = useParams();
const naigate = useNavigate();
const dispatch = useDispatch();
const loading = useSelector((state) => state.dataLoading);

useEffect(() => {
  dispatch(setView("regions"));
}, []);
const viewRegions = (e) => {
  // setView("competitions");
  // setPrevView(view);
};

const viewFixtures = (e) => {
  // setView("fixtures");
  setPrevView(view);
};

const navHandler = () => {
  if (view == "regions") {
    naigate(`/join/${id}`);
  } else if (view == "competitions") {
    dispatch(setView("regions"));
  } else if (view == "fixtures") {
    dispatch(setView("competitions"));
  } else if (view == "game") {
    dispatch(setView("fixtures"));
  }
};
return (
  <div className="select">
    <SelectNav click={navHandler} view={view} />

    {view == "regions" && <Regions />}
    {view == "competitions" && <Competitions />}
    {view == "fixtures" && <Fixtures />}
    {view == "game" && <Game />}
  </div>
);
}
