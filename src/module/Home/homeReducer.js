import * as CONST from './homeConst'
const initState = {
  listCurrent: [],
  listForecast: [],
  action: ''
}

export const homeReducer = (state = initState, action) => {
  const { payload, type } = action
  const actions = {
    [CONST.GET_CURRENT_WEATHER]: ({
      ...state,
      action: type
    }),
    [CONST.GET_CURRENT_WEATHER_SUCCESS]: ({
      ...state,
      listCurrent: payload,
      action: type
    }),
    [CONST.GET_CURRENT_WEATHER_FAILED]: ({
      ...state,
      listCurrent: [],
      action: type
    }),

    [CONST.GET_LIST_FORECAST]: ({
      ...state,
      action: type
    }),
    [CONST.GET_LIST_FORECAST_SUCCESS]: ({
      ...state,
      listForecast: payload,
      action: type
    }),
    [CONST.GET_LIST_FORECAST_SUCCESS]: ({
      ...state,
      listForecast: [],
      action: type
    }),

    DEFAULT: () => state
  }

  return (actions[type] || actions.DEFAULT());
}