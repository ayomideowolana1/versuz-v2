import React from "react";
import Nav from "../components/Nav";
import PageTitle from "../components/PageTitle";
import icon from "../images/ticket-icon.svg";
import "../styles/ticket-created.css";

export default function TicketCreated() {
  return (
    <>
      <PageTitle title="Versuz - Join our Online Platform to Bet Against Fellow Enthusiasts" />
      <Nav />
    <div className="ticket-created-cont">
      <div className="success-icon">
        <img src={icon} alt="" />
      </div>
      <div className="text">
      <h4>Ticket created successfully</h4>
      <hr />
      <p>Ticket ID:</p>
      <p>Stake:</p>
      <p>Potential Payout:</p>
      <p>Total Odds:</p>
      <p>No of Games:</p>
      <p>End date:</p>

      <button>View Details</button>
      {/* <button>Invite player to pair</button> */}
      <button>Continue betting</button>
      </div>


    </div>
    </>
  );
}
