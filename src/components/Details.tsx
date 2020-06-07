import { useNavigation } from '@react-navigation/native';
import { HeaderTitle } from '@react-navigation/stack';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import * as Progress from 'react-native-progress';
import { useSelector } from 'react-redux';

import { ITask, StoreState } from '../reducers/Reducer';

import { RoomOverviewDetailListItem } from './RoomOverviewDetailListItem';

const extractkey = (_: ITask, index: number) => {
  return index.toString();
};

export const Details = ({ route }: { route: { params: { id: number } } }) => {
  const { id } = route.params;

  const navigation = useNavigation();

  const room = useSelector((state: StoreState) => state[id]);
  const description = room.description;
  const tasks = room.tasks;
  const roomTitle = room.title;

  const allTasks = tasks.length;
  const finishedTasks = tasks.filter((task: ITask) => task.finished === true)
    .length;
  const progress =
    allTasks === 0 ? 1 : finishedTasks === 0 ? 0 : finishedTasks / allTasks;

  const renderItem = useCallback(
    (item: ListRenderItemInfo<ITask>) => {
      return <RoomOverviewDetailListItem item={item.item} roomId={id} />;
    },
    [id],
  );

  const onHeaderRightPress = useCallback(() => {
    navigation.navigate('TaskSettings', { id, title: roomTitle });
  }, [id, navigation, roomTitle]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="build"
          color="#ffffff"
          style={styles.header}
          onPress={onHeaderRightPress}
        />
      ),
      headerBackTitleVisible: false,
      headerTitle: () => <HeaderTitle>{roomTitle}</HeaderTitle>,
    });
  }, [id, navigation, onHeaderRightPress, roomTitle]);

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        {description || 'Noch keine Beschreibung hinzugefügt'}
      </Text>
      {allTasks > 0 ? (
        <Progress.Bar
          progress={progress}
          width={Dimensions.get('screen').width - 24}
          color={'#006699'}
          unfilledColor={'#ffffff'}
          borderWidth={1}
          borderColor={'#006699'}
          style={styles.progressBar}
        />
      ) : null}
      <FlatList
        data={tasks}
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
  description: {
    marginVertical: 12,
  },
  flatList: {
    flex: 1,
  },
  header: {
    marginRight: 12,
  },
  progressBar: {
    marginVertical: 12,
  },
});
