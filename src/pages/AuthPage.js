import { getAllUsers } from "../lib/api";
import { useEffect } from "react";
import { useParams, Route, useHistory } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import useHttp from "../hooks/use-http";
import AuthForm from "../components/Auth/AuthForm";

const AuthPage = () => {
  const params = useParams();
  //const { actualAppointmentId } = loadedUsers.id;

  const firebaseConfig = {
    apiKey: "AIzaSyBn2Seq2SIPI7aF1D2rjlhPfOR1pAdjssM",

    authDomain: "webapp-appointments.firebaseapp.com",

    databaseURL: "https://webapp-appointments-default-rtdb.firebaseio.com",

    projectId: "webapp-appointments",

    storageBucket: "webapp-appointments.appspot.com",

    messagingSenderId: "204832763234",

    appId: "1:204832763234:web:7ee115084b59ad59c8503b",

    measurementId: "G-XYHRX0CXZW",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const user = auth.currentUser;

  const { userId } = params;
 // userId = user;
  const {
    sendRequest,
    status,
    data: loadedUsers,
    error,
  } = useHttp(getAllUsers, true);

  useEffect(() => {
    sendRequest(userId);
  }, [sendRequest, userId]);

  return <AuthForm uid={userId} />;
};

export default AuthPage;
