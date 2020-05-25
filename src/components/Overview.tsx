import React, { useCallback, useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput, useTheme } from "react-native-paper";

interface IProps {}

interface ITask {
  title: string;
  // description: string;
}

const data = [
  {
    title: "wasd",
  },
  {
    title: "asdasd",
  },
];

const extractkey = (_: any, index: number) => {
  return index.toString();
};

export const Overview = (props: IProps) => {
  const [text1, setText] = useState("");
  const [dataState, setDataState] = useState(data);

  const theme = useTheme();

  const renderItem = useCallback(
    (item: ListRenderItemInfo<ITask>) => {
      return (
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.surface,
            borderRadius: 4,
            borderWidth: 1,
            margin: 4,
            padding: 4,
          }}
        >
          <Text>{item.item.title} </Text>
        </TouchableOpacity>
      );
    },
    [theme.colors.surface]
  );

  const onPress = useCallback(() => {
    const newd = dataState.concat({ title: text1 });
    setDataState(newd);
  }, [dataState, text1]);

  const onChangeText = useCallback((newText: string) => {
    setText(newText);
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ margin: 12, flex: 1, borderColor: "red", borderWidth: 2 }}>
        <TextInput
          label="Todo"
          value={text1}
          onChangeText={onChangeText}
          mode="outlined"
          placeholder="Aufgabe"
          style={{ marginBottom: 12 }}
        />
        <TouchableOpacity onPress={onPress}>
          <Text>Add to list</Text>
        </TouchableOpacity>
        <FlatList
          data={dataState}
          renderItem={renderItem}
          keyExtractor={extractkey}
          style={{
            flex: 1,
            borderColor: "green",
            borderWidth: 2,
            marginTop: 12,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
