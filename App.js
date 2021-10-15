import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import Main from './views/Main';
import Register from './views/Register';
import Login from './views/Login';
import Therapist from './views/Therapist';
import Profile from './views/Profile';
import Filters from './views/Filters';
import Calendar from './views/Calendar';
import TherapistProfile from './views/TherapistProfile';
import TherapistDocument from './views/TherapistDocument';
import PasswordRecovery from './views/PasswordRecovery';
import CheckoutTest from './views/CheckoutTest';
import Dashboard from './views/Dashboard';
import TherapistDashboard from './views/TherapistDashboard';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

function App() {
  //---------------------------------End of render list function--------------------------------
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" headerMode="none">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Main} />
        <Stack.Screen name="Therapist" component={Therapist} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Filters" component={Filters} />
        <Stack.Screen name="Calendar" component={Calendar} />
        <Stack.Screen name="TherapistProfile" component={TherapistProfile} />
        <Stack.Screen name="TherapistDocument" component={TherapistDocument} />
        <Stack.Screen name="PasswordRecovery" component={PasswordRecovery} />
        <Stack.Screen name="CheckoutTest" component={CheckoutTest} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen
          name="TherapistDashboard"
          component={TherapistDashboard}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
