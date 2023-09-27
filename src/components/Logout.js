import React, { useEffect, useLayoutEffect } from "react";
import { NavLink } from "react-router-dom";



export default function Logout() {
  return (
    <NavLink to="/logout" >
        Logout
    </NavLink>
  )
}
