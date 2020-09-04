import * as React from 'react';
import { Text, View, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator,  } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/components/MainScreen'
import {compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './src/redux/rootReducer';
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import HistoryScreen from './src/components/HistoryScreen';

const store=createStore(rootReducer, compose(
  applyMiddleware(thunk)
))

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  
  return (
    <Provider store={store}>
      <NavigationContainer >
        <Tab.Navigator tabBarOptions={{style:{marginBottom:2,paddingBottom:15}}}>
          <Tab.Screen name="Home" component={HomeScreen}  />
          <Tab.Screen name="Settings" component={HistoryScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}