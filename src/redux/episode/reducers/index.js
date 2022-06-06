const initialState = {
  loading: false,
  list_episode: [],
  detail_episode: null,
  info: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_LIST_EPISODE_START':
      return { ...state, loading: true };
    case 'GET_LIST_EPISODE_SUCCESS':
      return {
        ...state,
        loading: false,
        list_episode: action.data,
        info: action.info,
      };
    case 'GET_LIST_EPISODE_FAIL':
      return {
        ...state,
        loading: false,
      };
    case 'GET_DETAIL_EPISODE_START':
      return { ...state, loading: true };
    case 'GET_DETAIL_EPISODE_SUCCESS':
      return {
        ...state,
        loading: false,
        detail_episode: action.data,
      };
    case 'GET_DETAIL_EPISODE_FAIL':
      return {
        ...state,
        loading: false,
      };
  }

  return state;
}
