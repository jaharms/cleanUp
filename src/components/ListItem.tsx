import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";

import { ITask } from "../reducers/Reducer";

interface IProps {
  item: ITask;
}

export const ListItem: React.FC<IProps> = (props: IProps) => {
  const { title, id } = props.item;

  const theme = useTheme();
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    navigation.navigate("Details", { id });
  }, [id, navigation]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.touchable,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.surface,
        },
      ]}
    >
      <Text>{title} </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 4,
    borderWidth: 1,
    marginVertical: 4,
    padding: 4,
  },
});
