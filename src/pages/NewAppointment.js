import { useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";

import AppointmentsForm from "../components/Appointment/AppointmentsForm";
import useHttp from "../hooks/use-http";
import { addAppointment } from "../lib/api";
import AuthContext from "../store/auth-context";

function NewAppointment(props) {
  const authCtx = useContext(AuthContext);
  const { sendRequest, status } = useHttp(addAppointment);
  const history = useHistory();
  const params = useParams();

  let { userId } = params;
  // props.userId = userId;

  useEffect(() => {
    if (status === "completed") {
      history.push(`/appointments/${authCtx.localId}`);
      console.log(userId);
    }
  }, [status, history]);

  function addAppointmentHandler(appointmentData) {
    sendRequest(appointmentData);
  }
  return (
    <AppointmentsForm
      isLoading={status === "pending"}
      onAddAppointment={addAppointmentHandler}
      userId={authCtx.localId}
    />
  );
}

export default NewAppointment;
