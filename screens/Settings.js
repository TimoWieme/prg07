import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

export default function Settings({ navigation, colorScheme, storeTheme }) {
    const [themeColor, setThemeColor] = useState();

    // Get theme from localstorage
    const getTheme = async () => {
        try {
            const theme = await AsyncStorage.getItem('theme')
            if (theme !== null) {
                setThemeColor(theme)
            }
        } catch (e) {
            // error reading value
        }
    }

    // Get theme with useEffect
    useEffect(() => {
        getTheme()
    }, [])


    return (
        <View style={colorScheme.containerStyle}>
            <Text style={colorScheme.titleStyle}>Settings Screen!</Text>
            {/* Picker to select a theme */}
            <Picker
                style={colorScheme.pickerContainerStyle}
                selectedValue={themeColor}
                itemStyle={colorScheme.pickerTextStyle}
                onValueChange={(itemValue, itemIndex) => {
                    // Safe theme on change
                    setThemeColor(itemValue)
                    storeTheme(itemValue)
                }}>
                {/* Theme choices */}
                <Picker.Item label="Light Mode" value="light" />
                <Picker.Item label="Dark Mode" value="dark" />
                <Picker.Item label="Beer Mode" value="beer" />
            </Picker>
        </View>
    );
}