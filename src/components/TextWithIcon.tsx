import React from 'react';
import { StyleSheet, View } from 'react-native';

interface IProps {
  icon: React.ReactNode;
  textBlock: React.ReactNode;
}

export const TextWithIcon: React.FC<IProps> = (props: IProps) => {
  const { icon, textBlock } = props;

  return (
    <View style={styles.container}>
      {textBlock}
      {icon}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
