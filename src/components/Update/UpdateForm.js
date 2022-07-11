import { useRef, useState } from "react";

import { Fragment } from "react/cjs/react.production.min";
import { Prompt } from "react-router-dom";

import LoadingSpinner from "../UI/LoadingSpinner";
import Card1 from "../UI/Card1";

import classes from "./UpdateForm.module.css";

const ProfileForm = (props) => {
  const newStartTimeInputRef = useRef();
  const newEndTimeInputRef = useRef();
  const newNameInputRef = useRef();
  const newDescriptionInputRef = useRef();
  const newDateInputRef = useRef();

  const [isEntered, setIsEntered] = useState(false);

  const editFormHandler = (event) => {
    event.preventDefault();

    const enteredNewStartTime = newStartTimeInputRef.current.value;
    const enteredNewEndTime = newEndTimeInputRef.current.value;
    const enteredNewName = newNameInputRef.current.value;
    const enteredNewDescription = newDescriptionInputRef.current.value;
    const enteredNewDate = newDateInputRef.current.value;
    const newCurrentTime = Date().toLocaleString();
    const edited = "Edited ";
    const currentId = props.id;
    const currentUser = props.uid;
    const currTime = edited + newCurrentTime;

    props.onUpdateAppointment({
      localId: currentUser,
      id: currentId,
      name: enteredNewName,
      startTime: enteredNewStartTime,
      endTime: enteredNewEndTime,
      description: enteredNewDescription,
      date: enteredNewDate,
      updatedTime: currTime,
    });
  };

  function formFocusedHandler() {
    setIsEntered(true);
  }

  async function finishEnteringHandler() {
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
          onSubmit={editFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}
          <div className={classes.control}>
            <label htmlFor="new-date">Start Time</label>
            <input type="date" id="new-date" ref={newDateInputRef} />
          </div>
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
