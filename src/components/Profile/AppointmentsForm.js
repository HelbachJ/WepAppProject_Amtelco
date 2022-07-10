// import { useRef, useContext } from "react";
// import { useHistory } from "react-router-dom";
// import AuthContext from "../../store/auth-context";
// import editHandler from "../Profile/ProfileForm";

// import classes from "./ProfileForm.module.css";

// const AppointmentsForm = (props) => {
//   const history = useHistory();
//   const startInputRef = useRef();
//   const endInputRef = useRef();
//   const nameInputRef = useRef();
//   const descriptionInputRef = useRef();
//   const authCtx = useContext(AuthContext);

//   const submitHandler = (event) => {
//     event.preventDefault();

//     const enteredName = nameInputRef.current.value;
//     const enteredStartTime = startInputRef.current.value;
//     const enteredEndTime = endInputRef.current.value;
//     const enteredDescription = descriptionInputRef.current.value;

//     //Edit info
//     fetch(
//       "https://webapp-appointments-default-rtdb.firebaseio.com/appointments.json",
//       {
//         method: "POST",
//         body: JSON.stringify({
//           id: authCtx.token,
//           name: enteredName,
//           //created: enteredDate,
//           startTime: enteredStartTime,
//           endTime: enteredEndTime,
//           name: enteredName,
//           description: enteredDescription

//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     )
//   };

import { useRef, useState } from "react";
import { Prompt } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";

import Card1 from "../UI/Card1";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./AppointmentsForm.module.css";

const AppointmentsForm = (props) => {
  const [isEntered, setIsEntered] = useState(false);

  // const history = useHistory();
  const startInputRef = useRef();
  const endInputRef = useRef();
  const nameInputRef = useRef();
  const descriptionInputRef = useRef();
  //const timeStampRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStartTime = startInputRef.current.value;
    const enteredEndTime = endInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const currentTime = Date().toLocaleString();

    // optional: Could validate here

    props.onAddAppointment({
      uid: props.uid,
      name: enteredName,
      startTime: enteredStartTime,
      endTime: enteredEndTime,
      description: enteredDescription,
      timeStamp: currentTime
    });
  }

  function formFocusedHandler() {
    setIsEntered(true);
  };

  function finishEnteringHandler() {
    setIsEntered(false);
  };

  //return (
    // <form className={classes.form} onSubmit={submitHandler}>
    //   <div className={classes.control}>
    //     <label htmlFor="startTime">Start Time</label>
    //     <input type="int" id="startTime" ref={startInputRef} />
    //   </div>
    //   <div className={classes.control}>
    //     <label htmlFor="endTime">End Time</label>
    //     <input type="int" id="endTime" ref={endInputRef} />
    //   </div>
    //   <div className={classes.control}>
    //     <label htmlFor="name">Name</label>
    //     <input type="test" id="name" ref={nameInputRef} />
    //   </div>
    //   <div className={classes.control}>
    //     <label htmlFor="description">Description</label>
    //     <input type="string" id="description" ref={descriptionInputRef} />
    //   </div>
    //   <div className={classes.action}>
    //     <button onClick={submitHandler}>Add</button>
    //     <button onClick={editHandler}>Edit</button>
    //     {/* <button onClick={deleteHandler}>Delete</button> */}
    //   </div>
    // </form>
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
