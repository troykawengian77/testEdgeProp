import { api } from "../../bootstrap/api";
import { API_KEY, lat, long } from "../../config/Constant";
import * as CONST from './homeConst'

export const getCurrentWeather = () => {
    return async dispatch => {
        dispatch({ type: CONST.GET_CURRENT_WEATHER });
        try {
            const resp = await api.get(`weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`);
            let data = resp.data ? resp.data : [];
            dispatch({
                type: CONST.GET_CURRENT_WEATHER_SUCCESS,
                payload: data
            });
            return {
                type: CONST.GET_CURRENT_WEATHER_SUCCESS,
                payload: data
            };
        } catch (err) {
            console.log('error => ', err)
            dispatch({ type: CONST.GET_CURRENT_WEATHER_FAILED });
            throw err.toJSON().message;
        }
    };
};

export const getListForecast = () => {
    return async dispatch => {
        dispatch({ type: CONST.GET_LIST_FORECAST });
        try {
            const resp = await api.get(`forecast/daily?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`);
            console.log('resp: ', resp)
            let data = resp.data ? resp.data : [];
            dispatch({
                type: CONST.GET_LIST_FORECAST_SUCCESS,
                payload: data
            });
            return {
                type: CONST.GET_LIST_FORECAST_SUCCESS,
                payload: data
            };
        } catch (err) {
            console.log('error => ', err)
            dispatch({ type: CONST.GET_LIST_FORECAST_FAILED });
            throw err.toJSON().message;
        }
    };
};