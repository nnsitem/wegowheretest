import {
  Keyboard,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';

const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

export default function MainContainer({ children, noPadding }) {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 102 : 0;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' && 'padding'}
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={[styles.wrapper, noPadding && styles.noPadding]}
      >
        <HideKeyboard>{children}</HideKeyboard>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  noPadding: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});
