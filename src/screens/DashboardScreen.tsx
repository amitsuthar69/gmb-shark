import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/navigation";
import { useNavigation } from "@react-navigation/native";

type DashbaordScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Dashboard"
>;

export default function DashboardScreen() {
  const navigation = useNavigation<DashbaordScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dashboard Screen</Text>
      <Button title="Auth Screen" onPress={() => navigation.navigate("Auth")} />
      <Button
        title="Take Action Screen"
        onPress={() => navigation.navigate("Auth")}
      />
      <Button
        title="Manage Reviews Screen"
        onPress={() => navigation.navigate("ManageReviews")}
      />
      <Button
        title="Search Business Screen"
        onPress={() => navigation.navigate("SearchBusiness")}
      />
      <Button
        title="Create Post Screen"
        onPress={() => navigation.navigate("CreatePost")}
      />
      <Button
        title="Post Schduler Screen"
        onPress={() => navigation.navigate("PostScheduler")}
      />
      <Button
        title="Settings Screen"
        onPress={() => navigation.navigate("Settings")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
