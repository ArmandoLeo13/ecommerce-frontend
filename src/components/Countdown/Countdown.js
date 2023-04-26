import React from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Notificacion from "../Notificacion/Notificacion";
import './Countdown.css'

const Countdown = ()=> {
  const startingMinutes = 5;
  const startingSeconds = 0 ;
  const [mins, setMinutes] = useState(startingMinutes);
  const [secs, setSeconds] = useState(startingSeconds);
  const [msg] = useState('Se acabo el tiempo para realizar el pedido');
  const [notificacion] = useState({"title":"Lo sentimos","icon":"info","confirmButtonColor":"#1BBFE9"});



  useEffect(() => {
    let sampleInterval = setInterval(() => {
      if (secs > 0) {
        setSeconds(secs - 1);
      }
      if (secs === 0) {
        if (mins === 0) {
          clearInterval(sampleInterval);
        } else {
          setMinutes(mins - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(sampleInterval);
    };
  });

  return (
    <div className="countdown">
      {!(mins || secs) ? (
        <div>
            <Notificacion mensaje={msg} {...notificacion} />
            <Navigate to={'/cart'} />
        </div>
      ) : (
        <p>
          {"Tiempo restante: "}
          {mins}:{secs < 10 ? `0${secs}` : secs}
        </p>
      )}
    </div>
  );
}

export default Countdown;