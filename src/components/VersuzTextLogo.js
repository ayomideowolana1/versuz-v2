import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/versuz-text-logo-white.svg";

export default function VersuzTextLogo() {
  return (
    <Link to="/explore">
      <img className="logo" src={logo} alt="versuz-logo" />
    </Link>
  );
}
