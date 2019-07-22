import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation"
import Base from './screens/Base'
import Search from './screens/Search'
 
const MainNavigator = createStackNavigator({
  Base: {screen: Base},
  Search: {screen: Search}
},
{
  initialRouteName: 'Base',
}
);

const App = createAppContainer(MainNavigator);
export default App;
