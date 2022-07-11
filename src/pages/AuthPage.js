import { useParams, Route, useHistory } from "react-router-dom";

import AuthForm from "../components/Auth/AuthForm";

const AuthPage = () => {
  const params = useParams();
  //const { actualAppointmentId } = loadedUsers.id;

  return <AuthForm />;
};

export default AuthPage;
