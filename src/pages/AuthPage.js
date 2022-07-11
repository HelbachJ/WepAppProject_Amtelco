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


  return <AuthForm/>;
};

export default AuthPage;
