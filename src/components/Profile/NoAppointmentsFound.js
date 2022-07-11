import { Link } from 'react-router-dom';

import classes from './NoQuotesFound.module.css';

const NoAppointmentsFound = (props) => {
  return (
    <div className={classes.noquotes}>
      <p>No Appointments found!</p>
      <Link className='btn'to={`/newAppointment/${props.localId}`}  >
        Add an Appointment
      </Link>
    </div>
  );
};

export default NoAppointmentsFound;
