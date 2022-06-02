import { API } from '../../../lib/api';

export const getListCharacter = (page = 1) => {
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
      dispatch({ type: 'GET_LIST_CHARACTER_FAIL' });
      throw err?.response?.data;
    }
  };
};

