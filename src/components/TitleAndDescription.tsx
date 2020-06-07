import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface IProps {
  onPress: () => void;
  showLessText: string;
  showMore: boolean;
  showLess: boolean;
  showMoreText?: string;
  title: string;
}

export const TitleAndDescription: React.FC<IProps> = (props: IProps) => {
  const {
    onPress,
    showLess,
    showLessText,
    showMore,
    showMoreText,
    title,
  } = props;

  return (
    <View style={styles.container}>
      <Text ellipsizeMode={'tail'} numberOfLines={1} style={styles.title}>
        {title}
      </Text>
      {showMore ? <Text onPress={onPress}>{showMoreText}</Text> : null}
      {showLess ? <Text onPress={onPress}>{showLessText}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
});
