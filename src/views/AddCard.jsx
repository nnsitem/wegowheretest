import { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string, number } from 'yup';

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

export default function AddCard({ navigation: { goBack } }) {
  const dispatch = useDispatch();

  const validationSchema = object().shape({
    card_no: string()
      .required('Card number is required')
      .min(16, 'Card number must be at least 16 characters'),
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      card_no: '',
      holder_name: '',
      expiry_date: '',
      ccv: '',
    },
    resolver: yupResolver(validationSchema),
  });

  // setup loader
  const [loading, setLoading] = useStateLoading(['addNewCard']);

  const handleAddNewCard = useCallback(
    (data) =>
      setLoading('addNewCard', async () => {
        const { success } = await dispatch(cardController.addNewCard(data));
        success && goBack();
      }),
    []
  );

  return (
    <MainContainer>
      <View style={styles.innerContainer}>
        <View style={styles.contentContainer}>
          <Controller
            name="card_no"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <CardInputField
                value={value}
                label="ATM/Debit/Credit Card Number"
                error={error}
                onChange={onChange}
              />
            )}
          />

          <Controller
            name="holder_name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputField
                value={value}
                label="Name on Card"
                placeholder="Ty Lee"
                onChange={onChange}
              />
            )}
          />

          <View style={styles.rowContainer}>
            <Controller
              name="expiry_date"
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputField
                  label="Expiry Date"
                  placeholder="MM/YY"
                  value={value}
                  onChange={onChange}
                  keyboardType="numeric"
                  maxLength={5}
                  mask={[/\d/, /\d/, '/', /\d/, /\d/]}
                  style={{ marginRight: 8 }}
                  useMasked
                />
              )}
            />

            <Controller
              name="ccv"
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputField
                  value={value}
                  label="CVV"
                  placeholder="123"
                  onChange={onChange}
                  keyboardType="numeric"
                  maxLength={3}
                  style={{ marginLeft: 8 }}
                />
              )}
            />
          </View>

          <View style={styles.verifiedContainer}>
            <VerifiedVise width={55} />
            <VerifiedMasterCard width={55} />
            <VerifiedOmise width={55} />
          </View>
        </View>

        <View style={{ position: 'absolute', bottom: 0, alignSelf: 'center', width: '100%' }}>
          <Button
            label="Add Card"
            loading={loading.addNewCard}
            onPress={handleSubmit(handleAddNewCard)}
          />
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
    marginTop: 16,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
