import React from "react";

const UserAuth = React.createContext({
  isLoggedIn: null,
  setIsLoggedIn: null,
});

export default UserAuth;
