// import UserProfile from "../components/Profile/UserProfile";

// const ProfilePage = () => {
//   return <UserProfile />;
// };

// export default ProfilePage;
import { useContext, useEffect } from "react";
import { useParams, Route, Link, useRouteMatch, useHistory } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";

import ProfileForm from "../components/Profile/ProfileForm";
import useHttp from "../hooks/use-http";
import useHttps from "../hooks/use-https";
import { UpdateAppointment } from "../lib/api";
import { getSingleAppointment } from "../lib/api";
import AuthContext from "../store/auth-context";

const FIREBASE_DOMAIN =
  "https://webapp-appointments-default-rtdb.firebaseio.com";

// function GetAppointment(appointmentData){
//     const {sendRequest, status} = useHttp(getSingleAppointment);
//     const history = useHistory();
//     useEffect(() => {
//         if(status === 'completed' ){
//             history.replace(`/appointments`);
//         }
//     },[status,history]);
//     function getAppointmentHandler(appointmentData){
//         sendRequest(appointmentData);

//     };

//     return <ProfileForm isLoading = {status === 'pending'}  onGetAppointment = {getAppointmentHandler} />;
// };

function UpdateAppointments(props) {
  const authCtx = useContext(AuthContext);
  const match = useRouteMatch();
  const params = useParams();
  const history = useHistory();
  //const { actualAppointmentId } = loadedAppointment.id;

  const { appointmentId, userId } = params;

  const {
    sendRequests,
    state,
    data: loadedAppointment,
    error,
  } = useHttps(getSingleAppointment, true);

  const { sendRequest, status } = useHttp(UpdateAppointment);

  useEffect(() => {
    if (status === "completed" && state === "completed") {
      history.replace(`/appointments/${authCtx.localId}`);
    }
  }, [status, state, history]);

  useEffect(() => {
    sendRequests(appointmentId);
  }, [sendRequests, appointmentId]);

  function updateAppointmentHandler(appointmentData) {

    sendRequest(appointmentData);
  }
  function getAppointmentHandler() {
    return (
      <Fragment>
        <ProfileForm
        id = {loadedAppointment.id}
        name={loadedAppointment.name} 
        startTime={loadedAppointment.startTime} 
        endTime={loadedAppointment.endTime}
        description={loadedAppointment.description}
        timeStamp={loadedAppointment.timeStamp}/>
        
      </Fragment>
    );
  }

  //   function getAppointmentHandler(appointmentData){
  //     const response = fetch(
  //       `${FIREBASE_DOMAIN}/appointments/${appointmentData}.json`
  //     );
  //     const data = response.json();

  //     const loadedAppointment = {
  //       id: appointmentData,
  //       ...data,
  //     };

  //     return loadedAppointment;

  // };
  return (
    <ProfileForm
      isLoading={status === "pending"}
      onGetAppointment = {getAppointmentHandler}
      onUpdateAppointment={updateAppointmentHandler}
      id={appointmentId}
      uid={userId}
    />
  );
}

export default UpdateAppointments;
