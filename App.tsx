import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { Details } from './src/components/Details';
import { Overview } from './src/components/Overview';
import { reducer } from './src/reducers/Reducer';

const Stack = createStackNavigator();
const store = createStore(reducer);

export const App = () => {
  const theme = {
    ...DefaultTheme,
    // roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#006699',
      // accent:
      // background: '#ffffff',
      // surface:
      // text:
      // disabled:
      // placeholder:
      // backdrop :
    },
  };

  const navigationTheme = {
    ...NavigationDefaultTheme,
    colors: {
      background: '#cceeff',
      border: '#006699',
      card: '#006699',
      primary: '#ffffff',
      text: '#ffffff',
    },
  };

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={navigationTheme}>
          <Stack.Navigator>
            <Stack.Screen name="Overview" component={Overview} />
            <Stack.Screen name="Details" component={Details} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};
