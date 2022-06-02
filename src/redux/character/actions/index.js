import { API } from '../../../api';

export const getListScanBIN = (bin) => {
  return async dispatch => {
    const { request } = API(true, 2);
    dispatch({ type: 'GET_SCAN_BIN_START' });
    try {
      const resp = await request.get(`api/wh-bin-scan?bin=${bin}`);
      let data = resp.data ? resp.data.data : [];

      dispatch({
        type: 'GET_SCAN_BIN_SUCCESS',
        data,
      });
      return data;
    } catch (err) {
      dispatch({ type: 'GET_SCAN_BIN_FAIL' });
      throw err?.response?.data;
    }
  };
};

