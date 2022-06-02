import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CharacterReducer from './character/reducers/index';

const characterPersistConfig = {
    key: 'character',
    storage: AsyncStorage,
};

const rootReducer = combineReducers({
    character: persistReducer(characterPersistConfig, CharacterReducer),
});

export default rootReducer;
