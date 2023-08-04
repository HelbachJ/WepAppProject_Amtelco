import { Link, useHistory, useLocation } from "react-router-dom";
import { useState, useEffect} from "react";

import classes from "./AppointmentItem.module.css";
import { getAllAppointments, getSingleAppointment } from "../../lib/api";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../UI/LoadingSpinner";

const AppointmentItem = (props) => {
  const [userAppointments, setUserAppointments] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const currentTime = Date().toLocaleString();
  localStorage.setItem("timeStamp", currentTime);

  const url = `https://webapp-appointments-default-rtdb.firebaseio.com/appointments/${props.localId}/${props.id}.json`;
  //const url2 = `https://webapp-appointments-default-rtdb.firebaseio.com/appointments/${props.localId}.json`;

  const { status } = useHttp(getSingleAppointment);

  const {
    data: loadedAppointments,
    error,
  } = useHttp(getAllAppointments, true);

  useEffect(() => {
    if (status === "completed") {
      history.replace(`/appointments/${props.localId}`);
    }
    // if (setIsDeleted(true)) {
    //   fetch(url, {
    //     method: "GET",
    //   });
    // }
    //setUserAppointments(loadedAppointments);
  }, [status, history, props.localId]);

  const deleteHandler = async (event) => {
    event.preventDefault();
    history.push({ pathname: location.pathname });
    try {
      const response = await fetch(url, {
        method: "DELETE",
      })
      .then(response => response.json())
        .then(()=> {
        setUserAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.id !== props.id)
        );
        window.location.reload(false); //temporary fix
      })
    } catch (error) {
      console.error("Error deleting Item: ", error);
    }
  };

  // const fetchAppointments = async () => {
  //   //event.preventDefault();
  //   if (isDeleted) {
  //     try {
  //       const response = await fetch(url2);
  //       const data = await response.json();
  //       setUserAppointments(data);
  //       //history.replace(`/appointments/${props.localId}`);
  //     } catch (error) {
  //       console.error("Error fetching appointments: ", error);
  //     }
  //   }
  // };
  // //},[url2, history]);

  // useEffect(() => {
  //   fetchAppointments();
  // }, [isDeleted]);

  function finishEnteringHandler() {
    setIsDeleted(true);
  }

  return (
    <div>
      <form className={classes.form} onSubmit={deleteHandler}>
        {props.isLoading && (
          <div className={classes.loading}>
            <LoadingSpinner />
          </div>
        )}
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
          <button className="btn" onClick={finishEnteringHandler}>
            delete
          </button>
        </li>
      </form>
    </div>
  );
};

export default AppointmentItem;
