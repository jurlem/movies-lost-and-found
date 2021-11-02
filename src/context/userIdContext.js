import React, { createContext } from "react";

const UserIdContext = createContext({
  userId: '',
  setUserId: () => { }
}
);

export default UserIdContext;