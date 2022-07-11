import { Link, useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import classes from "./AppointmentItem.module.css";
import { getSingleAppointment } from "../../lib/api";
import useHttp from "../../hooks/use-http";

const AppointmentItem = (props) => {
  const [userAppointments, setUserAppointments] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const currentTime = Date().toLocaleString();
  localStorage.setItem("timeStamp", currentTime);

  const { status } = useHttp(getSingleAppointment);

  useEffect(() => {
    if (status === "completed") {
      history.replace(`/appointments/${props.localId}`);
    }
  }, [status, history, props.localId]);

  useEffect(() => {
    console.log("RENDERING APPOINTMENTS", userAppointments);
  }, [userAppointments]);

  function deleteHandler(event) {
    event.preventDefault();
    history.push({ pathname: location.pathname });

    fetch(
      `https://webapp-appointments-default-rtdb.firebaseio.com/appointments/${props.localId}/${props.id}.json`,
      {
        method: "DELETE",
      }
    ).then((response) => {
      setUserAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== props.id)
      );
      window.location.reload(false); //temporary fix
    });
  }

  return (
    <div>
      <li className={classes.item}>
        <figure>
          <figcaption>User Id: {props.localId}</figcaption>
          <time>
            {props.timeStamp} {props.updatedTime}{" "}
          </time>
          <blockquote>
            <p>{props.date}</p>
            <p>{props.startTime + " - " + props.endTime}</p>
          </blockquote>
          <figcaption>{props.name}</figcaption>
          <figcaption>{props.description}</figcaption>
        </figure>
        <button>
          <Link
            className="btn"
            to={`/appointment/${props.localId}/${props.id}`}
          >
            edit
          </Link>
        </button>
        <button className="btn" onClick={deleteHandler}>
          delete
        </button>
      </li>
    </div>
  );
};

export default AppointmentItem;
