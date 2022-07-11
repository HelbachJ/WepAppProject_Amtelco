import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import AppointmentsForm from "../components/Appointment/AppointmentsForm";
import useHttp from "../hooks/use-http";
import { addAppointment } from "../lib/api";
import AuthContext from "../store/auth-context";

function NewAppointment(props) {
  const authCtx = useContext(AuthContext);
  const { sendRequest, status } = useHttp(addAppointment);
  const history = useHistory();

  useEffect(() => {
    if (status === "completed") {
      history.push(`/appointments/${authCtx.localId}`);
    }
  }, [status, history, authCtx.localId]);

  function addAppointmentHandler(appointmentData) {
    sendRequest(appointmentData);
  }
  return (
    <AppointmentsForm
      isLoading={status === "pending"}
      onAddAppointment={addAppointmentHandler}
    />
  );
}

export default NewAppointment;
