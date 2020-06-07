import { useNavigation } from '@react-navigation/native';
import { HeaderTitle } from '@react-navigation/stack';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { addTaskToRoom, changeRoomDescription } from '../actions/Actions';
import { ITask, StoreState } from '../reducers/Reducer';

import { AddItem } from './AddItem';
import { RoomSettingsDetailListItem } from './RoomSettingsDetailListItem';

const extractkey = (_: ITask, index: number) => {
  return index.toString();
};

export const TaskSettings = ({
  route,
}: {
  route: { params: { id: number; title: string } };
}) => {
  const { id, title } = route.params;

  const room = useSelector((state: StoreState) => state[id]);
  const description = room.description;
  const tasks = room.tasks;
  const navigation = useNavigation();
  const theme = useTheme();
  const dispatch = useDispatch();

  const renderItem = useCallback(
    (item: ListRenderItemInfo<ITask>) => {
      return <RoomSettingsDetailListItem item={item.item} roomId={id} />;
    },
    [id],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HeaderTitle>{title}</HeaderTitle>,
      headerBackTitleVisible: false,
    });
  }, [id, navigation, title]);

  const onChangeRoomDescription = useCallback(
    (newDescription: string) => {
      dispatch(changeRoomDescription(id, newDescription));
    },
    [dispatch, id],
  );

  const onPress = useCallback(
    (newText: string) => {
      if (!(newText.trim() === '')) dispatch(addTaskToRoom(newText, id));
    },
    [dispatch, id],
  );

  return (
    <View style={styles.container}>
      <TextInput
        label="Raumbeschreibung"
        value={description}
        onChangeText={onChangeRoomDescription}
        mode="outlined"
        theme={theme}
        multiline
      />
      <FlatList
        data={tasks}
        ListHeaderComponent={<AddItem label={'Aufgabe'} onPress={onPress} />}
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
    marginTop: 8,
  },
});
