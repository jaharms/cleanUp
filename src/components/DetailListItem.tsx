import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

interface IProps {
  futherInformation: React.ReactNode;
  textWithIcon: React.ReactNode;
}

export const DetailListItem: React.FC<IProps> = (props: IProps) => {
  const { futherInformation, textWithIcon } = props;

  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.surface,
        },
      ]}
    >
      {textWithIcon}
      {futherInformation}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 1,
    marginVertical: 8,
    padding: 12,
  },
});
