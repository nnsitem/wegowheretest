import { useMemo } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

// @import svg icons
import VisaIcon from 'assets/svg/visa_color@2x.svg';
import MasterCardIcon from 'assets/svg/mastercard_color@2x.svg';
import JCBIcon from 'assets/svg/jcb_color@2x.svg';

export default function CardInputField({ value = '', label, onChange }) {
  const iconConfig = { width: 24, height: 24 };

  const formatCardNumber = (input) =>
    input
      .replace(/\s/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim();

  const inputStyle = { flex: 0.75 };

  const renderIcons = () =>
    useMemo(
      () => (
        <View style={styles.iconContainer}>
          <VisaIcon {...iconConfig} />
          <MasterCardIcon {...iconConfig} />
          <JCBIcon {...iconConfig} />
        </View>
      ),
      []
    );

  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="0000 0000 0000 0000"
          value={formatCardNumber(value)}
          onChangeText={onChange}
          keyboardType="numeric"
          maxLength={19}
          style={inputStyle}
        />
        {renderIcons()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    width: '100%',
    maxHeight: 90,
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
    flexDirection: 'row',
    maxHeight: 56,
    borderRadius: 5,
    borderColor: '#E6E3E6',
    borderWidth: 1.5,
    padding: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 0.25,
  },
});
