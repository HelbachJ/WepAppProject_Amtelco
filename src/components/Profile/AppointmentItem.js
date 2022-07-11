import { Link, useHistory, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import UpdateAppointment from "../../pages/UpdateAppointment";

import classes from "./QuoteItem.module.css";
import { Button } from "bootstrap";
import { getSingleAppointment } from "../../lib/api";
import useHttp from "../../hooks/use-http";
import ProfileForm from "./ProfileForm";
import AuthContext from "../../store/auth-context";

const AppointmentItem = (props) => {
  const [userAppointments, setUserAppointments] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const authCtx = useContext(AuthContext);

  const {sendRequest, status} = useHttp(getSingleAppointment);

    useEffect(() => {
        if(status === 'completed' ){
            history.replace(`/appointments/${props.localId}`);
        }
    },[status,history]);


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
    });
  }

  function editHandler(appointmentData){
    sendRequest(appointmentData)
    //return<ProfileForm isLoading = {status === 'pending'} onUpdateAppointment={updateAppointmentHandler} />
  }

  return (
    <div>
      <li className={classes.item}>
        <figure>
        <figcaption>User Id: {props.localId}</figcaption>
          <time>Created: {props.timeStamp} </time>
          <time>Edited: {props.updatedTime}</time>
          <blockquote>
            <p>{props.startTime + " - " + props.endTime}</p>
          </blockquote>
          <figcaption>{props.name}</figcaption>
          <figcaption>{props.description}</figcaption>
        </figure>
        <button>
          <Link className="btn" to={`/appointment/${props.localId}/${props.id}`}>
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
