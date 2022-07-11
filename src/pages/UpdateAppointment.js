import { useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import UpdateForm from "../components/Update/UpdateForm";
import useHttp from "../hooks/use-http";
import useHttps from "../hooks/use-https";
import { UpdateAppointment } from "../lib/api";
import { getSingleAppointment } from "../lib/api";
import AuthContext from "../store/auth-context";

function UpdateAppointments(props) {
  const authCtx = useContext(AuthContext);
  const params = useParams();
  const history = useHistory();

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

  return (
    <UpdateForm
      isLoading={status === "pending"}
      onUpdateAppointment={updateAppointmentHandler}
      id={appointmentId}
      uid={userId}
    />
  );
}

export default UpdateAppointments;
