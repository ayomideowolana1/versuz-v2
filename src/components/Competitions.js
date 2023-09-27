import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  getCompetitionsAsync,
  getCompetitionFixturesAsync,
  setActiveCompetitionName,
} from "../redux/slices/selectSlice";
import { Match, Canvas } from "./Match";
import SelectGamesCanvas from "./SelectGamesCanvas";
import "../styles/competitions.css";

function LoadingComps() {
  return (
    <span
      className="btn"
      style={{
        color: "black",
        gap: "10px",
        display: "flex",
        alignItems: "center",
      }}
      type="button"
      disabled
    >
      <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
      Loading competitions
    </span>
  );
}
function LoadingFixtures(props) {
  const { name } = props;
  return (
    <div className="games">
      <span
        className="btn"
        style={{
          color: "black",
          gap: "10px",
          display: "flex",
          alignItems: "center",
        }}
        type="button"
        disabled
      >
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Loading {name} Fixtures
      </span>
    </div>
  );
}

export default function Competitions() {
  const dispatch = useDispatch();
  const showCompetitionsRef = useRef();
  const showGamesRef = useRef();
  const showSelectionsRef = useRef();

  const { competitions, gamesToDisplay, activeCompetitionName } = useSelector(
    (state) => state.select
  );

  const loadingCompetitions = useSelector(
    (state) => state.select.competitionsState.isLoading
  );
  const loadingFixtures = useSelector(
    (state) => state.select.fixturesState.isLoading
  );

  const [activeCompetiton, setActiveCompetiton] = useState(1);
  const [active, setActive] = useState(activeCompetitionName);
  const [selectedOptionsCount, setSelectedOptionsCount] = useState(0);
  const selectedOptions = useSelector((state) => state.ticket.selectedOptions);
  const currentFixture = useSelector((state) => state.select.currentFixture);

  useEffect(() => {
    let obj = selectedOptions;
    let fieldCount = 0;

    for (const key in obj) {
      for (const subKey in obj[key]) {
        fieldCount++;
      }
    }

    setSelectedOptionsCount(fieldCount);
  }, [selectedOptions]);

  const showCompetitions = () => {
    showCompetitionsRef.current.click();
    setActive(" ");
  };

  const handleCompetitionChange = (e) => {
    const { id } = e.target;
    const { name } = e.target.dataset;

    setActiveCompetiton(id);
    setActive(name);
    dispatch(getCompetitionFixturesAsync(id));
    dispatch(setActiveCompetitionName({ name, id }));
    showGamesRef.current.click();
  };

  useEffect(() => {
    dispatch(getCompetitionsAsync());
  }, []);

  return (
    <div className="competitions">
      <div className="header">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li
              class="breadcrumb-item active"
              aria-current="page"
              onClick={showCompetitions}
            >
              Competitions
            </li>
            {active && (
              <li class="breadcrumb-item active" aria-current="page">
                {active}
              </li>
            )}
          </ol>
        </nav>
        <ul class="nav nav-pills mb-3 " id="pills-tab" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              id="pills-competitions-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-competitions"
              type="button"
              role="tab"
              aria-controls="pills-competitions"
              aria-selected="true"
              ref={showCompetitionsRef}
            >
              Competitions
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              ref={showGamesRef}
              aria-selected="false"
            >
              Games
            </button>
          </li>

          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="pills-contact-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-contact"
              type="button"
              role="tab"
              aria-controls="pills-contact"
              aria-selected="false"
              ref={showSelectionsRef}
            >
              Ticket
            </button>
          </li>
        </ul>
      </div>
      <div class="tab-content" id="pills-tabContent">
        {/* Competitons */}
        <div
          class="tab-pane fade show active "
          id="pills-competitions"
          role="tabpanel"
          aria-labelledby="pills-competitions-tab"
        >
          <div className="main">
            {competitions.map((competition) => {
              return (
                <button
                  key={competition.id}
                  id={competition.id}
                  data-name={competition.competition_name}
                  onClick={handleCompetitionChange}
                  className={activeCompetiton == competition.id ? "active" : ""}
                >
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}${competition.competition_emblem}`}
                    alt=""
                  />
                  <span>{competition.competition_name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Fixtures */}
        <div
          class="tab-pane fade"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
        >
          {/* <div className="button-cont">
            <button
              className="back"
              onClick={() => {
                showCompetitionsRef.current.click();
              }}
            >
              Back to competitions
            </button>
          </div> */}

          {loadingCompetitions ? (
            ""
          ) : loadingFixtures ? (
            <LoadingFixtures name={activeCompetitionName} />
          ) : (
            <div className="games">
              {gamesToDisplay.length > 0 ? (
                gamesToDisplay.map((competition) => (
                  <Match data={competition} key={uuidv4()} />
                ))
              ) : (
                <p>There are no fixtures to display</p>
              )}

              {currentFixture ? <SelectGamesCanvas /> : ""}
            </div>
          )}
        </div>

        {/* Selections */}
        <div
          class="tab-pane fade"
          id="pills-contact"
          role="tabpanel"
          aria-labelledby="pills-contact-tab"
        >
          <div className="button-cont">
            <button
              className="back"
              onClick={() => {
                showCompetitionsRef.current.click();
              }}
            >
              Back to competitions
            </button>
          </div>
        </div>
      </div>

      <div className="selections-cont" onClick={()=>{showSelectionsRef.current.click()}}>
        <span className="circle">{selectedOptionsCount}</span>
        <span>Your Selections</span>
        <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.0298 11.67L19.7998 9.89L9.89981 -4.32743e-07L-0.000194982 9.9L1.76981 11.67L9.8998 3.54L18.0298 11.67Z" fill="black"/>
        </svg> 
      </div>
    </div>
  );
}
