import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// @import svg icons
import VisaIcon from 'assets/svg/visa_color@2x.svg';
import MasterCardIcon from 'assets/svg/mastercard_color@2x.svg';
import JCBIcon from 'assets/svg/jcb_color@2x.svg';

const creditCardType = require('credit-card-type');

export default function CreditCard({ item, onPress }) {
  const renderIcons = () => {
    const cardType = creditCardType(item?.card_no)[0]?.type;

    const iconConfig = { width: 72, height: 48 };

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
  };

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={() => onPress(item)}>
      <View>{renderIcons()}</View>
      <Text style={styles.cardNumber}>•••• •••• •••• {item.card_no.slice(-4)}</Text>

      <View style={{ flexDirection: 'row', marginTop: 14 }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 10,
              color: '#8F8F8F',
              marginBottom: 10,
              fontFamily: 'FC Subject Rounded Regular',
            }}
          >
            Name on Card
          </Text>
          <Text style={{ fontFamily: 'FC Subject Rounded Regular', fontSize: 14 }}>
            {item.holder_name}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 10,
              color: '#8F8F8F',
              marginBottom: 10,
              fontFamily: 'FC Subject Rounded Regular',
            }}
          >
            Expires
          </Text>
          <Text style={{ fontFamily: 'FC Subject Rounded Regular', fontSize: 14 }}>
            {item.expiry_date.slice(0, 2)}/{item.expiry_date.slice(-2)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    minHeight: 182,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 12,
  },
  cardNumber: {
    fontSize: 24,
    fontFamily: 'FC Subject Rounded Regular',
    color: 'rgba(0,0,0,0.35)',
    letterSpacing: 2.5,
  },
});
