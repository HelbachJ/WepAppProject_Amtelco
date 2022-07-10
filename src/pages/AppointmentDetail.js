import { Fragment, useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";

import HighlightedAppointment from "../components/Profile/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleAppointment } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

function AppointmentDetail() {
  const match = useRouteMatch();
  const params = useParams();

  const { appointmentId } = params;

  const {
    sendRequest,
    status,
    data: loadedAppointment,
    error,
  } = useHttp(getSingleAppointment, true);

  useEffect(() => {
    sendRequest(appointmentId);
  }, [sendRequest, appointmentId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedAppointment.name) {
    return <p>No quote found!</p>;
  }

  return (
    <Fragment>
      <HighlightedAppointment 
      
      name={loadedAppointment.name} 
      startTime={loadedAppointment.startTime} 
      endTime={loadedAppointment.endTime}
      description={loadedAppointment.description}
      timeStamp={loadedAppointment.timeStamp}
      updatedTime={loadedAppointment.updatedTime}/>
      

    </Fragment>
  );
}

export default AppointmentDetail;
