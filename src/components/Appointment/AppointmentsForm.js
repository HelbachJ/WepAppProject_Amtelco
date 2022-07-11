import { useRef, useState, useContext } from "react";
import { Prompt } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";
import AuthContext from "../../store/auth-context";

import Card1 from "../UI/Card1";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./AppointmentsForm.module.css";

const AppointmentsForm = (props) => {
  const [isEntered, setIsEntered] = useState(false);

  const startInputRef = useRef();
  const endInputRef = useRef();
  const nameInputRef = useRef();
  const dateInputRef = useRef();
  const descriptionInputRef = useRef();

  const authCtx = useContext(AuthContext);

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredDate = dateInputRef.current.value;
    const enteredStartTime = startInputRef.current.value;
    const enteredEndTime = endInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const time = Date().toLocaleString();
    const created = "Created ";
    const currentTime = created + time;
    const userId = authCtx.localId;

    props.onAddAppointment({
      localId: userId,
      name: enteredName,
      date: enteredDate,
      startTime: enteredStartTime,
      endTime: enteredEndTime,
      description: enteredDescription,
      timeStamp: currentTime,
    });
  }

  function formFocusedHandler() {
    setIsEntered(true);
  }

  function finishEnteringHandler() {
    setIsEntered(false);
  }

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
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" ref={dateInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="startTime">Start Time</label>
            <input type="time" id="startTime" ref={startInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="endTime">End Time</label>
            <input type="time" id="endTime" ref={endInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" ref={nameInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="description">Description</label>
            <input type="text" id="description" ref={descriptionInputRef} />
          </div>
          <div className={classes.actions}>
            <button onClick={finishEnteringHandler} className="btn">
              Add Appointment
            </button>
          </div>
        </form>
      </Card1>
    </Fragment>
  );
};

export default AppointmentsForm;
