import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import { StoreState } from "../reducers/Reducer";

export const Details = ({ route }: { route: { params: { id: number } } }) => {
  const { id } = route.params;

  const description = useSelector((state: StoreState) => state[id].description);

  return (
    <View style={styles.container}>
      <Text>{description || "No description yet"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 12,
  },
});
