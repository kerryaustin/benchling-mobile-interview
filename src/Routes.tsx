import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {Home} from './screens/Home/Home';
import {Splash} from './screens/Splash';

const MainStackNavigator = createNativeStackNavigator();

export const Routes: FC = () => {
  return (
    <MainStackNavigator.Navigator initialRouteName="Splash">
      <MainStackNavigator.Group screenOptions={{headerShown: false}}>
        <MainStackNavigator.Screen component={Splash} name="Splash" />
        <MainStackNavigator.Screen
          options={{animation: 'none'}}
          component={Home}
          name="Home"
        />
      </MainStackNavigator.Group>
    </MainStackNavigator.Navigator>
  );
};
