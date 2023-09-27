import React, { useEffect, useRef, useState } from "react";
import icon from "../images/versuz-icon.png";
import iconLight from "../images/versuz-icon-light.png";
import "../styles/game.css";
import { useDispatch, useSelector } from "react-redux";
import { showFixtures, hideFixtures } from "../redux/slices/selectSlice";

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

function RadioInput(data) {
  return (
    <div>
      <p></p>
    </div>
  );
}

export function Match(props) {
  const { data } = props;
  const dateTime = data.date.split(" ");
  const matchRef = useRef();
  const dispatch = useDispatch();
  const showOffCanvas = useSelector((state) => state.select.showOffCanvas);
  const currentFixture = useSelector((state) => state.select.currentFixture);
  const activeCompetitionName = useSelector(
    (state) => state.select.activeCompetitionName
  );
  const selectedOptions = useSelector((state) => state.ticket.selectedOptions);
  const [inTicket, setInTicket] = useState(false);
  useEffect(() => {
    if (selectedOptions.hasOwnProperty(data.id)) {
      setInTicket(true);
    } else {
      setInTicket(false);
    }
    // console.log(data)
  }, [selectedOptions]);

  const setCurrentFixture = (e) => {
    dispatch(showFixtures(data));
  };

  const handleClose = () => {
    dispatch(hideFixtures());
  };

  return (
    <button
      className={` match ${inTicket ? "selected" : ""}`}
      data-comp-id={data.id}
      data-comp-name={activeCompetitionName}
      onClick={setCurrentFixture}
    >
      <div className="team">
        <img
          src={`${process.env.REACT_APP_BASE_URL}/${data.home_team_crest}`}
          alt=""
        />
        <span>{data.home_team}</span>
      </div>
      <div className="x">
        <span>{dateTime[0]}</span>
        <img src={inTicket ? iconLight : icon} alt="" />
        <span>{convertToAmPm(dateTime[1])}</span>
      </div>
      <div className="team">
        <img
          src={`${process.env.REACT_APP_BASE_URL}/${data.away_team_crest}`}
          alt=""
        />
        <span>{data.away_team}</span>
      </div>
    </button>
  );
}

/*



{
    '802': {
      home_draw_away: 'Away'
    },
    '803': {
      home_draw_away: 'Away'
    }
  }














*/
