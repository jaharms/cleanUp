import React, { useCallback, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';

import { checkTask } from '../actions/Actions';
import { ITask } from '../reducers/Reducer';

import { DetailListItem } from './DetailListItem';
import { TextWithIcon } from './TextWithIcon';
import { TitleAndDescription } from './TitleAndDescription';

interface IProps {
  item: ITask;
  roomId: number;
}

export const RoomOverviewDetailListItem: React.FC<IProps> = (props: IProps) => {
  const { item, roomId } = props;
  const { title, additionalInformation, finished, id } = item;

  const dispatch = useDispatch();

  const [showDescription, setShowDescription] = useState(false);

  const onShowMorePress = useCallback(() => {
    setShowDescription(!showDescription);
  }, [showDescription]);

  const onCheckTaskPress = useCallback(() => {
    dispatch(checkTask(roomId, id));
  }, [dispatch, id, roomId]);

  return (
    <DetailListItem
      textWithIcon={
        <TextWithIcon
          icon={
            finished ? (
              <Icon reverse name="done" color="#01DF01" size={16} />
            ) : (
              <Icon
                reverse
                name="clear"
                color="#8A0829"
                size={16}
                onPress={onCheckTaskPress}
              />
            )
          }
          textBlock={
            <TitleAndDescription
              onPress={onShowMorePress}
              showLessText={
                !!additionalInformation && showDescription
                  ? 'Weniger anzeigen'
                  : ''
              }
              showLess={!!additionalInformation && showDescription}
              showMoreText={'Mehr anzeigen'}
              showMore={!!additionalInformation && !showDescription}
              title={title}
            />
          }
        />
      }
      futherInformation={
        showDescription ? (
          <Text
            ellipsizeMode={'tail'}
            numberOfLines={1}
            style={styles.description}
          >
            {additionalInformation}
          </Text>
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  description: {
    marginLeft: 6,
    marginTop: 8,
  },
});
