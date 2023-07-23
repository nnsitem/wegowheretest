import Omise from 'omise-react-native';

import actionHandler from 'middleware/actionHandler';

import { addCard } from 'store/reducers/card.reducer';

// @omise config
Omise.config('pkey_test_5rrcize7zvkrk3nvj6b', 'skey_test_5rrcizzz5sxtu1vqad0', '2017-11-12');

const fetchMock = () =>
  new Promise((resolve) => {
    setTimeout(async () => {
      await resolve({ success: true });
    }, 2000);
  });

const addNewCard = (data) => {
  const callAction = async (dispatch) => {
    await dispatch(addCard(data));

    return await fetchMock();
  };

  return actionHandler({
    callAction,
  });
};

const createPayment = ({ card_no, ccv, expiry_date, holder_name }) => {
  const callAction = async (dispatch) => {
    const res = await Omise.createToken({
      card: {
        name: holder_name,
        number: card_no,
        expiration_month: expiry_date.slice(0, 2),
        expiration_year: `20${expiry_date.slice(-2)}`,
        security_code: ccv,
        city: 'Bangkok',
        postal_code: 10320,
      },
    });
    console.log('file: card.controller.js:42 ~ res:', res);

    return null;
  };

  return actionHandler({
    callAction,
  });
};

const cardController = { addNewCard, createPayment };

export default cardController;
