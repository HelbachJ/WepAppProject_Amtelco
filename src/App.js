import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import React, { Suspense } from "react";

import Layout from "./components/Layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";
//import AppointmentsForm from "./components/Profile/AppointmentsForm";
import UserProfile from "./components/Profile/UserProfile";
import StartingPageContent from "./components/StartingPage/StartingPageContent";
//import AllAppointments from "./pages/AllAppointments";
//import AppointmentDetail from "./pages/AppointmentDetail";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
//import ProfilePage from "./pages/ProfilePage";
import AuthContext from "./store/auth-context";
//import UpdateAppointment from "./pages/UpdateAppointment";

const NewAppointment = React.lazy(() => import("./pages/NewAppointment"));
const AppointmentDetail = React.lazy(() => import("./pages/AppointmentDetail"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const AllAppointments = React.lazy(() => import("./pages/AllAppointments"));
const UpdateAppointment = React.lazy(() => import("./pages/UpdateAppointment"));

function App(props) {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          {/* <Route path="/" exact>
            <StartingPageContent />
          </Route> */}
          {!authCtx.isLoggedIn && (
            <Route path='/' exact>
              <AuthPage />
            </Route>
          )}
          {authCtx.isLoggedIn && (
            <Route path="/appointments/:userId">
              <AllAppointments />
            </Route>
          )}
          {/* {!authCtx.isLoggedIn && (
            <Route path="/appointments/:appointmentId">
              <AppointmentDetail />
            </Route>
          )} */}
          {/* {!authCtx.isLoggedIn && (
          <Route path="/appointmentsForm">
            <AppointmentsForm />
          </Route>
        )} */}
          {authCtx.isLoggedIn && (
            <Route path="/newAppointment/:userId">
              <NewAppointment />
            </Route>
          )}
           {authCtx.isLoggedIn && (
             <Route path="/appointment/:userId/:appointmentId">
              <UpdateAppointment />
            </Route>
          )}

          {/* <Route path="/profile">
            {authCtx.isLoggedIn && <UserProfile />}
            {!authCtx.isLoggedIn && <Redirect to="/auth" />}
          </Route> */}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
