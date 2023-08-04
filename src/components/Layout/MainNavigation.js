import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import classes from "./MainNavigation.module.css";

const MainNavigation = (props) => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const isLoggedIn = authCtx.isLoggedIn;

  const LogoutHandler = () => {
    authCtx.logout();
    history.replace("/");
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Application Manager</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/">Login</Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <Link
                to={`/appointments/${authCtx.localId}`}
                activeclassname={classes.active}
              >
                Appointments
              </Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <Link
                activeclassname={classes.active}
                to={`/newAppointment/${authCtx.localId}`}
              >
                Add Appointment
              </Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <button onClick={LogoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
