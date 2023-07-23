import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function Button({ label, loading, ...rest }) {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, loading && styles.disabled]}
      disabled={loading}
      {...rest}
    >
      {loading && <ActivityIndicator size="small" color="#FFFFFF" style={{ marginRight: 16 }} />}
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#4AD8DA',
    borderRadius: '50%',
    height: 46,
  },
  disabled: {
    opacity: 0.45,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 700,
    fontFamily: 'FC Subject Rounded Bold',
    alignSelf: 'center',
    letterSpacing: 0.1,
    color: 'white',
  },
});
