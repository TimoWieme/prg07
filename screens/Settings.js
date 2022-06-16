import React, { useState, useContext } from "react";
import { Text, View, Switch, StyleSheet } from 'react-native';
import { EventRegister } from "react-native-event-listeners";
import themeContext from "../config/themeContext";


export default function Settings({navigation}) {
    const theme = useContext(themeContext);
    const [mode, setMode] = useState(false);

    return (
        <View style={[styles.container, {backgroundColor: theme.background}]}>
            <Text style={[styles.text, {color: theme.color}]}></Text>
            <Switch
            value={mode}
            onValueChange={(value) => {
                setMode(value);
                EventRegister.emit('changeTheme', value)
            }} />
        </View>
    )
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