import { Link } from 'react-router-dom';

import classes from './NoQuotesFound.module.css';

const NoAppointmentsFound = () => {
  return (
    <div className={classes.noquotes}>
      <p>No Appointments found!</p>
      <Link className='btn'to='/newAppointment/:userId'  >
        Add an Appointment
      </Link>
    </div>
  );
};

export default NoAppointmentsFound;
