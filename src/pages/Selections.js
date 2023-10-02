import React, { useEffect, useState } from "react";
import { SelectionsNav } from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import {
  updateSelectedOptions,
  updateSelectedOptionsArray,
  deleteSelectedOptions,
  setPairDetails,
} from "../redux/slices/ticketSlice";
import "../styles/selections.css";
import { useNavigate } from "react-router-dom";

export function Selection(props) {
  const storeGames = useSelector((state) => state.ticket.games);
  const { data, index, games } = props;
  const [fixtureId, setFixtureId] = useState("");

  const [group, setGroup] = useState("");
  const [optionString, setOptionString] = useState("");
  const [option, setOption] = useState("");
  const [odd, setOdd] = useState("");
  const [ready, setReady] = useState(false);
  const [mdata, setMdata] = useState(games);
  const dispatch = useDispatch();

  useEffect(() => {
    const array = data.split("|");
    setFixtureId(Number(array[0]));
    setGroup(array[1].toLowerCase());
    setOptionString(array[2]);
    setOption(array[2].split("-")[0]);
    setOdd(array[2].split("-")[1]);
    setReady(true);
  }, []);

  const updateTicketAction = (e) => {
    console.log(e.target);
    const { id, group, option } = e.target.dataset;
    const payload = { fixtureId: Number(id), group, option };
    // console.log(payload)

    console.log("delete Index", index);
    dispatch(deleteSelectedOptions(payload));
  };

  if (ready) {
    return (
      <div className="selection">
        {/* {JSON.stringify(data)} */}
        <div className="teams">
          <div className="team">
            <img
              src={`https://www.backend.versuz.co/${storeGames[fixtureId].home_team_crest}`}
              alt=""
            />
            <span>{storeGames[fixtureId].home_team}</span>
          </div>
          <div className="team">
            <img
              src={`https://www.backend.versuz.co/${storeGames[fixtureId].away_team_crest}`}
              alt=""
            />
            <span>{storeGames[fixtureId].away_team}</span>
          </div>
        </div>
        <div className="option">
          <span className="choice">{option}</span>
          <span className="odd">{odd}</span>
        </div>
        <div
          className="cancel"
          data-id={fixtureId}
          data-group={group}
          data-option={optionString}
          // onClick={updateTicketAction}
        >
          
        </div>
      </div>
    );
  }
}

export default function Selections() {
  const storeGames = useSelector((state) => state.ticket.games);
  const ticket = useSelector((state) => state.ticket);
  const stake = useSelector((state) => state.ticket.pairStake);
  const [newGameStake,setNewGameStake] = useState(0)
  const storeSelections = useSelector((state) => state.ticket.selectedOptions);
  const [selections, setSelections] = useState([]);
  const [selectionsArray, setSelectionsArray] = useState([]);
  const [oddAccumulation, setOddAccumulation] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    setSelections(storeSelections);
  }, [storeSelections]);

  useEffect(() => {
    const object = JSON.parse(JSON.stringify(selections));

    let result = [];

    for (let key in object) {
      for (let key2 in object[key]) {
        result.push(`${key}|${key2}|${object[key][key2]}`);
      }
    }

    setSelectionsArray(result);
  }, [selections]);

  const placeBet = async () => {
    const data = ticket.selectedOptions;
    // 849:{'Draw', 'Away'}

    const arr = {};
    for (let key in data) {
      arr[key] = [];
      for (let key2 in data[key]) {
        arr[key].push(data[key][key2].split("-")[0]);
      }
    }

    // pairing and existing game
    let url = "https://www.backend.versuz.co/games/join_versus";
    let payload = {
      betcode_id: ticket.pairID,
      data: arr,
      amount: ticket.pairStake,
    };
    
    
    // creating a new game
    if (ticket.pairID == 0) {
      url = "https://www.backend.versuz.co/games/versus";
      payload = {
        data: arr,
        amount: newGameStake,
      };
    }

    const config = {
      method: "POST",
      headers: {
        Authorization: `Token ${
          JSON.parse(sessionStorage.getItem("vsrz")).token
        }`,
        reactkey: process.env.REACT_APP_AUTH_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    const response = await fetch(url, config).then((data) => data.json());
    console.log(response);
    console.log(payload);

    if(response.success){
      navigate(`/ticket/${response.ticket_code}`)
    }else{
      alert(response.message)
    }

    /*
      end_date: "2023-09-02 12:30:00"
      message: "Betcode has been succesfully paired with 4S1A5IQP"
      pair_code:"WI6LH5QWP822"
      potential_payout: 300
      stake: 150
      success: true
      ticket_id:"D4IBK8BU"
      
      */

    /*
      end_date: "2023-09-02 15:00:00"
      message:  "Excercise Patience, your betcode will be paired with soon"
      potential_payout :300
      stake:150
      success: true
      ticket_id: "257MUSYN"
      */
  };

  const setPairStake = (e) => {
    dispatch(setPairDetails({ stake: e.target.value }));
  };

  const handleChange=(e)=>{
    setNewGameStake(e.target.value)
  }

  return (
    <div className="selections">
      <SelectionsNav />
      <div className="selections-body">
        {selectionsArray.map((selection, index) => {
          return (
            <Selection
              key={index}
              index={index}
              data={selection}
              games={storeGames}
            />
          );
        })}

        {/* {
            for(let )
          } */}
      </div>
      <div className="bottom">
        <div className="text">
          <p>Enter Stake </p>
        </div>
        <div className="cont">
          <div className="input">
            <div className="input-cont">
              N{" "}
              {ticket.pairID == 0 ? (
                <input type="number" min="1000" value={newGameStake} onChange={handleChange} />
              ) : (
                <input type="number" value={stake} readOnly />
              )}
            </div>
            <span></span>
          </div>
          <div className="action" onClick={placeBet}>
            <button>Make your bet</button>
          </div>
        </div>
      </div>
    </div>
  );
}
