import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { removeElementFromOverviewList } from '../actions/Actions';
import { IRoom, ITask } from '../reducers/Reducer';

interface IProps {
  item: IRoom;
}

export const ListItem: React.FC<IProps> = (props: IProps) => {
  const { title, id } = props.item;

  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onPressItem = useCallback(() => {
    navigation.navigate('Details', { id });
  }, [id, navigation]);

  const onPressRemove = useCallback(() => {
    dispatch(removeElementFromOverviewList(id));
  }, [id, dispatch]);

  return (
    <TouchableOpacity
      onPress={onPressItem}
      style={[
        styles.touchable,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.surface,
        },
      ]}
    >
      <Text style={{ flex: 1 }}>{title} </Text>
      <Icon
        reverse
        name="remove"
        color="#006699"
        onPress={onPressRemove}
        size={12}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: 'row',
    marginVertical: 4,
    paddingLeft: 8,
  },
});
