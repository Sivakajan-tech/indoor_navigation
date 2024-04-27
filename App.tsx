import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Welcome from './screens/Welcome';
import MainMap from './screens/MainMap';

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
         </Stack.Navigator>
      </NavigationContainer>
   );
};

export default App;
