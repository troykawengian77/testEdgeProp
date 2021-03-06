const initialState = {
  loading: false,
  list_character: [],
  detail_character: null,
  info: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_LIST_CHARACTER_START':
      return { ...state, loading: true };
    case 'GET_LIST_CHARACTER_SUCCESS':
      return {
        ...state,
        loading: false,
        list_character: action.data,
        info: action.info,
      };
    case 'GET_LIST_CHARACTER_FAIL':
      return {
        ...state,
        loading: false,
      };
    case 'GET_DETAIL_CHARACTER_START':
      return { ...state, loading: true };
    case 'GET_DETAIL_CHARACTER_SUCCESS':
      return {
        ...state,
        loading: false,
        detail_character: action.data,
      };
    case 'GET_DETAIL_CHARACTER_FAIL':
      return {
        ...state,
        loading: false,
      };
  }

  return state;
}
