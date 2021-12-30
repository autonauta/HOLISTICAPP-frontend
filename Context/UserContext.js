import React from 'react';

const UserContext = React.createContext({
  token: '',
  user: {},
  calendar: {},
});

export default UserContext;
