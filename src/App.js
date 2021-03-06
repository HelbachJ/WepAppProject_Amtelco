import { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import React, { Suspense } from "react";

import Layout from "./components/Layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import AuthPage from "./pages/AuthPage";

import AuthContext from "./store/auth-context";

const NewAppointment = React.lazy(() => import("./pages/NewAppointment"));
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
          {!authCtx.isLoggedIn && (
            <Route path="/" exact>
              <AuthPage />
            </Route>
          )}
          {authCtx.isLoggedIn && (
            <Route path="/appointments/:userId">
              <AllAppointments />
            </Route>
          )}

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

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
