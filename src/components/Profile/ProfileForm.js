import { useRef, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Component, Fragment } from "react/cjs/react.production.min";
import { Prompt } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../UI/LoadingSpinner";
import Card1 from "../UI/Card1";

import classes from "./AppointmentsForm.module.css";
import { appointmentActions } from "../../store/appointment-slice";
const FIREBASE_DOMAIN =
  "https://webapp-appointments-default-rtdb.firebaseio.com";

const ProfileForm = (props) => {
  const history = useHistory();
  const newStartTimeInputRef = useRef();
  const newEndTimeInputRef = useRef();
  const newNameInputRef = useRef();
  const newDescriptionInputRef = useRef();
  const authCtx = useContext(AuthContext);


  const [isEntered, setIsEntered] = useState(false);
  const [userAppointments, setUserAppointments] = useState([]);
  //const dispatch = useDispatch();
  

  const editFormHandler = (event) => {
    event.preventDefault();

    const enteredNewStartTime = newStartTimeInputRef.current.value;
    const enteredNewEndTime = newEndTimeInputRef.current.value;
    const enteredNewName = newNameInputRef.current.value;
    const enteredNewDescription = newDescriptionInputRef.current.value;
    const newCurrentTime = Date().toLocaleString();
    const currentId = props.id;
    const currentUser = props.uid;
    const currTime = props.timeStamp;

/*
    props.onGetAppointment({
      id: currentId,
      name: props.name,
      startTime: props.startTime,
      endTime: props.endTime,
      description: props.description,
    });*/

     props.onUpdateAppointment({
      localId: currentUser,
      id: currentId,
      name: enteredNewName,
      startTime: enteredNewStartTime,
      endTime: enteredNewEndTime,
      description: enteredNewDescription,
      timeStamp: currTime,
      updatedTime: newCurrentTime,
    });

  };

  function formFocusedHandler() {
    setIsEntered(true);
  }

  async function finishEnteringHandler() {
    setIsEntered(false);
  }

  //Edit info
  // fetch(
  //   "https://webapp-appointments-default-rtdb.firebaseio.com/appointments.json",
  //   {
  //     method: "POST",
  //     body: JSON.stringify({
  //       id: authCtx.token,
  //       //returnSecureToken: false,
  //       // userId: userId.current.value,
  //       // created: enteredDate,
  //       startTime: enteredNewStartTime,
  //       endTime: enteredNewEndTime,
  //       name: enteredNewName,
  //       description: enteredNewDescription

  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // ).then(res => {

  //   history.replace('/');
  // });

  return (
    <Fragment>
      <Prompt
        when={isEntered}
        message={(location) =>
          "Are you sure you want to leave? All entered data will be lost"
        }
      />
      <Card1>
        <form
          onFocus={formFocusedHandler}
          className={classes.form}
          onSubmit={editFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}
          <div className={classes.control}>
            <label htmlFor="new-startTime">Start Time</label>
            <input type="time" id="new-startTime" ref={newStartTimeInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="new-endTime">End Time</label>
            <input type="time" id="new-endTime" ref={newEndTimeInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="new-name">Name</label>
            <input type="text" id="new-name" ref={newNameInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="new-description">Description</label>
            <input
              type="text"
              id="new-description"
              ref={newDescriptionInputRef}
            />
          </div>
          <div className={classes.actions}>
            <button onClick={finishEnteringHandler} className="btn">
              Edit Appointment
            </button>
          </div>
        </form>
      </Card1>
    </Fragment>
  );
};

export default ProfileForm;
