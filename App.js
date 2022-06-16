// import * as React from 'react';
import React, { useState, useEffect } from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EventRegister } from 'react-native-event-listeners';
// Import themes for dark theme
import themeContext from './config/themeContext';
import theme from './config/theme';
// Importeer alle pagina's
import Home from './screens/Home';
import Map from './screens/Map';
import Overview from './screens/Overview';
import Settings from './screens/Settings';
import { Ionicons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

export default function App() {
  // Set mode for dark theme, false is default
  const [mode, setMode] = useState(false);

  useEffect(() => {
    // Set a event listener for the theme and data, so it can be read on other pages
    let eventListener = EventRegister.addEventListener(
      "changeTheme",
      (data) => {
        setMode(data)
      }
    );
    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  })
  return (
    <themeContext.Provider value={mode === true ? theme.dark : theme.light}>
      <NavigationContainer theme={mode === true ? DarkTheme : DefaultTheme}>
        <Tab.Navigator
          // Eerste pagina = Home
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let rn = route.name;

              // Als de route naam "Home" is, zet icoon van home neer
              if (rn === "Home") {
                iconName = focused ? 'home' : 'home-outline'
                // Als de route naam "Map" is, zet icoon van Map neer
              } else if (rn === "Map") {
                iconName = focused ? 'map' : 'map-outline'
                // Als de route naam "Overview" is, zet icoon van list neer
              } else if (rn === "Overview") {
                iconName = focused ? 'list' : 'list-outline'
                // Als routenaam "Settings" is, zet icoon van settings
              } else if (rn === "Settings") {
                iconName = focused ? 'settings' : 'settings-outline'
              }

              return <Ionicons name={iconName} size={size} color={color} />
            },
          })}>
          {/* Maak navigatie tabs aan onderaan het scherm voor elke pagina */}
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Map" component={Map} />
          <Tab.Screen name="Overview" component={Overview} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </NavigationContainer>
    </themeContext.Provider>
  );
}
