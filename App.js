import 'react-native-gesture-handler';
import React from 'react';
import Main from './views/Main';
import Register from './views/Register';
import Login from './views/Login';
import Therapist from './views/Therapist';
import Profile from './views/Profile';
import Calendar from './views/Calendar';
import TherapistProfile from './views/TherapistProfile';
import TherapistDocument from './views/TherapistDocument';
import PasswordRecovery from './views/PasswordRecovery';
import Checkout from './views/Checkout';
import Dashboard from './views/Dashboard';
import StoreHome from './views/store/StoreHome';
import Product from './views/store/Product';
import Chat from './views/Chat';
import TherapistDashboard from './views/TherapistDashboard';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import UserContext from './Context/UserContext';

const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" headerMode="none">
        <Stack.Screen name="Home" component={Main} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Therapist" component={Therapist} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Calendar" component={Calendar} />
        <Stack.Screen name="TherapistProfile" component={TherapistProfile} />
        <Stack.Screen name="TherapistDocument" component={TherapistDocument} />
        <Stack.Screen name="PasswordRecovery" component={PasswordRecovery} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen
          name="TherapistDashboard"
          component={TherapistDashboard}
        />
        <Stack.Screen name="StoreHome" component={StoreHome} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
