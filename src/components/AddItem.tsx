import React, { useCallback, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { TextInput, useTheme } from 'react-native-paper';

interface IProps {
  label: string;
  onPress: (newText: string) => void;
}

export const AddItem: React.FC<IProps> = (props: IProps) => {
  const { label, onPress } = props;

  const theme = useTheme();
  const [text, setText] = useState('');

  const realOnPress = useCallback(() => {
    onPress(text);
    setText('');
    Keyboard.dismiss();
  }, [onPress, text]);

  const onChangeText = useCallback((newText: string) => {
    setText(newText);
  }, []);

  return (
    <View style={styles.textContainer}>
      <TextInput
        label={label}
        value={text}
        onChangeText={onChangeText}
        mode="outlined"
        style={styles.text}
        onSubmitEditing={realOnPress}
        theme={theme}
      />
      <Icon reverse name="add" color="#006699" onPress={realOnPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 12,
  },
  text: {
    flex: 1,
    marginRight: 4,
  },
});
