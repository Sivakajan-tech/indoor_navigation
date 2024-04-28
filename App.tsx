import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from './screens/Welcome';
import MainMap from './screens/MainMap';

import AdminLogin from './screens/Admin/AdminLogin';
import AdminDashboard from './screens/Admin/AdminDashboard';
import AdminCreate from './screens/Admin/AdminCreate';
import AdminView from './screens/Admin/AdminView';
import AdminUpdate from './screens/Admin/AdminUpdate';
import AdminDelete from './screens/Admin/AdminDelete';
import DataCollector from './add_data_point/dataCollectorScreen';

const Stack = createStackNavigator();
const App = () => {
  const linking = {
    prefixes: ['pocketpath://'],
    config: {
      screens: {
        Welcome: 'welcome',
        MainMap:  'mainmap/:gridID',
      }
    },
  };
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MainMap"
          component={MainMap}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
