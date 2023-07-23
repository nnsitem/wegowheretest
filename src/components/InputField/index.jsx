import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function InputField({ label, value, onChange, style, ...rest }) {
  return (
    <View style={[styles.inputWrapper, style]}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput value={value} onChangeText={onChange} style={styles.inputContainer} {...rest} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    flex: 1,
    minHeight: 90,
    maxHeight: 90,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 22,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: 500,
    fontFamily: 'FC Subject Rounded Regular',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  inputContainer: {
    flex: 1,
    maxHeight: 56,
    borderRadius: 5,
    borderColor: '#E6E3E6',
    borderWidth: 1.5,
    padding: 16,
  },
});
