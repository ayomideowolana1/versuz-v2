import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import icon from "../images/versuz-icon.png";
import Offcanvas from "react-bootstrap/Offcanvas";
import { showFixtures, hideFixtures } from "../redux/slices/selectSlice";
import {
  updateSelectedOptions,
  getTicketCount,
} from "../redux/slices/ticketSlice";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';


function convertToAmPm(time) {
  const parts = time.split(":");
  const hour = parseInt(parts[0], 10);
  const minute = parseInt(parts[1], 10);

  let period = "AM";
  let hour12 = hour;

  if (hour >= 12) {
    period = "PM";
    hour12 = hour === 12 ? 12 : hour - 12;
  }

  return `${hour12}:${String(minute).padStart(2, "0")} ${period}`;
}

function OddButton(props) {
  const currentFixture = useSelector((state) => state.select.currentFixture);
  const compName = useSelector((state) => state.select.activeCompetitionName);
  const compId = useSelector((state) => state.select.activeCompetitionId);
  const { id, group, option, name } = props;
  const ticketSelections = useSelector((state) => state.ticket.selectedOptions);
  const [oddid,setOddID] = useState(uuidv4())

  const [inTicket, setInTicket] = useState(false);
  const dispatch = useDispatch();
  const arr = name.split("-");
  const fixture = Number(id);

  useEffect(() => {
    if (ticketSelections) {
      // console.log("ticketSelections is -",ticketSelections )
      if (ticketSelections[fixture]) {
        if (ticketSelections[fixture][group] == option) {
          setInTicket(true);
        } else {
          setInTicket(false);
        }
      }
    }
  }, [ticketSelections]);

  const toggleInTicket = (e) => {
    const { id, group, option, name,oddid } = e.target.dataset;

    const payload = { fixture, group, option, compName, compId,
      odd: {'value':Number(arr[1]), oddid} };
    dispatch(updateSelectedOptions(payload));
    if (inTicket) {
      setInTicket(false);
    } else {
      setInTicket(true);
    }
  };
  return (
    <button
      data-id={id}
      data-group={group}
      data-option={option}
      data-oddid={oddid}
      onClick={toggleInTicket}
      className={inTicket ? "in-ticket" : ""}
    >
      <span className="name">{arr[0]}</span>
      <span className="odd">{arr[1]}</span>
    </button>
  );
}

export default function SelectGamesCanvas(props) {
  const currentFixture = useSelector((state) => state.select.currentFixture);
  const showOffCanvas = useSelector((state) => state.select.showOffCanvas);
  const dateTime = currentFixture.date.split(" ");
  const selectedOptions = useSelector((state) => state.ticket.selectedOptions);
  const [selectedOptionsCount, setSelectedOptionsCount] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    dispatch(hideFixtures());
  };

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

  const checkTicket = () => {
    if (selectedOptionsCount > 0) {
      navigate("/ticket");
    } else {
      alert("No games in your ticket");
    }
  };

  if (currentFixture != null) {
    return (
      <Offcanvas
        show={showOffCanvas}
        onHide={handleClose}
        placement={"bottom"}
        className="match-offcanvas"
      >
        <Offcanvas.Header closeButton>
          <div className="teams">
            <div className="team">
              <img
                src={`${process.env.REACT_APP_BASE_URL}/${currentFixture.home_team_crest}`}
                alt=""
              />
              <span>{currentFixture.home_team}</span>
            </div>
            <div className="x">
              <img src={icon} alt="" />
              <span>{convertToAmPm(dateTime[1])}</span>
            </div>
            <div className="team">
              <img
                src={`${process.env.REACT_APP_BASE_URL}/${currentFixture.away_team_crest}`}
                alt=""
              />
              <span>{currentFixture.away_team}</span>
            </div>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <section className="options">
            {currentFixture.odds.map((opt) => {
              let name = "";
              switch (opt.name) {
                case "home_draw_away":
                  name = "1 X 2";
                  break;
                case "over_under":
                  name = "Over / Under";
                  break;
                case "gg_ng":
                  name = "GG / NG";
                  break;
                case "h1gg_h1ng":
                  name = "1st Half GG / NG";
                  break;
                case "h2gg_h2ng":
                  name = "2nd Half GG / NG";
                  break;
                default:
                  name = opt.name;
              }
              return (
                <div className="group" key={opt.name}>
                  <p className="header">{name}</p>
                  <div className="buttons">
                    {opt.options.map((x) => {
                      let arr = x.split("-");
                      let name = arr[0];
                      let odd = arr[0];
                      return (
                        <OddButton
                          key={x}
                          name={x}
                          id={currentFixture.id}
                          comp-id=""
                          group={opt.name}
                          option={arr[0]}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </section>
          <section className="action">
            {selectedOptionsCount > 0 && (
              <button
                disabled={selectedOptionsCount > 0 ? false : true}
                onClick={checkTicket}
              >
                <span>View Ticket {selectedOptionsCount}</span>
              </button>
            )}
          </section>
        </Offcanvas.Body>
      </Offcanvas>
    );
  }
}

/*


{/* {selectedOptionsCount > 0 ? (
              ) : (
                <span>No games in your ticket</span>
              )} /}

*/
