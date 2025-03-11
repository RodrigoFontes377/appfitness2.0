import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import TrainingScreen from "./screens/TrainingScreen";
import MyWorkoutsScreen from "./screens/MyWorkoutsScreen";
import ExerciseDetailsScreen from "./screens/ExerciseDetailsScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// 🔹 Stack de Treinos (Treinos + Detalhes)
const TrainingStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="TrainingScreen" component={TrainingScreen} />
    <Stack.Screen name="ExerciseDetails" component={ExerciseDetailsScreen} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Início") iconName = "home";
            else if (route.name === "Exercícios") iconName = "barbell";
            else if (route.name === "Ficha de Treino") iconName = "time";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#2ECC71",
          tabBarInactiveTintColor: "#777",
          tabBarStyle: {
            backgroundColor: "#fff",
            paddingBottom: 5,
            height: 60,
          },
        })}
      >
        <Tab.Screen name="Início" component={HomeScreen} />
        <Tab.Screen name="Exercícios" component={TrainingStack} />
        <Tab.Screen name="Ficha de Treino" component={MyWorkoutsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
