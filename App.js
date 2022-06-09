import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import Map from './screens/Map';
import Overview from './screens/Overview';
import Settings from './screens/Settings';
import { Ionicons } from '@expo/vector-icons';


// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName="Home" 
        screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let rn = route.name;

          if(rn === "Home"){
            iconName = focused ? 'home' : 'home-outline'
          } else if(rn === "Map"){
            iconName = focused ? 'map' : 'map-outline'
          } else if(rn === "Overview"){
          iconName = focused ? 'list' : 'list-outline'
          } else if(rn === "Settings"){
          iconName = focused ? 'settings' : 'settings-outline'
          }

          return <Ionicons name ={iconName} size={size} color={color} />
        },
      })}>
      <Tab.Screen name="Home" component={Home}/>
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Overview" component={Overview} />
      <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
    );
}
