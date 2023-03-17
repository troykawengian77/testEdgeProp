import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { homeReducer } from '../module/Home/homeReducer'

const weatherPersistConfig = { key: 'weather', storage: AsyncStorage };

const rootReducer = combineReducers({
    weathers: persistReducer(weatherPersistConfig, homeReducer),
});

export default rootReducer;
