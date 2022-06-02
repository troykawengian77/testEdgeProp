const initialState = {
  loading: false,
  list_change_bin: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_CHANGE_BIN_START':
      return { ...state, loading: true };
    case 'GET_CHANGE_BIN_SUCCESS':
      return {
        ...state,
        loading: false,
        list_change_bin: action.data,
      };
    case 'GET_CHANGE_BIN_FAIL':
      return {
        ...state,
        loading: false,
      };
  }

  return state;
}
