import actionHandler from 'middleware/actionHandler';

import { addCard } from 'store/reducers/card.reducer';

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

const cardController = { addNewCard };

export default cardController;
