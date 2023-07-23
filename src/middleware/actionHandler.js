import { Alert } from 'react-native';

const actionHandler =
  ({ callAction }) =>
  async (dispatch, getState) => {
    try {
      const response = await callAction(dispatch, getState);

      if (response?.error) {
        throw response.error;
      }

      return response;
    } catch (error) {
      Alert.alert(error.message);
    }
  };

// export actionHandler
export default actionHandler;
