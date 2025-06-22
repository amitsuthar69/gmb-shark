import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/navigation";
import { useNavigation } from "@react-navigation/native";

type PostSchedulerScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "PostScheduler"
>;

export default function PostSchedulerScreen() {
  const navigation = useNavigation<PostSchedulerScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Post Scheduler Screen</Text>
      <Button
        title="Dashboard Screen"
        onPress={() => navigation.navigate("Dashboard")}
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
