import { useState, useContext, createContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import AuthContext from "../store/auth-context";


const FIREBASE_DOMAIN =
  "https://webapp-appointments-default-rtdb.firebaseio.com";

  // const firebaseConfig = {

  //   apiKey: "AIzaSyBn2Seq2SIPI7aF1D2rjlhPfOR1pAdjssM",
  
  //   authDomain: "webapp-appointments.firebaseapp.com",
  
  //   databaseURL: "https://webapp-appointments-default-rtdb.firebaseio.com",
  
  //   projectId: "webapp-appointments",
  
  //   storageBucket: "webapp-appointments.appspot.com",
  
  //   messagingSenderId: "204832763234",
  
  //   appId: "1:204832763234:web:7ee115084b59ad59c8503b",
  
  //   measurementId: "G-XYHRX0CXZW"
  
  // };

  // const app = initializeApp(firebaseConfig);
  // const auth = getAuth(app);
  // const user = auth.currentUser;
  

export async function getAllAppointments(appointmentData) {
  //const authCtx = createContext(AuthContext);
  const response = await fetch(`${FIREBASE_DOMAIN}/appointments/${appointmentData}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch appointments.");
  }

  const transformedAppointments = [];

  for (const appointmentData in data) {
    const appointmentObj = {
      id: appointmentData,
      // name: data[key].name,
      // startTime: data[key].startTime,
      // endTime: data[key].endTime,
      // description: data[key].description,
      ...data[appointmentData],
    };

    transformedAppointments.push(appointmentObj);
  }

  return transformedAppointments;
}


export async function getSingleAppointment(appointmentId) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/appointments/${appointmentId}.json`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch appointment.");
  }

  const loadedAppointment = {
    id: appointmentId,
    ...data,
  };

  return loadedAppointment;
}

export async function addAppointment(appointmentData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/appointments/${appointmentData.localId}.json`, {
    method: "POST",
    body: JSON.stringify(appointmentData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create appointment.");
  }

  return null;
}

// export function DeleteAppointment(appointmentData) {
//   const [userAppointments, setUserAppointments] = useState([]);

//    fetch(`${FIREBASE_DOMAIN}/appointments/${appointmentData}.json`, {
//     method: "DELETE",
//   }).then(response => {
//     setUserAppointments((prevAppointments) =>
//       prevAppointments.filter((appointment) => appointment.id !== appointmentData)
//     );
//   });

//   return userAppointments;
// }

export async function UpdateAppointment(appointmentObj) {
  //const history = useHistory();
  //const [userAppointments, setUserAppointments] = useState([]);
  // const loadedAppointment = {
  //   id: appointmentData,
  //   ...data,
  // };

  const response = await fetch(
    `${FIREBASE_DOMAIN}/appointments/${appointmentObj.localId}/${appointmentObj.id}.json`,
    {
      method: "PUT",
      body: JSON.stringify(appointmentObj),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  // .then((response) => {
  //   setUserAppointments((prevAppointments) =>
  //     prevAppointments.filter((appointment) => appointment.id !== appointmentData)
  //   );
  // });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not edit appointment.");
  }

  // const loadedAppointment = {
  //   id: appointmentData,
  //   ...data,
  // };

  return null;
}

export async function LoginUser(appointmentObj) {

  const response = await fetch(
    `${FIREBASE_DOMAIN}/users.json`,
    {
      method: "POST",
      body: JSON.stringify(appointmentObj),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not login.");
  }

  return null;
}
