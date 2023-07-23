import { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// @import main container
import MainContainer from 'navigation/layout/MainContainer';

// @import global components
import InputField from 'components/InputField';
import CardInputField from 'components/CardInputField';
import Button from 'components/Button';

// @import svg icons
import VerifiedVise from 'assets/svg/verified-by-visa.svg';
import VerifiedMasterCard from 'assets/svg/mastercard-securecode-grey.svg';
import VerifiedOmise from 'assets/svg/omise-grey.svg';

// @import loading hook & reducer
import { useStateLoading } from 'hooks';
import cardController from 'store/controller/card.controller';

export default function AddCard({ navigation: { navigate } }) {
  const dispatch = useDispatch();
  const { card_list } = useSelector((state) => state['card']);

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  // setup loader
  const [loading, setLoading] = useStateLoading(['addNewCard']);

  const formatExpiryDate = (input) => {
    const formattedInput = input
      .replace(/[^\d]/g, '')
      .replace(/(\d{2})(\d{0,2})/, (match, p1, p2) => (p2 ? `${p1}/${p2}` : p1))
      .trim();
    return formattedInput;
  };

  const handleAddNewCard = useCallback(
    () =>
      setLoading('addNewCard', async () => {
        const { success } = await dispatch(cardController.addNewCard('asdeuei'));
        success && navigate('Cards', { params: { reload: true } });
      }),
    []
  );

  return (
    <MainContainer>
      <View style={styles.innerContainer}>
        <View style={styles.contentContainer}>
          <CardInputField
            label="ATM/Debit/Credit Card Number"
            value={cardNumber}
            onChange={setCardNumber}
          />
          <InputField label="Name on Card" placeholder="Ty Lee" />

          <View style={styles.rowContainer}>
            <InputField
              label="Expiry Date"
              placeholder="MM/YY"
              value={expiryDate}
              onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
              keyboardType="numeric"
              maxLength={5}
              style={{ marginRight: 8 }}
            />
            <InputField
              label="CVV"
              placeholder="123"
              keyboardType="numeric"
              maxLength={3}
              style={{ marginLeft: 8 }}
            />
          </View>

          <View style={styles.verifiedContainer}>
            <VerifiedVise width={55} />
            <VerifiedMasterCard width={55} />
            <VerifiedOmise width={55} />
          </View>
        </View>

        <View style={{ position: 'absolute', bottom: 0, alignSelf: 'center', width: '100%' }}>
          <Button label="Add Card" loading={loading.addNewCard} onPress={handleAddNewCard} />
        </View>
      </View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  rowContainer: {
    flex: 1,
    maxHeight: 120,
    flexDirection: 'row',
  },
  verifiedContainer: {
    width: 224,
    marginTop: 32,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
