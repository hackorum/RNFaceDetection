import * as React from "react";
import Main from "./components/Main";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
