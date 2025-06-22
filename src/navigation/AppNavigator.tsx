import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthScreen from "../screens/AuthScreen";
import DashboardScreen from "../screens/DashboardScreen";
import SearchBusinessScreen from "../screens/SearchBusinessScreen";
import TakeActionScreen from "../screens/TakeActionScreen";
import ManageReviewsScreen from "../screens/ManageReviewsScreen";
import PostSchedulerScreen from "../screens/PostSchedulerScreen";
import CreatePostScreen from "../screens/CreatePostScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { RootStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="SearchBusiness" component={SearchBusinessScreen} />
        <Stack.Screen name="TakeAction" component={TakeActionScreen} />
        <Stack.Screen name="ManageReviews" component={ManageReviewsScreen} />
        <Stack.Screen name="PostScheduler" component={PostSchedulerScreen} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
