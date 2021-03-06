import { API } from '../../../lib/api';
import Toast from 'react-native-toast-message';

export const getListCharacter = (page) => {
  return async dispatch => {
    const { request } = API();
    dispatch({ type: 'GET_LIST_CHARACTER_START' });
    try {
      const resp = await request.get(`character/?page=${page}`);
      let data = resp.data ? resp.data.results : [];
      let info = resp.data ? resp.data.info : [];

      dispatch({
        type: 'GET_LIST_CHARACTER_SUCCESS',
        data, info
      });
      return data;
    } catch (err) {
      if (err.toJSON().message === 'Network Error') {
        Toast.show({
          text1: 'Please check your internet connection. You need to be online to access the app.',
          type: 'error',
          visibilityTime: 2500,
        });
      }
      dispatch({ type: 'GET_LIST_CHARACTER_FAIL' });
      throw err.toJSON().message;
    }
  };
};

export const getDetailCharacter = (id = null) => {
  return async dispatch => {
    const { request } = API();
    dispatch({ type: 'GET_DETAIL_CHARACTER_START' });
    try {
      const resp = await request.get(`character/${id}`);
      let data = resp.data ? resp.data : [];

      dispatch({
        type: 'GET_DETAIL_CHARACTER_SUCCESS',
        data
      });
      return data;
    } catch (err) {
      if (err.toJSON().message === 'Network Error') {
        Toast.show({
          text1: 'Please check your internet connection. You need to be online to access the app.',
          type: 'error',
          visibilityTime: 2500,
        });
      }
      dispatch({ type: 'GET_DETAIL_CHARACTER_FAIL' });
      throw err.toJSON().message;
    }
  };
};

