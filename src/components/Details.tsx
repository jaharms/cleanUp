import React, { useCallback, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Keyboard,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInput, useTheme } from 'react-native-paper';
import * as Progress from 'react-native-progress';
import { useDispatch, useSelector } from 'react-redux';

import { addTaskToRoom, removeTaskFromRoom } from '../actions/Actions';
import { ITask, StoreState } from '../reducers/Reducer';

const extractkey = (_: ITask, index: number) => {
  return index.toString();
};

interface IDetailProps {
  item: ITask;
  roomId: number;
}

const DetailItem: React.FC<IDetailProps> = (props: IDetailProps) => {
  const { item, roomId } = props;
  const { title, additionalInformation, finished, id } = item;

  const theme = useTheme();
  const dispatch = useDispatch();
  const [showDescription, setShowDescription] = useState(false);

  const onPressRemove = useCallback(() => {
    dispatch(removeTaskFromRoom(id, roomId));
  }, [dispatch, id, roomId]);

  const onShowMorePress = useCallback(() => {
    setShowDescription(!showDescription);
  }, [showDescription]);

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.surface,
        borderRadius: 4,
        borderWidth: 1,
        marginVertical: 8,
        padding: 12,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {finished ? (
          <Icon reverse name="done" color="#01DF01" size={16} />
        ) : (
          <Icon reverse name="clear" color="#8A0829" size={16} />
        )}
        <View style={{ flex: 1, marginLeft: 8 }}>
          <Text
            ellipsizeMode={'tail'}
            numberOfLines={1}
            style={{ fontSize: 20, fontWeight: '500' }}
          >
            {title}
          </Text>
          {additionalInformation ? (
            !showDescription ? (
              <TouchableOpacity onPress={onShowMorePress}>
                <Text ellipsizeMode={'tail'} numberOfLines={1}>
                  Mehr anzeigen
                </Text>
              </TouchableOpacity>
            ) : (
              <Text
                onPress={onShowMorePress}
                ellipsizeMode={'tail'}
                numberOfLines={1}
              >
                Weniger anzeigen
              </Text>
            )
          ) : null}
        </View>
        <Icon
          reverse
          name="remove"
          color="#006699"
          size={12}
          onPress={onPressRemove}
        />
      </View>
      {showDescription ? (
        <Text
          ellipsizeMode={'tail'}
          numberOfLines={1}
          style={{ marginLeft: 6, marginTop: 8 }}
        >
          {additionalInformation}
        </Text>
      ) : null}
    </View>
  );
};

interface IAddNewsTasksProps {
  id: number;
}

const AddNewTasks: React.FC<IAddNewsTasksProps> = (
  props: IAddNewsTasksProps,
) => {
  const { id } = props;

  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const theme = useTheme();

  const onPress = useCallback(() => {
    if (!(text.trim() === '')) dispatch(addTaskToRoom(text, id));
    setText('');
    Keyboard.dismiss();
  }, [dispatch, id, text]);

  const onChangeText = useCallback((newText: string) => {
    setText(newText);
  }, []);

  return (
    <View
      style={{ flexDirection: 'row', marginBottom: 12, alignItems: 'center' }}
    >
      <TextInput
        label="Aufgabe"
        value={text}
        onChangeText={onChangeText}
        mode="outlined"
        style={{ flex: 1, marginRight: 4 }}
        onSubmitEditing={onPress}
        theme={theme}
      />
      <Icon reverse name="add" color="#006699" onPress={onPress} />
    </View>
  );
};

export const Details = ({ route }: { route: { params: { id: number } } }) => {
  const { id } = route.params;

  const room = useSelector((state: StoreState) => state[id]);
  const description = room.description;
  const tasks = room.tasks;

  const allTasks = tasks.length;
  const finishedTasks = tasks.filter((task: ITask) => task.finished === true)
    .length;
  const progress =
    allTasks === 0 ? 1 : finishedTasks === 0 ? 0 : finishedTasks / allTasks;

  const renderItem = useCallback(
    (item: ListRenderItemInfo<ITask>) => {
      return <DetailItem item={item.item} roomId={id} />;
    },
    [id],
  );

  return (
    <View style={styles.container}>
      <Text style={{ marginVertical: 12 }}>
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
          style={{ marginVertical: 12 }}
        />
      ) : null}
      <FlatList
        data={tasks}
        ListHeaderComponent={<AddNewTasks id={id} />}
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
