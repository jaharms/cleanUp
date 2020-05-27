import React, { useCallback, useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { addElementToOverviewList } from "../actions/Actions";
import { ITask, StoreState } from "../reducers/Reducer";

import { ListItem } from "./ListItem";

const extractkey = (_: ITask, index: number) => {
  return index.toString();
};

const renderItem = (item: ListRenderItemInfo<ITask>) => {
  return <ListItem item={item.item} />;
};

export const Overview = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const onPress = useCallback(() => {
    dispatch(addElementToOverviewList({ title: text }));
  }, [dispatch, text]);

  const onChangeText = useCallback((newText: string) => {
    setText(newText);
  }, []);

  const listData = useSelector((state: StoreState) => state);

  return (
    <View style={styles.container}>
      <TextInput
        label="Todo"
        value={text}
        onChangeText={onChangeText}
        mode="outlined"
        placeholder="Aufgabe"
      />
      <TouchableOpacity onPress={onPress} style={styles.touchable}>
        <Text>Add to list</Text>
      </TouchableOpacity>
      <FlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={extractkey}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 12,
  },
  flatList: {
    flex: 1,
  },
  touchable: {
    marginVertical: 12,
  },
});
