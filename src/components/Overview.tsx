import React, { useCallback } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { addElementToOverviewList } from '../actions/Actions';
import { IRoom, StoreState } from '../reducers/Reducer';

import { AddItem } from './AddItem';
import { ListItem } from './ListItem';

const extractkey = (_: IRoom, index: number) => {
  return index.toString();
};

const renderItem = (item: ListRenderItemInfo<IRoom>) => {
  return <ListItem item={item.item} />;
};

export const Overview = () => {
  const dispatch = useDispatch();

  const onPress = useCallback(
    (newText: string) => {
      if (!(newText.trim() === '')) dispatch(addElementToOverviewList(newText));
    },
    [dispatch],
  );

  const listData = useSelector((state: StoreState) => state);

  return (
    <View style={styles.container}>
      <AddItem label={'Raum'} onPress={onPress} />
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
});
