import React from "react";

const SessionContext = React.createContext({
  sessionId: '',
  setSessionId: () => { }
});


export default SessionContext;