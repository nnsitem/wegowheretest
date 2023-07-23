import { StyleSheet, Text, TextInput, View } from 'react-native';
import MaskInput, { Masks } from 'react-native-mask-input';

// @import svg icons
import VisaIcon from 'assets/svg/visa_color@2x.svg';
import MasterCardIcon from 'assets/svg/mastercard_color@2x.svg';
import JCBIcon from 'assets/svg/jcb_color@2x.svg';

const creditCardType = require('credit-card-type');

export default function CardInputField({ value = '', label, error, onChange }) {
  const iconConfig = { width: 24, height: 24 };

  const renderIcons = () => {
    const cardType = creditCardType(value)[0]?.type;

    if (value.length > 0) {
      switch (cardType) {
        case 'visa':
          return <VisaIcon {...iconConfig} />;
        case 'mastercard':
          return <MasterCardIcon {...iconConfig} />;
        case 'jcb':
          return <JCBIcon {...iconConfig} />;
        default:
          break;
      }
    }

    return (
      <>
        <VisaIcon {...iconConfig} />
        <MasterCardIcon {...iconConfig} />
        <JCBIcon {...iconConfig} />
      </>
    );
  };

  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={[styles.inputContainer, error && styles.errorBorder]}>
        <MaskInput
          value={value}
          placeholder="0000 0000 0000 0000"
          onChangeText={(_, unmasked) => onChange(unmasked)}
          keyboardType="numeric"
          maxLength={19}
          mask={Masks.CREDIT_CARD}
          style={styles.inputStyle}
        />

        <View style={styles.iconContainer}>{renderIcons()}</View>
      </View>
      {error && <Text style={[styles.inputLabel, styles.errorText]}>{error?.message}</Text>}
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

  inputStyle: {
    flex: 1,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorText: {
    color: 'red',
    margin: 0,
    alignSelf: 'flex-end',
  },
  errorBorder: {
    borderColor: 'red',
  },
});
