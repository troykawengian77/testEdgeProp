import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CharacterReducer from './character/reducers/index';
import EpisodeReducer from './episode/reducers/index';

const characterPersistConfig = {
    key: 'character',
    storage: AsyncStorage,
};

const episodePersistConfig = {
    key: 'episode',
    storage: AsyncStorage,
};

const rootReducer = combineReducers({
    character: persistReducer(characterPersistConfig, CharacterReducer),
    episode: persistReducer(episodePersistConfig, EpisodeReducer),
    // character: CharacterReducer,
    // episode: EpisodeReducer
});

export default rootReducer;
