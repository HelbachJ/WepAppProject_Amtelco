// import React, { useState, useRef, useContext, useEffect } from "react";
// import { useHistory } from "react-router-dom";

// import AuthContext from "../../store/auth-context";
// import classes from "./AuthForm.module.css";

// const AuthForm = (props) => {
//   const history = useHistory();
//   // const usernameInputRef = useRef();
//   // const passwordInputRef = useRef();
//   //const {sendRequest: fetchUsers } = AuthContext();
//   //const [users, setUsers] = useState([]);
//   const [username, setUserName] = useState("");
//   const [password, setPassword] = useState("");

//   const authCtx = useContext(AuthContext);

//   const [isLogin, setIsLogin] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   //const [users, setUsers] = useState([]);

//   // const switchAuthModeHandler = () => {
//   //   setIsLogin((prevState) => !prevState);
//   // };

//   useEffect(() => {
//     if (username == props.username) {
//       history.push(`/${props.id}`);
//       setIsLogin(true);
//     } else {
//     }
//   }, []);

//   async function submitHandler(event) {
//     event.preventDefault();
//     //const currentUsers = [];
//     console.warn(username, password);

//     // const enteredUsername = usernameInputRef.current.value;
//     // const enteredPassword = passwordInputRef.current.value;

//     // for (const userKey in currentUsers) {
//     //   currentUsers.push({
//     //     id: userKey,
//     //     username: currentUsers[userKey].name,
//     //     password: currentUsers[userKey].password,
//     //   });
//     // }
//     let url;
//     url = "https://webapp-appointments-default-rtdb.firebaseio.com/users.json";

//     const result = await fetch(url, {
//       method: "POST",
//       body: JSON.stringify({
//         username: username,
//         password: password,
//         returnSecureToken: true,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       //submitHandler
//     }).then((res) => {
//       if (username == props.username && password == props.password) {
//         return (
//           res.json(),
//           history.push("/appointments"),
//           setIsLogin(true),
//           res.json(),
//           console.log(`${username} or ${password} are valid`)
//         );
//       } else {
//         console.log(`${props.username} or ${password} are invalid`);
//         return null;
//       }
//     });
//     //localStorage.setItem("users",JSON.stringify(result))
//     // .then((result) => {
//     //   setIsLoading(false);
//     //   if (result.ok) {
//     //     return result.json();
//     //     //this.goToMain
//     //   } else {
//     //     return result.json().then((data) => {
//     //       let errorMessage = "Authentication failed!";
//     //       if (data && data.error && data.error.message) {
//     //         errorMessage = data.error.message;
//     //       }

//     //       throw new Error(errorMessage);
//     //     });
//     //   }
//     // })
//     // .then((data) => {
//     //   const expirationTime = new Date(
//     //     new Date().getTime() + +data.expiresIn * 1000
//     //   );
//     //   authCtx.login(data.idToken, expirationTime.toISOString());
//     //   history.replace("/");
//     // })
//     // .catch((err) => {
//     //   alert(err.message);
//     // });
//   }

//   return (
//     <section className={classes.auth}>
//       <h1>{"Login"}</h1>
//       <form onSubmit={submitHandler}>
//         <div className={classes.control}>
//           <label htmlFor="username">Username</label>
//           <input
//             onChange={(e) => setUserName(e.target.value)}
//             type="text"
//             id="username"
//             // required
//             //ref={usernameInputRef}
//           />
//         </div>
//         <div className={classes.control}>
//           <label htmlFor="password">Password</label>
//           <input
//             onChange={(e) => setPassword(e.target.value)}
//             type="password"
//             id="password"
//             // required
//             // ref={passwordInputRef}
//           />
//         </div>
//         <div className={classes.actions}>
//           {<button>{"Login"}</button>}
//           {isLoading && <p>Sending request...</p>}
//           {/* <button
//             type='button'
//             className={classes.toggle}
//             onClick={switchAuthModeHandler}
//           >
//             {isLogin ? 'Create new account' : 'Login with existing account'}
//           </button> */}
//         </div>
//       </form>
//     </section>
//   );
// };

// export default AuthForm;
import { useState, useRef, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import classes from "./AuthForm.module.css";
import AllAppointments from "../../pages/AllAppointments";
import NewAppointment from "../../pages/NewAppointment";
import MainNavigation from "../Layout/MainNavigation";
import App from "../../App";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getIdToken } from "firebase/auth";
import AppointmentItem from "../Profile/AppointmentItem";
import AppointmentsForm from "../Profile/AppointmentsForm";
import AppointmentList from "../Profile/AppointmentList";

const AuthForm = (props) => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  //const tag = useRef();
  const authCtx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    
    event.preventDefault();
    const tag = "@gmail.com";
    const enteredEmail = emailInputRef.current.value + tag;
    const enteredPassword = passwordInputRef.current.value;
    //  const app = initializeApp(firebaseConfig);
    // const auth = getAuth(app);
    // const user = auth.currentUser;
    const userId = authCtx.token;

    // optional: Add validation

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key= AIzaSyBn2Seq2SIPI7aF1D2rjlhPfOR1pAdjssM ";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= AIzaSyBn2Seq2SIPI7aF1D2rjlhPfOR1pAdjssM ";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, data.localId, expirationTime.toISOString());
        history.push(`/appointments/${data.localId}`);
      })
      .catch((err) => {
        alert(err.message);
      });

    // getAuth()
    //   .getUserByEmail(enteredEmail)
    //   .then((userRecord) => {
    //     // See the UserRecord reference doc for the contents of userRecord.
    //     console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
    //   })
    //   .catch((error) => {
    //     console.log("Error creating new user:", error);
    //   });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="text" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

//export const uid = getUserId(userId) ;
export default AuthForm;
