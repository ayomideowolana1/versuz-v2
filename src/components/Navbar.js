import React from "react";
import logo from "../images/versuz-icon.svg";
import logoWhite from "../images/versuz-icon-white.svg";
import "../styles/nav.css";
import userIcon from "../images/user-icon.png";

function Back(props) {
  const {variant} = props
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.437 13.3286C29.0839 13.8462 29.1888 14.7901 28.6713 15.437L21.4209 24.4999L28.6713 33.5629C29.1888 34.2098 29.0839 35.1537 28.437 35.6712C27.7902 36.1888 26.8462 36.0839 26.3287 35.437L18.3287 25.437C17.8904 24.8892 17.8904 24.1107 18.3287 23.5629L26.3287 13.5629C26.8462 12.916 27.7901 12.8111 28.437 13.3286Z"
        fill={variant == "dark" ? "#141B20" : "#fff" }
      />
    </svg>
  );
}

function TicketIcon() {
  return (
    <div className="ticket-icon">
      <div className="number">5</div>
      <svg
        width="34"
        height="30"
        viewBox="0 0 34 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.00001 30C3.31811 30 0.333344 27.0152 0.333344 23.3333V21.6667C0.333344 20.7462 1.10002 20.0272 1.96983 19.726C3.92757 19.0482 5.33334 17.1883 5.33334 15C5.33334 12.8117 3.92757 10.9518 1.96983 10.274C1.10002 9.97281 0.333344 9.25381 0.333344 8.33333V6.66667C0.333344 2.98477 3.31811 0 7.00001 0H13.6667H27C30.6819 0 33.6667 2.98477 33.6667 6.66667V8.33333C33.6667 9.25381 32.9 9.97281 32.0302 10.274C30.0725 10.9518 28.6667 12.8117 28.6667 15C28.6667 17.1883 30.0725 19.0482 32.0302 19.726C32.9 20.0272 33.6667 20.7462 33.6667 21.6667V23.3333C33.6667 27.0152 30.6819 30 27 30H13.6667H7.00001ZM14.9167 5C14.9167 4.30964 14.357 3.75 13.6667 3.75C12.9763 3.75 12.4167 4.30964 12.4167 5V8.33333C12.4167 9.02369 12.9763 9.58333 13.6667 9.58333C14.357 9.58333 14.9167 9.02369 14.9167 8.33333V5ZM13.6667 20.4167C14.357 20.4167 14.9167 20.9763 14.9167 21.6667V25C14.9167 25.6904 14.357 26.25 13.6667 26.25C12.9763 26.25 12.4167 25.6904 12.4167 25V21.6667C12.4167 20.9763 12.9763 20.4167 13.6667 20.4167ZM14.9167 13.3333C14.9167 12.643 14.357 12.0833 13.6667 12.0833C12.9763 12.0833 12.4167 12.643 12.4167 13.3333V16.6667C12.4167 17.357 12.9763 17.9167 13.6667 17.9167C14.357 17.9167 14.9167 17.357 14.9167 16.6667V13.3333Z"
          fill="#141B20"
        />
      </svg>
    </div>
  );
}

function InfoIcon(props) {
  const {variant} = props
  return (
    <>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 10.6667V12M16 15.3333V21.3333M16 29.3333C23.3638 29.3333 29.3333 23.3638 29.3333 16C29.3333 8.63621 23.3638 2.66667 16 2.66667C8.63619 2.66667 2.66666 8.63621 2.66666 16C2.66666 23.3638 8.63619 29.3333 16 29.3333Z"
          stroke={variant == "dark" ? "#141B20" : "#fff" }
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  );
}

function SearchIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.8374 13.1667C23.8374 19.06 19.06 23.8374 13.1667 23.8374C7.27339 23.8374 2.49594 19.06 2.49594 13.1667C2.49594 7.27339 7.27339 2.49594 13.1667 2.49594C19.06 2.49594 23.8374 7.27339 23.8374 13.1667ZM13.1667 25.6667C20.0702 25.6667 25.6667 20.0702 25.6667 13.1667C25.6667 6.26311 20.0702 0.666672 13.1667 0.666672C6.26311 0.666672 0.666672 6.26311 0.666672 13.1667C0.666672 20.0702 6.26311 25.6667 13.1667 25.6667ZM24.1624 22.6472C23.744 22.2287 23.0656 22.2287 22.6472 22.6472C22.2287 23.0656 22.2287 23.744 22.6472 24.1624L25.5043 27.0195C25.9227 27.4379 26.6011 27.4379 27.0195 27.0195C27.4379 26.6011 27.4379 25.9227 27.0195 25.5043L24.1624 22.6472Z"
        fill="#141B20"
      />
    </svg>
  );
}

function UserIcon() {
  return <img className="user-icon" src={userIcon} />;
}

export default function Navbar(props) {
  const { hasBackButton } = props;
  return (
    <nav>
      <section className="nav-header">
        <img src={logo} alt="" />
      </section>
      <section className="nav-body">
        {hasBackButton && <Back />}
        <span className="text">Explore</span>
        <TicketIcon />
        <UserIcon />
      </section>
    </nav>
  );
}

export function NewGameNav() {
  return (
    <nav className="new-game">
      <section className="nav-header">
        <img src={logo} alt="" />
      </section>
      <section className="nav-body">
        <Back />

        <span className="text">New Game</span>
        <InfoIcon />
      </section>
    </nav>
  );
}

export function GamesNav() {
  return (
    <nav className="new-game">
      <section className="nav-header">
        <img src={logo} alt="" />
      </section>
      <section className="nav-body">
        <Back />

        <span className="text">Games</span>
        <SearchIcon />
      </section>
    </nav>
  );
}

export function SelectNav(props) {
  const { view } = props;

  if (view == "regions") {
    return (
      <nav className="new-game">
        <section className="nav-header">
          <img src={logo} alt="" />
        </section>
        <section className="nav-body">
          <Back />

          <span className="text">Regions</span>
          <SearchIcon />
        </section>
      </nav>
    );
  }
}

export function GameDetailsNav(){
  return (
    <nav className="new-game" style={{borderBottom:"none"}}>
        <section className="nav-header">
          <img src={logoWhite} alt="" />
        </section>
        <section className="nav-body">
          <Back />

          {/* <span className="text">Regions</span> */}
          <InfoIcon />
        </section>
      </nav>
  )
}
