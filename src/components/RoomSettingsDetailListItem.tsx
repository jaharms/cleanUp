import React, { useCallback, useState } from 'react';
import { Icon } from 'react-native-elements';
import { TextInput, useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { changeTaskDescription, removeTaskFromRoom } from '../actions/Actions';
import { ITask } from '../reducers/Reducer';

import { DetailListItem } from './DetailListItem';
import { TextWithIcon } from './TextWithIcon';
import { TitleAndDescription } from './TitleAndDescription';

interface IProps {
  item: ITask;
  roomId: number;
}

export const RoomSettingsDetailListItem: React.FC<IProps> = (props: IProps) => {
  const { item, roomId } = props;
  const { title, additionalInformation, id } = item;

  const theme = useTheme();
  const dispatch = useDispatch();
  const [showDescription, setShowDescription] = useState(false);

  const onPressRemove = useCallback(() => {
    dispatch(removeTaskFromRoom(id, roomId));
  }, [dispatch, id, roomId]);

  const onPressAddDescription = useCallback(() => {
    setShowDescription(!showDescription);
  }, [showDescription]);

  const onChangeTaskDescription = useCallback(
    (newDescription: string) => {
      dispatch(changeTaskDescription(roomId, id, newDescription));
    },
    [dispatch, id, roomId],
  );

  return (
    <DetailListItem
      textWithIcon={
        <TextWithIcon
          icon={
            <Icon
              reverse
              name="remove"
              color="#006699"
              size={12}
              onPress={onPressRemove}
            />
          }
          textBlock={
            <TitleAndDescription
              title={title}
              showMore={!showDescription}
              showLess={showDescription}
              showMoreText={
                additionalInformation && !showDescription
                  ? 'Beschreibung bearbeiten'
                  : !additionalInformation && !showDescription
                  ? 'Beschreibung hinzufügen'
                  : undefined
              }
              showLessText={'Weniger Anzeigen'}
              onPress={onPressAddDescription}
            />
          }
        />
      }
      futherInformation={
        showDescription ? (
          <TextInput
            label="Aufgabenbeschreibung"
            value={additionalInformation}
            onChangeText={onChangeTaskDescription}
            mode="outlined"
            theme={theme}
            multiline
            style={{ marginTop: 12 }}
          />
        ) : null
      }
    />
  );
};
