import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  localId:"",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingTime = adjExpirationTime - currentTime;

  return remainingTime;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedId = localStorage.getItem('localId');
  const storedExpirations = localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirations)

  if(remainingTime<=3600) {
    localStorage.removeItem('token');
    localStorage.removeItem('localId');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return {
    token: storedToken,
    localId:storedId,
    duration: remainingTime
  }
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken;
  if(tokenData){
    initialToken = tokenData.token;
  }
  
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const userData = retrieveStoredToken();
  let initialId;
  if(userData){
    initialId = userData.localId;
  }
  
  const [localId, setLocalId] = useState(initialId);



  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('localId');
    localStorage.removeItem('expirationTime');

    if(logoutTimer){
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, localId, expirationTime) => {
    setToken(token);
    setLocalId(localId);
    localStorage.setItem('token', token);
    localStorage.setItem('localId', localId);
    localStorage.setItem('expirationTime',expirationTime)

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(()=>{
    if(tokenData){

      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  },[tokenData, logoutHandler])


  const contextValue = {
    token: token,
    localId:localId,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
