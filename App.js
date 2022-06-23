// import * as React from 'react';
import React, { useState, useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import styles
import beer from "./styles/beer.js";
import dark from "./styles/dark.js";
import light from "./styles/light.js";

// Importeer alle pagina's
import Home from './screens/Home';
import Map from './screens/Map';
import Overview from './screens/Overview';
import Settings from './screens/Settings';
// Import icons
import { Ionicons } from '@expo/vector-icons';
// import Colerscheme
import { useColorScheme } from 'react-native';

export default function App() {
  const Tab = createBottomTabNavigator()

  const [theme, setTheme] = useState();
  const [colorScheme, setColorScheme] = useState({
    mode: "light",
    textStyle: light.text,
    containerStyle: light.container,
    titleStyle: light.title,
    pickerContainerStyle: light.pickerContainer,
    pickerTextStyle: light.pickerText,
    navTheme: darkMode,
    tabBarActive: '#b30000',
    tabBarinActive: '#d3d3d3',
  })

  const darkMode = {
    dark: false,
    colors: {
      ...DefaultTheme.colors,
      card: '#131318',
      text: 'black',
      border: 'rgba(0, 0, 0, 0.5)',
    },
  };
  const beerMode = {
    dark: false,
    colors: {
      ...DefaultTheme.colors,
      card: '#10161a',
      text: 'yellow',
      border: 'rgba(0, 0, 0, 0.5)',
    }
  }

  if (theme === 'light') {
    colorScheme.textStyle = light.text
    colorScheme.containerStyle = light.container
    colorScheme.titleStyle = light.title
    colorScheme.pickerContainerStyle = light.pickerContainer
    colorScheme.pickerTextStyle = light.pickerText
    colorScheme.navTheme = DefaultTheme
    colorScheme.tabBarActive = '#b30000'
    colorScheme.tabBarinActive = '#d3d3d3'
  } else if (theme === 'dark') {
    colorScheme.textStyle = dark.text
    colorScheme.containerStyle = dark.container
    colorScheme.titleStyle = dark.title
    colorScheme.pickerContainerStyle = dark.pickerContainer
    colorScheme.pickerTextStyle = dark.pickerText
    colorScheme.navTheme = darkMode
    colorScheme.tabBarActive = '#b30000'
    colorScheme.tabBarinActive = '#d3d3d3'
  } else if (theme === 'beer') {
    colorScheme.textStyle = beer.text
    colorScheme.containerStyle = beer.container
    colorScheme.titleStyle = beer.title
    colorScheme.pickerContainerStyle = beer.pickerContainer
    colorScheme.pickerTextStyle = beer.pickerText
    colorScheme.navTheme = beerMode
    colorScheme.tabBarActive = 'yellow'
    colorScheme.tabBarinActive = 'white'
  }


  const getTheme = async () => {
    try {
      const item = await AsyncStorage.getItem('theme')
      if (theme !== null) {
        setTheme(item)
        setColorScheme((currentColorScheme) => {
          currentColorScheme.mode = item;
          return currentColorScheme;
        })
      }else{
        setTheme(useColorScheme())
      }
    } catch (e) {
      // error reading value
    }
  }

  const storeTheme = (value) => {
    try {
      AsyncStorage.setItem('theme', value)
      setTheme(value);
      setColorScheme((currentColorScheme) => {
        currentColorScheme.mode = value;
        return currentColorScheme;
      })
      getTheme()
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getTheme()
}, [])


  return (
    
    <NavigationContainer theme={colorScheme.navTheme}>
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
            tabBarActiveTintColor: `${colorScheme.tabBarActive}`,
            tabBarInactiveTintColor: `${colorScheme.tabBarinActive}`,
        })}
      >
        <Tab.Screen name='Home'>
          {(props) => <Home {...props} colorScheme={colorScheme} storeTheme={storeTheme} />}
        </Tab.Screen>
        <Tab.Screen name='Map'>
          {(props) => <Map {...props} colorScheme={colorScheme} storeTheme={storeTheme} />}
        </Tab.Screen>
        <Tab.Screen name='Overview'>
          {(props) => <Overview {...props} colorScheme={colorScheme} storeTheme={storeTheme} />}
        </Tab.Screen>
        <Tab.Screen name='Settings'>
          {(props) => <Settings {...props} colorScheme={colorScheme} storeTheme={storeTheme} />}
        </Tab.Screen>
      </Tab.Navigator>
      <StatusBar />
    </NavigationContainer>
  );
}
