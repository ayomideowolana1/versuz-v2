import React, { useEffect, useState } from "react";

function CountdownTimer(props) {
  const { date } = props;
  const targetTime = new Date(date).getTime();
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  function calculateTimeRemaining() {
    const currentTime = new Date().getTime();
    const timeRemaining = targetTime - currentTime;

    if (timeRemaining <= 0) {
      // Timer has expired
      return { hours: '00', minutes: '00', seconds: '00' };
    }

    const seconds = Math.floor((timeRemaining / 1000) % 60);
    const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);

    return {
      hours: hours < 10 ? `0${hours}` : hours.toString(),
      minutes: minutes < 10 ? `0${minutes}` : minutes.toString(),
      seconds: seconds < 10 ? `0${seconds}` : seconds.toString(),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
      <>
      <span style={{display:"flex", gap:"3px"}}>

      <span>{timeRemaining.hours}:</span>
      <span>{timeRemaining.minutes}:</span>
      <span>{timeRemaining.seconds}</span>
      </span>
    </>
  );
}

export default CountdownTimer;
