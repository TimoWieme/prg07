import React, { useEffect, useRef, useState } from "react";
import { Text, View, useColorScheme, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

export default function Settings({ navigation, colorScheme, storeTheme }) {
    const [themeColor, setThemeColor] = useState();

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


    useEffect(() => {
        getTheme()
    }, [])


    console.log(colorScheme.pickerTextStyle)
    return (
        <View style={colorScheme.containerStyle}>
            <Text style={colorScheme.titleStyle}>Settings Screen!</Text>
            {/* <Switch
                value={themeColor}
                onChange={(value) => {
                    setThemeColor(value)
                    storeTheme(value);
                }}
            /> */}
            <Picker
                style={colorScheme.pickerContainerStyle}
                selectedValue={themeColor}
                itemStyle={colorScheme.pickerTextStyle}
                onValueChange={(itemValue, itemIndex) =>{
                    setThemeColor(itemValue)
                    storeTheme(itemValue)
                }}>
                <Picker.Item label="Light Mode" value="light" />
                <Picker.Item label="Dark Mode" value="dark" />
                <Picker.Item label="Beer Mode" value="beer" />
            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {

    }
    
});