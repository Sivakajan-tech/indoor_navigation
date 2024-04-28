import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

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
   return (
      <NavigationContainer>
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
            <Stack.Screen
               name="AdminLogin"
               component={AdminLogin}
               options={{
                  headerShown: false,
               }}
            />
            <Stack.Screen
               name="AdminDashboard"
               component={AdminDashboard}
            />
            <Stack.Screen
               name="AdminCreate"
               component={AdminCreate}
            />
            <Stack.Screen
               name="AdminView"
               component={AdminView}
            />
            <Stack.Screen
               name="AdminUpdate"
               component={AdminUpdate}
            />
            <Stack.Screen
               name="AdminDelete"
               component={AdminDelete}
               options={{
                  headerShown: false,
               }}
            />
            <Stack.Screen
               name="DataCollectorScreen"
               component={DataCollector}
               options={{
                  headerShown: false,
               }}
            />
         </Stack.Navigator>
      </NavigationContainer>
   );
};

export default App;
