import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import { Details } from "./src/components/Details";
import { Overview } from "./src/components/Overview";
import { reducer } from "./src/reducers/Reducer";

const Stack = createStackNavigator();
const store = createStore(reducer);

export const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Overview" component={Overview} />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
