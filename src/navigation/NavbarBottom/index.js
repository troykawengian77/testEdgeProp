import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import CharacterPage from '../../page/character';
import EpisodePage from '../../page/episode';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export default function NavbarBottom() {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          padding: 5,
          paddingBottom: 5,
          paddingTop: 5,
          borderTopWidth: 0,
          height: 75,
        },
        tabBarLabelStyle: {
          fontSize: 18,
        },
        tabBarActiveTintColor: '#737BC6',
        tabBarInactiveTintColor: '#C6C6C6',
      })}>
      <Tab.Screen
        name="Character"
        component={CharacterPage}
        options={{
          tabBarLabel: 'Character',
          tabBarIcon: ({color, focused, size}) => (
            <Icon active={focused} color={color} name={'people'} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Episode"
        component={EpisodePage}
        options={{
          tabBarLabel: 'Episode',
          tabBarIcon: ({color, focused, size}) => (
            <Icon active={focused} color={color} name={'toc'} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
