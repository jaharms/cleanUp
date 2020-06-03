import React, { useCallback, useState } from 'react';
import {
  FlatList,
  Keyboard,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { TextInput, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { addElementToOverviewList } from '../actions/Actions';
import { IRoom, StoreState } from '../reducers/Reducer';

import { ListItem } from './ListItem';

const extractkey = (_: IRoom, index: number) => {
  return index.toString();
};

const renderItem = (item: ListRenderItemInfo<IRoom>) => {
  return <ListItem item={item.item} />;
};

export const Overview = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const theme = useTheme();

  const onPress = useCallback(() => {
    if (!(text.trim() === '')) dispatch(addElementToOverviewList(text));
    setText('');
    Keyboard.dismiss();
  }, [dispatch, text]);

  const onChangeText = useCallback((newText: string) => {
    setText(newText);
  }, []);

  const listData = useSelector((state: StoreState) => state);

  return (
    <View style={styles.container}>
      <View
        style={{ flexDirection: 'row', marginBottom: 12, alignItems: 'center' }}
      >
        <TextInput
          label="Raum"
          value={text}
          onChangeText={onChangeText}
          mode="outlined"
          style={{ flex: 1, marginRight: 4 }}
          onSubmitEditing={onPress}
          theme={theme}
        />
        <Icon reverse name="add" color="#006699" onPress={onPress} />
      </View>
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
