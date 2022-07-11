import { Link } from 'react-router-dom';

import classes from './NoAppointmentsFound.module.css';
import AuthContext from '../../store/auth-context';
import { useContext } from 'react';

const NoAppointmentsFound = (props) => {
  const authCtx = useContext(AuthContext) 
  return (
    <div className={classes.noquotes}>
      <p>No Appointments found!</p>
      <Link className='btn'to={`/newAppointment/${authCtx.localId}`}  >
        Add an Appointment
      </Link>
    </div>
  );
};

export default NoAppointmentsFound;
