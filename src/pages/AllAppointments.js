import { useContext, useEffect } from "react";
import { useParams} from "react-router-dom";
import useHttp from "../hooks/use-http";
import { getAllAppointments } from "../lib/api";
import AppointmentList from "../components/Profile/AppointmentList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoAppointmentsFound from "../components/Profile/NoAppointmentsFound";
import AuthContext from "../store/auth-context";
import {initializeApp} from "firebase/app"
import {confirmPasswordReset, getAuth} from "firebase/auth"

function AllAppointments(props) {

  const FIREBASE_DOMAIN =
  "https://webapp-appointments-default-rtdb.firebaseio.com";

 
  // const auth = getAuth();
  // const user = auth.currentUser;
  // if (user !== null) {
  //   // The user object has basic properties such as display name, email, etc.
  //   const displayName = user.displayName;
  //   const email = user.email;
  //   const photoURL = user.photoURL;
  //   const emailVerified = user.emailVerified;
  
  //   // The user's ID, unique to the Firebase project. Do NOT use
  //   // this value to authenticate with your backend server, if
  //   // you have one. Use User.getToken() instead.
  //   const uid = user.uid;
  //   console.log(uid)
  // }

//console.log(uid)
const authCtx = useContext(AuthContext);
  const params = useParams();

  const { userId } = params;

    const {
      sendRequest,
      status,
      data: loadedAppointments,
      error,
    } = useHttp(getAllAppointments, true);
  
    useEffect(() => {
      sendRequest(userId);
    }, [sendRequest, userId]);
  
    if (status === "pending") {
      return (
        <div className="centered">
          <LoadingSpinner />
        </div>
      );
    }
  
    if (error) {
      return <p className="centered focused">{error}</p>;
    }
  
    if (status === "completed" && (!loadedAppointments || loadedAppointments.length === 0)) {
      return <NoAppointmentsFound />;
    }
  
    return <AppointmentList appointments={loadedAppointments} uid = {authCtx.localId} />;
}

export default AllAppointments;

