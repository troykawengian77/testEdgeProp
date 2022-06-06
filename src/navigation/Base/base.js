import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './navigationService';
import NavbarBottom from '../NavbarBottom';
import CharacterPage from '../../page/character';
import EpisodePage from '../../page/episode';
import CharacterDetailPage from '../../page/characterDetail';
import EpisodeDetailPage from '../../page/episodeDetail';

const Stack = createStackNavigator();

export default () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="NavbarBottom" component={NavbarBottom} />
        <Stack.Screen name="Character" component={CharacterPage} />
        <Stack.Screen name="Episode" component={EpisodePage} />
        <Stack.Screen name="CharacterDetail" component={CharacterDetailPage} />
        <Stack.Screen name="EpisodeDetail" component={EpisodeDetailPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
