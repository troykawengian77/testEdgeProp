import { API } from '../../../lib/api';
import Toast from 'react-native-toast-message';

export const getListEpisode = (page) => {
  return async dispatch => {
    const { request } = API();
    dispatch({ type: 'GET_LIST_EPISODE_START' });
    try {
      const resp = await request.get(`episode/?page=${page}`);
      let data = resp.data ? resp.data.results : [];
      let info = resp.data ? resp.data.info : [];

      dispatch({
        type: 'GET_LIST_EPISODE_SUCCESS',
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
      dispatch({ type: 'GET_LIST_EPISODE_FAIL' });
      throw err.toJSON().message;
    }
  };
};

export const getDetailEpisode = (id = null) => {
  return async dispatch => {
    const { request } = API();
    dispatch({ type: 'GET_DETAIL_EPISODE_START' });
    try {
      const resp = await request.get(`episode/${id}`);
      let data = resp.data ? resp.data : [];      
      dispatch({
        type: 'GET_DETAIL_EPISODE_SUCCESS',
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
      dispatch({ type: 'GET_DETAIL_EPISODE_FAIL' });
      throw err.toJSON().message;
    }
  };
};

