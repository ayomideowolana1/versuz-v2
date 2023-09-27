import React, { useState, useEffect } from "react";
import "../styles/ticket.css";
import PageTitle from "../components/PageTitle";
import Nav from "../components/Nav";
import icon from "../images/versuz-icon.png";
import cancel from "../images/cancel-icon.svg";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { createTicketAsync } from "../redux/slices/ticketSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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

function Option(props) {
  const { data, fixtures } = props;
  const [fixture, setFixture] = useState({});
  const [time, setTime] = useState("");

  useEffect(() => {
    let _fixture = fixtures.find((i) => i.id == data.id);
    setFixture(_fixture);

    let arr = _fixture.date.split(" ");
    setTime(convertToAmPm(arr[1]));
  }, []);
  return (
    <div>
      {/* {"id":"826","selection":["home_draw_away","Home"]} */}

      {/* {"id":826,"home_team":"Plymouth Argyle","home_team_crest":"/media/images/110.png","away_team":"Southampton","away_team_crest":"/media/images/65.png","competition":"Championship","api_match_id":18846767,"date":"2023-08-19 12:30:00","odds":[{"name":"home_draw_away","options":["Home-4.20","Draw-4.10","Away-1.74"]},{"name":"over_under","options":["Over2.5-1.65","Under2.5-2.23"]},{"name":"gg_ng","options":["GG-1.64","NG-2.25"]},{"name":"h1gg_h1ng","options":["H1GG-3.90","H1NG-1.24"]},{"name":"h2gg_h2ng","options":["H2GG-3.00","H2NG-1.38"]}]} */}

      <div className="team">
        <img
          src={`${process.env.REACT_APP_BASE_URL}/${fixture.home_team_crest}`}
          alt=""
        />
        <span>{fixture.home_team}</span>
      </div>

      <div className="x">
        <span>{fixture.competition}</span>
        <img src={icon} alt="" />
        <span>{time}</span>
      </div>

      <div className="team">
        <img
          src={`${process.env.REACT_APP_BASE_URL}/${fixture.away_team_crest}`}
          alt=""
        />
        <span>{fixture.away_team}</span>
      </div>

      <div className="odd">
        <span className="name">{data.selection[1]}</span>
        <span>1.35</span>
      </div>

      <div className="cancel">
        <button className="cancel">
          <img src={cancel} alt="" />
        </button>
      </div>
    </div>
  );
}

export default function Ticket() {
  const [selectedOptionsFlat, setSelectedOptionsFlat] = useState([]);
  const selectedOptions = useSelector((state) => state.ticket.selectedOptions);
  const isLoading = useSelector((state) => state.ticket.createTicketState.isLoading);
  const ticketCreated = useSelector((state) => state.ticket.createTicketState.ticketCreated);
  const ticketPaired = useSelector((state) => state.ticket.createTicketState.ticketPaired);
  const auth = useSelector((state) => state.auth.userAuthKey);
  const pairID = useSelector((state) => state.ticket.pairID);
  const stake = useSelector((state) => state.ticket.pairStake);
  const [selectedOptionsCount, setSelectedOptionsCount] = useState(0);
  const fixtures = useSelector((state) => state.select.fixtures);
  const [fixtureFlat, setFixtureFlat] = useState([]);
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      if (stake) {
        setAmount(stake);
      }
    }, 500);
  }, [stake]);

  useEffect(()=>{
    if(ticketCreated){
      navigate("/pair")
    }
  },[ticketCreated])

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = () => {
    
    if (amount > 0) {
      if (!pairID) {
        dispatch(createTicketAsync({ options: selectedOptions, amount, auth }));
      }
    } else {
      alert("Invalid Stake Amount");
    }
  };

  useEffect(() => {
    let obj = selectedOptions;
    let fieldCount = 0;
    setFixtureFlat(fixtures.flatMap((subArray) => subArray));

    let flat = [];

    for (let i in selectedOptions) {
      for (let j in selectedOptions[i]) {
        flat.push({ id: i, selection: [j, selectedOptions[i][j]] });
      }
    }

    console.log("flat is ", flat);
    setSelectedOptionsFlat(flat);
    console.log(fixtureFlat, selectedOptionsFlat);
    for (const key in obj) {
      for (const subKey in obj[key]) {
        fieldCount++;
      }
    }

    setSelectedOptionsCount(fieldCount);
  }, [selectedOptions]);

  return (
    <>
      <PageTitle title="Versuz - Your Ticket" />
      <Nav />

      <div className="ticket-cont">
        <div className="options">
          <div className="header">
            <h1>
              <span>{selectedOptionsCount}</span>
              Your Selections
            </h1>
            <p
              className="header-sub"
              style={{ fontSize: ".7rem", color: "#424242" }}
            >
              <span>Paid ID : {pairID}</span>
              <span>No of Games: 10</span>
            </p>
          </div>
          <div className="selections">
            {selectedOptionsFlat.map((option) => {
              return (
                <Option key={uuidv4()} data={option} fixtures={fixtureFlat} />
              );
            })}
          </div>
        </div>
        <p>
          <span>Min - ₦500</span>
          <span>Max - ₦500,000</span>
        </p>
        <div className="payment">
          {pairID ? (
            <p className="input">{amount}</p>
          ) : (
            <input
              type="number"
              placeholder="Stake amount"
              onChange={handleAmountChange}
              className="input"
              disabled={isLoading}
              value={amount}
            />
          )}

          <button
            className={`bet  ${amount > 0 ? "" : "disabled"} ${isLoading ? "disabled": ""}`}
            onClick={handleSubmit}
          >{
            isLoading ?
            <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  :""
          }
          {" "}

            Place Bet
          </button>
        </div>
      </div>
    </>
  );
}
