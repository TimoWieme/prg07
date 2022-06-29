import React, { useState, useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import styles
import beer from "./styles/beer.js";
import dark from "./styles/dark.js";
import light from "./styles/light.js";

// Importeer all pages
import Home from './screens/Home';
import Map from './screens/Map';
import Overview from './screens/Overview';
import Settings from './screens/Settings';
import Descriptions from './screens/Descriptions';
// Import icons
import { Ionicons } from '@expo/vector-icons';
// import Colerscheme
import { useColorScheme } from 'react-native';

export default function App() {
  const Tab = createBottomTabNavigator()

  const [theme, setTheme] = useState();
  // Set standard theme
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

  // if in dark mode, set these colors
  const darkMode = {
    dark: false,
    colors: {
      ...DefaultTheme.colors,
      card: '#131318',
      text: 'white',
      border: 'rgba(0, 0, 0, 0.5)',
    },
  };
  // if in beer mode, set these colors
  const beerMode = {
    dark: false,
    colors: {
      ...DefaultTheme.colors,
      card: '#10161a',
      text: 'yellow',
      border: 'rgba(0, 0, 0, 0.5)',
    }
  }
// If in light mode, change these elements to the light color
  if (theme === 'light') {
    colorScheme.textStyle = light.text
    colorScheme.containerStyle = light.container
    colorScheme.titleStyle = light.title
    colorScheme.pickerContainerStyle = light.pickerContainer
    colorScheme.pickerTextStyle = light.pickerText
    colorScheme.navTheme = DefaultTheme
    colorScheme.tabBarActive = '#b30000'
    colorScheme.tabBarinActive = '#d3d3d3'
    colorScheme.flatlistItemStyle = light.flatlistItem
    colorScheme.input = light.input
    // If in dark mode, change these elements to the dark color

  } else if (theme === 'dark') {
    colorScheme.textStyle = dark.text
    colorScheme.containerStyle = dark.container
    colorScheme.titleStyle = dark.title
    colorScheme.pickerContainerStyle = dark.pickerContainer
    colorScheme.pickerTextStyle = dark.pickerText
    colorScheme.navTheme = darkMode
    colorScheme.tabBarActive = '#b30000'
    colorScheme.tabBarinActive = '#d3d3d3'
    colorScheme.flatlistItemStyle = dark.flatlistItem
    colorScheme.input = dark.input

    // If in beer mode, change these elements to the beer color
  } else if (theme === 'beer') {
    colorScheme.textStyle = beer.text
    colorScheme.containerStyle = beer.container
    colorScheme.titleStyle = beer.title
    colorScheme.pickerContainerStyle = beer.pickerContainer
    colorScheme.pickerTextStyle = beer.pickerText
    colorScheme.navTheme = beerMode
    colorScheme.tabBarActive = 'yellow'
    colorScheme.tabBarinActive = 'white'
    colorScheme.flatlistItemStyle = beer.flatlistItem
    colorScheme.input = beer.input

  }

// Get the theme from local storage
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

  // Store the theme in local storage
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
          // First page = Home
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let rn = route.name;

              // if route = home, show home icon
              if (rn === "Home") {
                iconName = focused ? 'home' : 'home-outline'
              // if route = map, show map icon
            } else if (rn === "Map") {
                iconName = focused ? 'map' : 'map-outline'
              // if route = overview, show list icon
            } else if (rn === "Overview") {
                iconName = focused ? 'list' : 'list-outline'
              // if route = settings, show settings icon
            }else if (rn === "Descriptions") {
              iconName = focused ? 'document-text' : 'document-text-outline'
            } else if (rn === "Settings") {
                iconName = focused ? 'settings' : 'settings-outline'
              }

              return <Ionicons name={iconName} size={size} color={color} />
            },
            // set colors of active and inactive tabs
            tabBarActiveTintColor: `${colorScheme.tabBarActive}`,
            tabBarInactiveTintColor: `${colorScheme.tabBarinActive}`,
        })}
      >
        {/* When tabbed on a tab, go to that tab screen. */}
        <Tab.Screen name='Home'>
          {(props) => <Home {...props} colorScheme={colorScheme} storeTheme={storeTheme} />}
        </Tab.Screen>
        <Tab.Screen name='Map'>
          {(props) => <Map {...props} colorScheme={colorScheme} storeTheme={storeTheme} />}
        </Tab.Screen>
        <Tab.Screen name='Overview'>
          {(props) => <Overview {...props} colorScheme={colorScheme} storeTheme={storeTheme} />}
        </Tab.Screen>
        <Tab.Screen name='Descriptions'>
          {(props) => <Descriptions {...props} colorScheme={colorScheme} storeTheme={storeTheme} />}
        </Tab.Screen>
        <Tab.Screen name='Settings'>
          {(props) => <Settings {...props} colorScheme={colorScheme} storeTheme={storeTheme} />}
        </Tab.Screen>
      </Tab.Navigator>
      <StatusBar />
    </NavigationContainer>
  );
}
