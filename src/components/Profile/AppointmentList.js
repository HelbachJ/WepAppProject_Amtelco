import { useHistory, useLocation } from 'react-router-dom';
import { Fragment } from 'react';

import AppointmentItem from './AppointmentItem';
import classes from './QuoteList.module.css';

const sortAppointments = (appointments, ascending) => {
  return appointments.sort((appointmentA, appointmentB) => {
    if (ascending) {
      return appointmentA.id > appointmentB.id ? 1 : -1;
    } else {
      return appointmentA.id < appointmentB.id ? 1 : -1;
    }
  });
};

const AppointmentList = (props) => {
  
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const isSortAscending = queryParams.get('sort') === 'asc';

  const sortedAppointments = sortAppointments(props.appointments, isSortAscending);

  function changeSortingHandler(){
    history.push({
      pathname: location.pathname,
      search: `?sort=${(isSortAscending ? 'desc' : 'asc')}`
    });

  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>Sort {isSortAscending ? 'Descending' : 'Ascending'}</button>
      </div>
      <ul className={classes.list}>
        {sortedAppointments.map((appointment) => (
          <AppointmentItem
            userId = {appointment.userId}
            key={appointment.id}
            id={appointment.id}
            name={appointment.name}
            startTime={appointment.startTime}
            endTime={appointment.endTime}
            description={appointment.description}
            timeStamp = {appointment.timeStamp}
            updatedTime = {appointment.updatedTime}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default AppointmentList;
