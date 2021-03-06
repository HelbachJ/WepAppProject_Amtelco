import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { getAllAppointments } from "../lib/api";
import AppointmentList from "../components/Appointment/AppointmentList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoAppointmentsFound from "../components/Appointment/NoAppointmentsFound";
import AuthContext from "../store/auth-context";

function AllAppointments(props) {
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

  if (
    status === "completed" &&
    (!loadedAppointments || loadedAppointments.length === 0)
  ) {
    return <NoAppointmentsFound />;
  }

  return (
    <AppointmentList appointments={loadedAppointments} uid={authCtx.localId} />
  );
}

export default AllAppointments;
