import React from "react";
import soccerIcon from "../images/soccer.svg";

export default function ExploreNavButton(props) {
  const { data, clickHandler, view, page } = props;

  return (
    <button
      id={data.id}
      onClick={clickHandler}
      className={view === data.id ? "active" : ""}
    >
      {page == "select" ? <img src={soccerIcon} alt="" /> : ""}
      {data.buttonText}
    </button>
  );
}
